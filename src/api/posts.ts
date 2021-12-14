import { request } from '../common'
import type { CreatePostOption } from '../types/request'
import type { CreatePostResponse } from '../types/response'

/**
 * 发送动态
 * @param content 内容
 * @param options 其他选项
 */
export const createPost = <T = CreatePostResponse>(
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
