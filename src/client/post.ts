import { isSuccess, throwRequestFailureError } from './utils/response'
import { enumTypeToRaw } from './utils/post'
import type { AddCommentOption, PostType } from '../types/options'
import type { PostDetail, PostInfo } from '../types/entity'
import type { JikeClient } from './client'

export class JikePost {
  #client: JikeClient
  type: PostType
  id: string
  #info?: PostInfo
  #detail?: PostDetail

  constructor(client: JikeClient, type: PostType, id: string, info?: PostInfo) {
    this.#client = client
    this.type = type
    this.id = id
    this.#info = info
  }

  getInfo() {
    return this.#info
  }

  async queryDetail() {
    if (this.#detail) this.#detail
    const result = await this.#client.apiClient.posts.get(this.type, this.id)
    if (!isSuccess(result)) throwRequestFailureError(result, '获取动态详情')
    return (this.#detail = result.data.data)
  }

  /**
   * 动态点赞
   */
  async like() {
    const result = await this.#client.apiClient.posts.like(this.type, this.id)
    if (!isSuccess(result)) throwRequestFailureError(result, '动态点赞')
  }

  /**
   * 动态取消点赞
   */
  async unlike() {
    const result = await this.#client.apiClient.posts.unlike(this.type, this.id)
    if (!isSuccess(result)) throwRequestFailureError(result, '动态取消点赞')
  }

  /**
   * 删除动态
   * @returns 删除提示文本
   */
  async remove() {
    const result = await this.#client.apiClient.posts.remove(this.type, this.id)
    if (!isSuccess(result)) throwRequestFailureError(result, '删除动态')
    return result.data.toast
  }

  /**
   * 添加评论
   * @returns 评论信息
   */
  async addComment(content: string, option: AddCommentOption = {}) {
    const result = await this.#client.apiClient.comments.add(
      enumTypeToRaw(this.type),
      this.id,
      content,
      option
    )
    if (!isSuccess(result)) throwRequestFailureError(result, '添加评论')
    return result.data.data
  }
}
