import { request, toResponse } from '../request'
import type { Stories } from '../types/api-responses'

/**
 * 获取关注用户日记列表
 */
export const followingFeed = async <T = Stories.FollowingFeedResponse>() =>
  toResponse<T>(request.get('1.0/stories/followingFeed'))

/**
 * 获取用户的日记详情
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

/**
 * 获取用户的日记视频地址
 * @param id 视频日记id
 */
export const getStoryVideo = async <T = Stories.StoryVideoResponse>(
  id: string
) =>
  toResponse<T>(
    request.post('1.0/mediaMeta/interactive', {
      searchParams: {
        id,
        type: 'STORY',
        trigger: 'user',
      },
    })
  )
