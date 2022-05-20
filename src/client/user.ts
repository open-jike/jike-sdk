import { isSuccess, throwRequestFailureError } from './utils/response'
import { fetchPaginated } from './utils/paginate'
import { JikePostWithDetail } from './post'
import { rawTypeToEnum } from './utils/post'
import type { UserUnfollowOption } from '../types/options'
import type { PostDetail, PostTypeRaw, User } from '../types/entity'
import type { Users } from '../types/api-responses'
import type { PaginatedFetcher, PaginatedOption } from './utils/paginate'
import type { JikeClient } from './client'

export interface FollowerWithTime {
  followTime?: string
  user: User
}

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
   * 获取用户 ID
   * @returns 用户 ID
   */
  async getId() {
    return (await this.queryProfile()).user.id
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
    if (!ignoreCache && this.#profile) return this.#profile

    const result = await this.#client.apiClient.users.profile(this.#username)
    if (!isSuccess(result)) throwRequestFailureError(result, '查询用户信息')
    this.#profile = result.data
    this.#username = this.#profile.user.username

    return this.#profile
  }

  /**
   * 查询用户动态
   */
  async queryPersonalUpdate(
    option: PaginatedOption<PostDetail, 'createdAt', string> = {}
  ) {
    const fetcher: PaginatedFetcher<PostDetail, string> = async (lastKey) => {
      const result = await this.#client.apiClient.personalUpdate.single(
        await this.getUsername(),
        { limit: 500, loadMoreKey: lastKey ? { lastId: lastKey } : undefined }
      )
      if (!isSuccess(result)) throwRequestFailureError(result, '查询用户动态')

      const newKey = result.data.loadMoreKey?.lastId
      return [newKey, result.data.data]
    }

    const data = await fetchPaginated(
      fetcher,
      (item, data) => ({
        createdAt: new Date(item.createdAt),
        total: data.length + 1,
      }),
      option
    )

    return data
      .filter((item) => item.type !== 'PERSONAL_UPDATE')
      .map(
        (item) =>
          new JikePostWithDetail(
            this.#client,
            rawTypeToEnum(item.type as PostTypeRaw),
            item.id,
            item
          )
      )
  }

  /**
   * 查询用户被关注
   */
  queryFollowers(option: PaginatedOption<User, never, string> = {}) {
    const fetcher: PaginatedFetcher<User, string> = async (lastKey) => {
      const result = await this.#client.apiClient.userRelation.getFollowerList(
        await this.getUsername(),
        {
          limit: 20,
          loadMoreKey: lastKey ? { createdAt: lastKey } : undefined,
        }
      )
      if (!isSuccess(result)) throwRequestFailureError(result, '查询用户被关注')

      const newKey = result.data.loadMoreKey?.createdAt
      return [newKey, result.data.data]
    }

    return fetchPaginated(
      fetcher,
      (_item, data) => ({
        total: data.length + 1,
      }),
      option
    )
  }

  /**
   * 查询用户被关注，带关注时间。逐个用户查询，耗时较长。
   */
  queryFollowersWithTime(
    option: PaginatedOption<FollowerWithTime, 'followTime', string> = {}
  ) {
    const fetcher: PaginatedFetcher<FollowerWithTime, string> = async (
      lastKey
    ) => {
      const result = await this.#client.apiClient.userRelation.getFollowerList(
        await this.getUsername(),
        { limit: 1, loadMoreKey: lastKey ? { createdAt: lastKey } : undefined }
      )
      if (!isSuccess(result)) throwRequestFailureError(result, '查询用户被关注')

      const newKey = result.data.loadMoreKey?.createdAt
      const data: FollowerWithTime[] = result.data.data[0]
        ? [
            {
              user: result.data.data[0],
              followTime: newKey,
            },
          ]
        : []
      return [newKey, data]
    }

    return fetchPaginated(
      fetcher,
      (item, data) => ({
        followTime: item.followTime ? new Date(item.followTime) : new Date(0),
        total: data.length + 1,
      }),
      option
    )
  }

  /**
   * 是否关注用户
   * @param user 用户名或用户实例
   * @param mode
   * `following`: 从 当前用户 的 关注 列表查找 目标用户 是否存在；
   * `follower` : 从 目标用户 的 被关注 列表查找 当前用户 是否存在。
   * `auto`     : 根据 `following` 和 `follower` 数量，自动选择上述两种模式。
   *
   * 为提升查询速度，建议哪个数量少使用哪个。
   */
  async isFollowing(
    user: JikeUser | string,
    mode: 'following' | 'follower' | 'auto'
  ) {
    const target = typeof user === 'string' ? this.#client.getUser(user) : user

    if (mode === 'auto') {
      const thisProfile = await this.queryProfile()
      const targetProfile = await target.queryProfile()

      mode =
        thisProfile.user.statsCount.followingCount >
        targetProfile.user.statsCount.followedCount
          ? 'follower'
          : 'following'
    }

    const targetUsername = await (mode === 'following'
      ? target.getUsername()
      : this.getUsername())

    const includes = (data: User[]) =>
      data.some((item) => item.username === targetUsername)

    let data: User[]
    if (mode === 'following') {
      data = await this.queryFollowings({
        limit: (opt, item, data) => !includes(data),
      })
    } else {
      data = await target.queryFollowers({
        limit: (opt, item, data) => !includes(data),
      })
    }

    return includes(data)
  }

  /**
   * 查询用户关注
   */
  queryFollowings(option: PaginatedOption<User, never, string> = {}) {
    const fetcher: PaginatedFetcher<User, string> = async (lastKey) => {
      const result = await this.#client.apiClient.userRelation.getFollowingList(
        await this.getUsername(),
        { limit: 20, loadMoreKey: lastKey ? { createdAt: lastKey } : undefined }
      )
      if (!isSuccess(result)) throwRequestFailureError(result, '查询用户被关注')

      const newKey = result.data.loadMoreKey?.createdAt
      return [newKey, result.data.data]
    }

    return fetchPaginated(
      fetcher,
      (_item, data) => ({
        total: data.length + 1,
      }),
      option
    )
  }

  /**
   * 关注用户
   */
  async follow() {
    const result = await this.#client.apiClient.userRelation.follow(
      await this.getUsername()
    )
    if (!isSuccess(result)) throwRequestFailureError(result, '关注用户')
  }

  /**
   * 取消关注用户
   */
  async unfollow(option: UserUnfollowOption = {}) {
    const result = await this.#client.apiClient.userRelation.unfollow(
      await this.getUsername(),
      option
    )
    if (!isSuccess(result)) throwRequestFailureError(result, '取消关注用户')
  }

  /**
   * 不看 TA 的内容
   */
  async mute() {
    const result = await this.#client.apiClient.userRelation.mute(
      await this.getId()
    )
    if (!isSuccess(result)) throwRequestFailureError(result, '不看 TA 的内容')
  }

  /**
   * 重新看 TA 的内容
   */
  async unmute() {
    const result = await this.#client.apiClient.userRelation.unmute(
      await this.getId()
    )
    if (!isSuccess(result)) throwRequestFailureError(result, '重新看 TA 的内容')
  }
}
