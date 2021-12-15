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

/**
 * 获取动态详情
 * @param id 动态ID
 */
export const get = <T = PostDetailResponse>(id: string) =>
  request('1.0/originalPosts/get', {
    searchParams: { id },
  }).json<T>()

/**
 * 分享动态
 * @param id 动态ID
 * @param method 分享方式
 * @returns
 */
export const share = <T = { success: boolean }>(id: string, method: string) =>
  request
    .post('1.0/originalPosts/share', {
      json: {
        id,
        method,
      },
    })
    .json<T>()

/**
 * 点赞动态
 * @param id 动态ID
 */
export const like = <T = { success: boolean }>(id: string) =>
  request
    .post('1.0/originalPosts/like', {
      json: { id },
    })
    .json<T>()

/**
 * 取消点赞动态
 * @param id 动态ID
 */
export const unlike = <T = { success: boolean }>(id: string) =>
  request
    .post('1.0/originalPosts/unlike', {
      json: { id },
    })
    .json<T>()
