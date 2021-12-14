import { request } from '..'
import type { CreatePostResponse } from '../types/response'

interface CreatePostOption {
  /**
   * 同步到个人主页
   * @default true
   */
  syncToPersonalUpdate?: boolean
  /**
   * 图片 key 列表
   * @default []
   */
  pictureKeys?: string[]
}

/**
 * 发送动态
 * @param content 内容
 * @param options 其他选项
 */
export const createPost = <T = CreatePostResponse>(
  content: string,
  options: CreatePostOption = {}
) =>
  request.post<T>('1.0/originalPosts/create', {
    json: {
      content,
      pictureKeys: options.pictureKeys ?? [],
      syncToPersonalUpdate: options.syncToPersonalUpdate ?? true,
    },
  })
