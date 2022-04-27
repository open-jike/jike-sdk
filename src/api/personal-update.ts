import { request, toResponse } from '../request'
import type { PostTypeRaw } from '../types/entity'
import type { PaginationOption } from '../types/options'
import type { PersonalUpdate , Stories} from '../types/api-responses'

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

/**
 * 置顶动态
 */
export const pin = async <T = PersonalUpdate.PinResponse>(
  type: PostTypeRaw,
  id: string
) =>
  toResponse<T>(
    request.post('1.0/personalUpdate/pin', {
      json: {
        id,
        type,
      },
    })
  )

/**
 * 取消置顶动态
 */
export const unpin = async <T = PersonalUpdate.UnpinResponse>(
  type: PostTypeRaw,
  id: string
) =>
  toResponse<T>(
    request.post('1.0/personalUpdate/unpin', {
      json: {
        id,
        type,
      },
    })
  )

/**
 * 获取关注用户快拍列表
 */
export const followingFeed = async <T = Stories.FollowingFeedResponse>(

) => toResponse<T>(
  request.get('1.0/stories/followingFeed')
)

/**
 * 获取用户的快拍详情
 */
export const listUserStories = async <T = Stories.ListUserStoriesResponse>(
  username: string
) => toResponse<T>(
  request.get('1.0/stories/listUserStories',{
    searchParams: {
      username: username
    },
  })
)