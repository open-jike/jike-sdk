import { toResponse, request } from '../request'
import type { PaginationOption } from '../types/options'
import type { PersonalUpdate } from '../types/api-responses'

/**
 * 获取用户动态
 * @param username 用户名
 * @param option 选项
 */
export const single = async <T = PersonalUpdate.SingleResponse>(
  username: string,
  option: PaginationOption<{ lastId: string }> = {}
) =>
  toResponse<T>(
    request.post('1.0/personalUpdate/single', {
      json: {
        username,
        limit: option.limit ?? 10,
        loadMoreKey: option.loadMoreKey,
      },
    })
  )

/**
 * 获取关注动态
 * @param option 分页选项
 */
export const followingUpdates = async <
  T = PersonalUpdate.FollowingUpdatesResponse
>(
  option: PaginationOption<{
    session: 'PopulatedUpdate'
    lastReadTime: number
    lastPageEarliestTime: number
  }> = {}
) =>
  toResponse<T>(
    request.post('1.0/personalUpdate/followingUpdates', {
      json: {
        limit: option.limit ?? 10,
        loadMoreKey: option.loadMoreKey,
      },
    })
  )
