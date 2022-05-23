import { HTTPError } from 'ky'
import EventEmitter from 'eventemitter3'
import { resolveApiConfig } from '../request'
import { ApiClient } from '../api-client'
import { objectPick } from '../utils'
import { PostType } from '../types/options'
import { isSuccess, throwRequestFailureError } from './utils/response'
import { resolveAreaCode } from './utils/user'
import { JikeUser } from './user'
import { fetchPaginated } from './utils/paginate'
import { AuthorizationError } from './errors/AuthorizationError'
import { JikePost, JikePostWithDetail } from './post'
import type { CreatePostOption } from '../types/options'
import type { FollowingUpdatesMoreKey, JikeClientJSON } from './types'
import type {
  FollowingUpdate,
  Notification,
  PersonalUpdate,
  Post,
} from '../types/entity'
import type { BeforeRetryState } from 'ky/distribution/types/hooks'
import type { PaginatedFetcher, PaginatedOption } from './utils/paginate'
import type { Api } from '../api'
import type { ApiConfig, ApiConfigResolved } from '../request'

interface EventMap {
  renewToken: () => void
}

const userSelfKey = Symbol('userSelfKey')

export class JikeClient extends EventEmitter<EventMap> {
  #refreshToken: string
  #config: ApiConfigResolved
  #client!: Api
  #userCache: { [userSelfKey]?: JikeUser<true> } & Record<string, JikeUser> = {}

  get accessToken() {
    return this.#config.accessToken
  }
  set accessToken(token) {
    this.#config.accessToken = token
    this.createClient()
  }
  get refreshToken() {
    return this.#refreshToken
  }
  get config() {
    return this.#config
  }
  set config(config) {
    this.#config = config
    this.createClient()
  }
  get apiClient() {
    return this.#client
  }

  constructor({
    refreshToken = '',
    ...config
  }: ApiConfig & { refreshToken?: string }) {
    super()

    this.#refreshToken = refreshToken
    this.#config = resolveApiConfig(config)
    this.createClient()
  }

