import { request } from '../common'
import type {
  GetFollowingListResponse,
  GetFollowerListResponse,
} from '../types/response'
import type { PaginationOption } from '../types/request'

/**
 * 获取关注列表
 * @param username 用户名
 * @param option 选项
 */
export const getFollowingList = <T = GetFollowingListResponse>(
  username: string,
  option: PaginationOption = {}
) =>
  request
    .post('1.0/userRelation/getFollowingList', {
      json: {
        username,
        limit: option.limit ?? 10,
        loadMoreKey: option.loadMoreKey,
      },
    })
    .json<T>()

/**
 * 获取被关注列表
 * @param username 用户名
 * @param option 选项
 */
export const getFollowerList = <T = GetFollowerListResponse>(
  username: string,
  option: PaginationOption = {}
) =>
  request
    .post('1.0/userRelation/getFollowerList', {
      json: {
        username,
        limit: option.limit ?? 10,
        loadMoreKey: option.loadMoreKey,
      },
    })
    .json<T>()
