import { isSuccess, throwRequestFailureError } from './utils/response'
import { fetchPaginated } from './utils/paginate'
import { JikePost } from './post'
import { rawTypeToEnum } from './utils/post'
import type { Users } from '../types/api-responses'
import type { PaginatedOption } from './utils/paginate'
import type { JikeClient } from './client'

/**
 * @template M 是否为自己
 */
export class JikeUser<M extends boolean = boolean> {
  #client: JikeClient
  #username?: string
  #profile?: Users.Profile<M>

  constructor(
    client: JikeClient,
    username?: string,
    profile?: Users.Profile<M>
  ) {
    this.#client = client
    this.#username = username
    this.#profile = profile
  }

  /**
   * 获取用户名
   * @returns 用户名
   */
  async getUsername() {
    if (this.#username) return this.#username
    await this.queryProfile()
    return this.#username!
  }

  /**
   * 获取用户昵称
   * @returns 用户昵称
   */
  async getScreenName() {
    return (await this.queryProfile()).user.screenName
  }

  /**
   * 查询用户信息
   * @param ignoreCache 不使用缓存
   */
  async queryProfile(ignoreCache = false) {
    if (ignoreCache && this.#profile) return this.#profile

    const result = await this.#client.apiClient.users.profile(this.#username)
    if (!isSuccess(result)) throwRequestFailureError(result, '查询用户信息')
    this.#profile = result.data
    this.#username = this.#profile.user.username

    return this.#profile
  }

  /**
   * 查询用户动态
   */
  async queryPersonalUpdate(option: PaginatedOption<'createdAt', string> = {}) {
    const data = await fetchPaginated(
      async (lastKey?: string) => {
        const result = await this.#client.apiClient.personalUpdate.single(
          await this.getUsername(),
          { limit: 500, loadMoreKey: lastKey ? { lastId: lastKey } : undefined }
        )
        if (!isSuccess(result)) throwRequestFailureError(result, '查询用户动态')
        const newKey = result.data.loadMoreKey?.lastId
        return [newKey, result.data.data]
      },
      (item, data) => ({
        createdAt: new Date(item.createdAt),
        total: data.length + 1,
      }),
      option
    )
    return data.map(
      (item) =>
        new JikePost(this.#client, rawTypeToEnum(item.type), item.id, item)
    )
  }
}
