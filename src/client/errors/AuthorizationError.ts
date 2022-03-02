/**
 * 认证错误
 */
export class AuthorizationError extends Error {
  /**
   *
   * @param reason 错误原因
   */
  constructor(reason: string) {
    super(reason)
    this.name = 'AuthorizationError'
  }
}
