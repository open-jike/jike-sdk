import { request, toResponse } from '../request'
import type { CreatePostOption, PostType } from '../types/options'
import type { Posts } from '../types/api-responses'

/**
 * 发送动态
 * @param content 内容
 * @param options 其他选项
 */
export const create = <T = Posts.CreateResponse>(
  type: PostType,
  content: string,
  options: CreatePostOption = {}
) =>
  toResponse<T>(
    request.post(`1.0/${type}/create`, {
      json: {
        content,
        pictureKeys: options.pictureKeys ?? [],
        syncToPersonalUpdate: options.syncToPersonalUpdates ?? true,
        submitToTopic: options.topicId,
        linkInfo: options.linkInfo,
      },
    })
  )

/**
 * 获取动态详情
 * @param id 动态ID
 */
export const get = <T = Posts.GetResponse>(type: PostType, id: string) =>
  toResponse<T>(
    request(`1.0/${type}/get`, {
      searchParams: { id },
    })
  )

/**
 * 分享动态
 * @param id 动态ID
 * @param method 分享方式
 * @returns
 */
export const share = <T = {}>(type: PostType, id: string, method: string) =>
  toResponse<T>(
    request.post(`1.0/${type}/share`, {
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
export const like = <T = {}>(type: PostType, id: string) =>
  toResponse<T>(
    request.post(`1.0/${type}/like`, {
      json: { id },
    })
  )

/**
 * 取消点赞动态
 * @param id 动态ID
 */
export const unlike = <T = {}>(type: PostType, id: string) =>
  toResponse<T>(
    request.post(`1.0/${type}/unlike`, {
      json: { id },
    })
  )

/**
 * 删除动态
 * @param id 动态ID
 */
export const remove = <T = Posts.RemoveResponse>(type: PostType, id: string) =>
  toResponse<T>(
    request.post(`1.0/${type}/remove`, {
      json: { id },
    })
  )
