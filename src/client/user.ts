import { isSuccess, throwRequestFailureError } from './utils'
import type { JikeClient } from './client'

export class JikeUser {
  #client: JikeClient
  username: string

  constructor(client: JikeClient, username: string) {
    this.#client = client
    this.username = username
  }

  async queryProfile() {
    const result = await this.#client.apiClient.users.profile(this.username)
    if (!isSuccess(result)) throwRequestFailureError(result, '查询')
    return result.data
  }
}
