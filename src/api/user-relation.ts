import { request, toResponse } from '../request'
import type { UserRelation } from '../types/api-responses'
import type { PaginationOption } from '../types/options'

/**
 * 获取关注列表
 * @param username 用户名
 * @param option 选项
 */
export const getFollowingList = <T = UserRelation.GetFollowingListResponse>(
  username: string,
  option: PaginationOption = {}
) =>
  toResponse<T>(
    request.post('1.0/userRelation/getFollowingList', {
      json: {
        username,
        limit: option.limit ?? 10,
        loadMoreKey: option.loadMoreKey,
      },
    })
  )

/**
 * 获取被关注列表
 * @param username 用户名
 * @param option 选项
 */
export const getFollowerList = <T = UserRelation.GetFollowerListResponse>(
  username: string,
  option: PaginationOption = {}
) =>
  toResponse<T>(
    request.post('1.0/userRelation/getFollowerList', {
      json: {
        username,
        limit: option.limit ?? 10,
        loadMoreKey: option.loadMoreKey,
      },
    })
  )
