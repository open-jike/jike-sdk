import { toResponse, request } from '../request'
import type { CreatePostOption } from '../types/options'
import type { Posts } from '../types/api-responses'

/**
 * 发送动态
 * @param content 内容
 * @param options 其他选项
 */
export const create = <T = Posts.CreateResponse>(
  content: string,
  options: CreatePostOption = {}
) =>
  toResponse<T>(
    request.post('1.0/originalPosts/create', {
      json: {
        content,
        pictureKeys: options.pictureKeys ?? [],
        syncToPersonalUpdate: options.syncToPersonalUpdate ?? true,
      },
    })
  )

/**
 * 获取动态详情
 * @param id 动态ID
 */
export const get = <T = Posts.GetResponse>(id: string) =>
  toResponse<T>(
    request('1.0/originalPosts/get', {
      searchParams: { id },
    })
  )

/**
 * 分享动态
 * @param id 动态ID
 * @param method 分享方式
 * @returns
 */
export const share = <T = {}>(id: string, method: string) =>
  toResponse<T>(
    request.post('1.0/originalPosts/share', {
      json: {
        id,
        method,
      },
    })
  )

/**
 * 点赞动态
 * @param id 动态ID
 */
export const like = <T = {}>(id: string) =>
  toResponse<T>(
    request.post('1.0/originalPosts/like', {
      json: { id },
    })
  )

/**
 * 取消点赞动态
 * @param id 动态ID
 */
export const unlike = <T = {}>(id: string) =>
  toResponse<T>(
    request.post('1.0/originalPosts/unlike', {
      json: { id },
    })
  )
