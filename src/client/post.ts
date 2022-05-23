import { isSuccess, throwRequestFailureError } from './utils/response'
import { enumTypeToRaw } from './utils/post'
import { fetchPaginated } from './utils/paginate'
import type { PaginatedFetcher, PaginatedOption } from './utils/paginate'
import type {
  AddCommentOption,
  ListCommentMoreKey,
  ListCommentOption,
  PostType,
} from '../types/options'
import type { Comment, Post, User } from '../types/entity'
import type { JikeClient } from './client'

/**
 * Jike 动态
 */
export class JikePost {
  #client: JikeClient
  type: PostType
  id: string
  detail?: Post

  constructor(client: JikeClient, type: PostType, id: string, detail?: Post) {
    this.#client = client
    this.type = type
    this.id = id
    this.detail = detail
  }

  get apiClient() {
    return this.#client.apiClient
  }

  /**
   * 获取动态详情
   * @returns 动态详情
   */
  async queryDetail() {
    if (this.detail) this.detail
    const result = await this.apiClient.posts.get(this.type, this.id)
    if (!isSuccess(result)) throwRequestFailureError(result, '获取动态详情')
    return (this.detail = result.data.data)
  }

  /**
   * 动态点赞
   */
  async like() {
    const result = await this.apiClient.posts.like(this.type, this.id)
    if (!isSuccess(result)) throwRequestFailureError(result, '动态点赞')
    if (this.detail) this.detail.liked = true
  }

  /**
   * 动态取消点赞
   */
  async unlike() {
    const result = await this.apiClient.posts.unlike(this.type, this.id)
    if (!isSuccess(result)) throwRequestFailureError(result, '取消动态点赞')
    if (this.detail) this.detail.liked = false
  }

  /**
   * 删除动态
   * @returns 删除提示文本
   */
  async remove() {
    const result = await this.apiClient.posts.remove(this.type, this.id)
    if (!isSuccess(result)) throwRequestFailureError(result, '删除动态')
    return result.data.toast
  }

  /**
   * 置顶动态
   * @returns 置顶提示文本
   */
  async pin() {
    const result = await this.apiClient.personalUpdate.pin(
      enumTypeToRaw(this.type),
      this.id
    )
    if (!isSuccess(result)) throwRequestFailureError(result, '置顶动态')
    return result.data.toast
  }

  /**
   * 取消置顶动态
   * @returns 取消置顶提示文本
   */
  async unpin() {
    const result = await this.apiClient.personalUpdate.unpin(
      enumTypeToRaw(this.type),
      this.id
    )
    if (!isSuccess(result)) throwRequestFailureError(result, '取消置顶动态')
    return result.data.toast
  }

  /**
   * 获取点赞用户列表
   * @returns 用户列表
   */
  async listLikedUsers(option: PaginatedOption<User, never, string> = {}) {
    const fetcher: PaginatedFetcher<User, string> = async (lastKey) => {
      const result = await this.apiClient.posts.listLikedUsers(
        this.type,
        this.id,
        { loadMoreKey: lastKey, limit: 500 }
      )
      if (!isSuccess(result))
        throwRequestFailureError(result, '获取点赞用户列表')

      const newKey = result.data.loadMoreKey
      return [newKey, result.data.data]
    }

    return fetchPaginated(
      fetcher,
      (item, data) => ({ total: data.length + 1 }),
      option
    )
  }

  /**
   * 添加评论
   * @returns 评论信息
   */
  async addComment(content: string, option: AddCommentOption = {}) {
    const result = await this.apiClient.comments.add(
      enumTypeToRaw(this.type),
      this.id,
      content,
      option
    )
    if (!isSuccess(result)) throwRequestFailureError(result, '添加评论')
    return result.data.data
  }

  /**
   * 查询评论
   */
  async queryComments(
    order?: ListCommentOption['order'],
    option: PaginatedOption<Comment, 'createdAt', ListCommentMoreKey> = {}
  ) {
    const fetcher: PaginatedFetcher<Comment, ListCommentMoreKey> = async (
      lastKey
    ) => {
      const result = await this.apiClient.comments.listPrimary(
        enumTypeToRaw(this.type),
        this.id,
        { loadMoreKey: lastKey, limit: 500, order }
      )
      if (!isSuccess(result)) throwRequestFailureError(result, '查询用户动态')

      const newKey = result.data.loadMoreKey
      return [newKey, result.data.data]
    }

    return fetchPaginated(
      fetcher,
      (item, data) => ({
        createdAt: new Date(item.createdAt),
        total: data.length + 1,
      }),
      option
    )
  }
}

export class JikePostWithDetail extends JikePost {
  constructor(client: JikeClient, type: PostType, id: string, detail: Post) {
    super(client, type, id, detail)
    this.detail = detail
  }

  getDetail(): Post {
    return this.detail!
  }
}