  private createClient() {
    this.#client = ApiClient({
      ...this.#config,
      beforeRetry: this.beforeRetry.bind(this),
    })
  }

  private async beforeRetry({ request, error }: BeforeRetryState) {
    if (!(error instanceof HTTPError)) return false

    const response = error.response
    if (response.status !== 401) return false

    // don't retry when renewing token
    if (request.url.includes('app_auth_tokens.refresh')) {
      return false
    }

    await this.renewToken()
    request.headers.set(
      `x-${this.#config.endpointId}-access-token`,
      this.#config.accessToken
    )

    return true
  }

  /**
   * 发送短信验证码
   * @param areaCode 区号，如 `+86`
   * @param mobile 手机号
   * @throws {@link RequestFailureError} 请求失败错误
   */
  async sendSmsCode(areaCode: string | number, mobile: string) {
    const result = await this.#client.users.getSmsCode(
      resolveAreaCode(areaCode),
      mobile
    )
    if (!isSuccess(result)) throwRequestFailureError(result, '发送短信验证码')
  }

  /**
   * 短信登录
   * @param areaCode 区号，如 `+86`
   * @param mobile 手机号
   * @param smsCode 短信验证码
   * @throws {@link RequestFailureError} 请求失败错误
   */
  async loginWithSmsCode(
    areaCode: string | number,
    mobile: string,
    smsCode: string | number
  ) {
    const result = await this.#client.users.loginWithSmsCode(
      resolveAreaCode(areaCode),
      mobile,
      smsCode
    )
    if (!isSuccess(result)) throwRequestFailureError(result, '登录')

    this.#refreshToken = result.headers.get(
      `x-${this.#config.endpointId}-refresh-token`
    )!
    this.accessToken = result.headers.get(
      `x-${this.#config.endpointId}-access-token`
    )!
  }

  /**
   * 密码登录
   * @param areaCode 区号，如 `+86`
   * @param mobile 手机号
   * @param password 密码
   * @throws {@link RequestFailureError} 请求失败错误
   */
  async loginWithPassword(
    areaCode: string | number,
    mobile: string,
    password: string
  ) {
    const result = await this.#client.users.loginWithPhoneAndPassword(
      resolveAreaCode(areaCode),
      mobile,
      password
    )
    if (!isSuccess(result)) throwRequestFailureError(result, '登录')
    this.#refreshToken = result.headers.get(
      `x-${this.#config.endpointId}-refresh-token`
    )!
    this.accessToken = result.headers.get(
      `x-${this.#config.endpointId}-access-token`
    )!
  }

  /**
   * 获取用户
   * @param username 用户名
   * @template M 是否为自己
   * - `true`: 是
   * - `false`: 否
   * - `boolean`: 未知 （默认）
   * @returns {@link JikeUser} 实例
   */
  getUser<M extends boolean = boolean>(username: string): JikeUser {
    if (this.#userCache[username]) return this.#userCache[username]
    return (this.#userCache[username] = new JikeUser<M>(this, username))
  }

  /**
   * 获取自身用户
   * @returns {@link JikeUser} 实例
   */
  getSelf(): JikeUser<true> {
    if (this.#userCache[userSelfKey]) return this.#userCache[userSelfKey]!
    return (this.#userCache[userSelfKey] = new JikeUser<true>(this, undefined))
  }

  /**
   * 查询通知
   */
  async queryNotifications(
    option: PaginatedOption<
      Notification,
      'createdAt' | 'updatedAt',
      string
    > = {}
  ) {
    const fetcher: PaginatedFetcher<Notification, string> = async (lastKey) => {
      const result = await this.#client.notifications.list({
        loadMoreKey: lastKey ? { lastNotificationId: lastKey } : undefined,
      })
      if (!isSuccess(result)) throwRequestFailureError(result, '查询通知')
      const newKey = result.data.loadMoreKey?.lastNotificationId
      return [newKey, result.data.data]
    }
    return fetchPaginated(
      fetcher,
      (item, data) => ({
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt),
        total: data.length + 1,
      }),
      option
    )
  }

  /**
   * 查询关注动态
   */
  async queryFollowingUpdates(
    option: PaginatedOption<
      FollowingUpdate,
      'createdAt',
      FollowingUpdatesMoreKey
    > = {}
  ) {
    const fetcher: PaginatedFetcher<
      FollowingUpdate,
      FollowingUpdatesMoreKey
    > = async (lastKey) => {
      const result = await this.#client.personalUpdate.followingUpdates({
        loadMoreKey: lastKey,
      })
      if (!isSuccess(result)) throwRequestFailureError(result, '查询关注动态')
      const newKey = result.data.loadMoreKey
      return [newKey, result.data.data]
    }
    const updates = await fetchPaginated(
      fetcher,
      (item, data) => ({
        createdAt: new Date(item.createdAt),
        total: data.length + 1,
      }),
      option
    )
    return updates.map(
      (
        update
      ): ({ actionTime: string } & PersonalUpdate) | JikePostWithDetail => {
        // TODO repost
        if (update.type === 'ORIGINAL_POST') {
          return this.getPost(PostType.ORIGINAL, update.id, update)
        } else {
          return update
        }
      }
    )
  }

  /**
   *
   * @param type 动态类型，原帖 或 转发
   * @param content 内容
   * @param options 发送动态选项
   */
  async createPost(
    type: PostType,
    content: string,
    options?: CreatePostOption
  ) {
    const result = await this.#client.posts.create(type, content, options)
    if (!isSuccess(result)) throwRequestFailureError(result, '发送动态')
    return {
      /** 动态 */
      post: this.getPost(type, result.data.data.id, result.data.data),
      /** 提示文本 */
      toast: result.data.toast,
    }
  }

  getPost(type: PostType, id: string): JikePost
  getPost(type: PostType, id: string, detail: Post): JikePostWithDetail
  getPost(
    type: PostType,
    id: string,
    detail?: Post
  ): JikePost | JikePostWithDetail {
    if (!detail) return new JikePost(this, type, id)
    else return new JikePostWithDetail(this, type, id, detail)
  }

  /**
   * 刷新 access token
   */
  async renewToken() {
    if (!this.#refreshToken)
      throw new Error('登录状态已失效，请重新获取 access-token！')

    const result = await this.apiClient.users.refreshToken(this.#refreshToken)
    if (!isSuccess(result)) {
      throw new AuthorizationError(
        '刷新 access-token 失败。可能是太久没有活动，refresh token 已失效！'
      )
    }

    this.#refreshToken =
      result.data[`x-${this.#config.endpointId}-refresh-token`]
    this.accessToken = result.data[`x-${this.#config.endpointId}-access-token`]

    this.emit('renewToken')
  }

  /**
   * 转换为 JSON 数据
   */
  async toJSON(): Promise<JikeClientJSON> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { beforeRetry, ...config } = this.#config
    const profile = await this.getSelf()
      .queryProfile()
      .catch(() => undefined)
    return {
      ...config,
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
      userId: profile?.user.id ?? '',
      username: profile?.user.username ?? '',
      screenName: profile?.user.screenName ?? '',
    }
  }

  /**
   * 序列化
   * @param space 缩进空格数
   */
  async serialize(space = 0): Promise<string> {
    return JSON.stringify(await this.toJSON(), undefined, space)
  }

  /**
   * 从 JSON 数据创建
   * @param data 数据
   */
  static fromJSON(data: JikeClientJSON): JikeClient {
    return new JikeClient(
      objectPick(data, [
        'endpointId',
        'endpointUrl',
        'bundleId',
        'appVersion',
        'buildNo',
        'userAgent',
        'deviceId',
        'idfv',

        'accessToken',
        'refreshToken',
      ])
    )
  }

  /**
   * 反序列化
   * @param data 数据
   */
  static deserialize(data: string): JikeClient {
    const json: JikeClientJSON = JSON.parse(data)
    return this.fromJSON(json)
  }
}
