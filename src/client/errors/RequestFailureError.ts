import { type ApiResponse } from '../../request'

/**
 * 请求失败错误
 */
export class RequestFailureError extends Error {
  /** 响应数据 */
  public response: ApiResponse

  /**
   *
   * @param error 错误原因
   * @param response 响应数据
   */
  constructor(error: string, response: ApiResponse) {
    super(error)
    this.name = 'RequestFailureError'
    this.response = response
  }
}
