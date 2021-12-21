import { resolveApiConfig } from '../request'
import { ApiClient } from '../api-client'
import { isSuccess, throwRequestFailureError } from './utils/response'
import { resolveAreaCode } from './utils/user'
import { JikeUser } from './user'
import { fetchPaginated } from './utils/paginate'
import type { PaginatedOption } from './utils/paginate'
import type { Api } from '../api'
import type { ApiConfig } from '../request'

export class JikeClient {
  #accessToken: string
  #refreshToken: string
  #apiConfig: ApiConfig
  #client!: Api

  get accessToken() {
    return this.#accessToken
  }
  set accessToken(token) {
    this.#accessToken = token
    this.createClient()
  }
  get refreshToken() {
    return this.#refreshToken
  }
  get apiConfig() {
    return this.#apiConfig
  }
  set apiConfig(config) {
    this.#apiConfig = config
    this.createClient()
  }
  get apiClient() {
    return this.#client
  }

  constructor(
    auth: { accessToken?: string; refreshToken?: string } = {},
    apiConfig: Partial<Omit<ApiConfig, 'accessToken'>> = {}
  ) {
    this.#accessToken = auth.accessToken ?? ''
    this.#refreshToken = auth.refreshToken ?? ''
    this.#apiConfig = resolveApiConfig(apiConfig)
    this.createClient()
  }

  private createClient() {
    this.#client = ApiClient({
      ...this.#apiConfig,
      accessToken: this.#accessToken,
    })
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

    this.#refreshToken = result.headers.get('x-jike-refresh-token')!
    this.accessToken = result.headers.get('x-jike-access-token')!
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
    return new JikeUser<M>(this, username)
  }

  getSelf() {
    return new JikeUser<true>(this, undefined)
  }

  /**
   * 查询通知
   */
  async queryNotifications(
    option: PaginatedOption<'createdAt' | 'updatedAt', string> = {}
  ) {
    return fetchPaginated(
      async (lastKey?: string) => {
        const result = await this.#client.notifications.list({
          loadMoreKey: lastKey ? { lastNotificationId: lastKey } : undefined,
        })
        if (!isSuccess(result)) throwRequestFailureError(result, '查询通知')
        const newKey = result.data.loadMoreKey.lastNotificationId
        return [newKey, result.data.data]
      },
      (item, data) => ({
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt),
        total: data.length + 1,
      }),
      option
    )
  }
}
