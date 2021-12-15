import { request } from '../common'
import type { CreatePostOption } from '../types/request'
import type { CreatePostResponse, PostDetailResponse } from '../types/response'

/**
 * 发送动态
 * @param content 内容
 * @param options 其他选项
 */
export const create = <T = CreatePostResponse>(
  content: string,
  options: CreatePostOption = {}
) =>
  request
    .post('1.0/originalPosts/create', {
      json: {
        content,
        pictureKeys: options.pictureKeys ?? [],
        syncToPersonalUpdate: options.syncToPersonalUpdate ?? true,
      },
    })
    .json<T>()

export const get = <T = PostDetailResponse>(id: string) =>
  request('1.0/originalPosts/get', {
    searchParams: { id },
  }).json<T>()

export const share = <T = { success: boolean }>(id: string, method: string) =>
  request
    .post('1.0/originalPosts/share', {
      json: {
        id,
        method,
      },
    })
    .json<T>()
