import type { ApiResponse } from '../../request'

export class LoginFailureError extends Error {
  public response: ApiResponse

  constructor(error: string, response: ApiResponse) {
    super(error)
    this.name = 'LoginFailureError'
    this.response = response
  }
}
