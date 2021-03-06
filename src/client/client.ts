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
   * ?????????????????????
   * @param areaCode ???????????? `+86`
   * @param mobile ?????????
   * @throws {@link RequestFailureError} ??????????????????
   */
  async sendSmsCode(areaCode: string | number, mobile: string) {
    const result = await this.#client.users.getSmsCode(
      resolveAreaCode(areaCode),
      mobile
    )
    if (!isSuccess(result)) throwRequestFailureError(result, '?????????????????????')
  }

  /**
   * ????????????
   * @param areaCode ???????????? `+86`
   * @param mobile ?????????
   * @param smsCode ???????????????
   * @throws {@link RequestFailureError} ??????????????????
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
    if (!isSuccess(result)) throwRequestFailureError(result, '??????')

    this.#refreshToken = result.headers.get(
      `x-${this.#config.endpointId}-refresh-token`
    )!
    this.accessToken = result.headers.get(
      `x-${this.#config.endpointId}-access-token`
    )!
  }

  /**
   * ????????????
   * @param areaCode ???????????? `+86`
   * @param mobile ?????????
   * @param password ??????
   * @throws {@link RequestFailureError} ??????????????????
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
    if (!isSuccess(result)) throwRequestFailureError(result, '??????')
    this.#refreshToken = result.headers.get(
      `x-${this.#config.endpointId}-refresh-token`
    )!
    this.accessToken = result.headers.get(
      `x-${this.#config.endpointId}-access-token`
    )!
  }

  /**
   * ????????????
   * @param username ?????????
   * @template M ???????????????
   * - `true`: ???
   * - `false`: ???
   * - `boolean`: ?????? ????????????
   * @returns {@link JikeUser} ??????
   */
  getUser<M extends boolean = boolean>(username: string): JikeUser {
    if (this.#userCache[username]) return this.#userCache[username]
    return (this.#userCache[username] = new JikeUser<M>(this, username))
  }

  /**
   * ??????????????????
   * @returns {@link JikeUser} ??????
   */
  getSelf(): JikeUser<true> {
    if (this.#userCache[userSelfKey]) return this.#userCache[userSelfKey]!
    return (this.#userCache[userSelfKey] = new JikeUser<true>(this, undefined))
  }

  /**
   * ????????????
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
      if (!isSuccess(result)) throwRequestFailureError(result, '????????????')
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
   * ??????????????????
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
      if (!isSuccess(result)) throwRequestFailureError(result, '??????????????????')
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
        if (update.type === 'ORIGINAL_POST') {
          return this.getPost(PostType.ORIGINAL, update.id, update)
        } else if (update.type === 'REPOST') {
          return this.getPost(PostType.REPOST, update.id, update)
        } else {
          return update
        }
      }
    )
  }

  /**
   *
   * @param type ????????????????????? ??? ??????
   * @param content ??????
   * @param options ??????????????????
   */
  async createPost(
    type: PostType,
    content: string,
    options?: CreatePostOption
  ) {
    const result = await this.#client.posts.create(type, content, options)
    if (!isSuccess(result)) throwRequestFailureError(result, '????????????')
    return {
      /** ?????? */
      post: this.getPost(type, result.data.data.id, result.data.data),
      /** ???????????? */
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
   * ?????? access token
   */
  async renewToken() {
    if (!this.#refreshToken)
      throw new Error('??????????????????????????????????????? access-token???')

    const result = await this.apiClient.users.refreshToken(this.#refreshToken)
    if (!isSuccess(result)) {
      throw new AuthorizationError(
        '?????? access-token ???????????????????????????????????????refresh token ????????????'
      )
    }

    this.#refreshToken =
      result.data[`x-${this.#config.endpointId}-refresh-token`]
    this.accessToken = result.data[`x-${this.#config.endpointId}-access-token`]

    this.emit('renewToken')
  }

  /**
   * ????????? JSON ??????
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
   * ?????????
   * @param space ???????????????
   */
  async serialize(space = 0): Promise<string> {
    return JSON.stringify(await this.toJSON(), undefined, space)
  }

  /**
   * ??? JSON ????????????
   * @param data ??????
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
   * ????????????
   * @param data ??????
   */
  static deserialize(data: string): JikeClient {
    const json: JikeClientJSON = JSON.parse(data)
    return this.fromJSON(json)
  }
}
