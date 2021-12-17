import { resolveApiConfig } from '../request'
import { ApiClient } from '../api-client'
import { LoginFailureError } from './errors/LoginFailureError'
import type { LoginFailureResponse } from '..'
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
   * 短信登录
   * @param areaCode 区号，如：+86
   * @param mobile 手机号
   * @param smsCode 短信验证码
   */
  async loginWithSmsCode(
    areaCode: string | number,
    mobile: string,
    smsCode: string | number
  ) {
    const result = await this.#client.users.loginWithSmsCode(
      typeof areaCode === 'number' ? `+${areaCode}` : areaCode,
      mobile,
      smsCode
    )
    if (result.status !== 200 || !result.data?.success) {
      throw new LoginFailureError(
        (result.data as LoginFailureResponse)?.error ?? '登录失败，未知原因',
        result
      )
    }
    this.#refreshToken = result.headers.get('x-jike-refresh-token')!
    this.accessToken = result.headers.get('x-jike-access-token')!
    return this
  }
}
