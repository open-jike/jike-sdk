import type { ApiResponse } from '../../request'

export class RequestFailureError extends Error {
  public response: ApiResponse

  constructor(error: string, response: ApiResponse) {
    super(error)
    this.name = 'RequestFailureError'
    this.response = response
  }
}
