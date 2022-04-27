import { request, toResponse } from '../request'
import type { Stories } from '../types/api-responses'

/**
 * 获取关注用户快拍列表
 */
export const followingFeed = async <T = Stories.FollowingFeedResponse>() =>
  toResponse<T>(request.get('1.0/stories/followingFeed'))

/**
 * 获取用户的快拍详情
 * @param username 用户名
 */
export const listUserStories = async <T = Stories.ListUserStoriesResponse>(
  username: string
) =>
  toResponse<T>(
    request.get('1.0/stories/listUserStories', {
      searchParams: {
        username,
      },
    })
  )
