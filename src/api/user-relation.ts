import { request, toResponse } from '../request'
import type { UserRelation } from '../types/api-responses'
import type {
  PaginationOption,
  UserFollowOption,
  UserUnfollowOption,
} from '../types/options'

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
  option: PaginationOption<{ createdAt: string }> = {}
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

/**
 * 关注用户
 * @param username 用户名
 * @param pageName 页面名称，可选
 */
export const follow = <T = UserRelation.FollowResponse>(
  username: string,
  { pageName = 11 }: UserFollowOption = {}
) =>
  toResponse<T>(
    request.post('1.0/userRelation/follow', {
      json: {
        sourcePageName: pageName,
        currentPageName: pageName,
        username,
      },
    })
  )

/**
 * 取消关注用户
 * @param username 用户名
 * @param option 选项，可选
 */
export const unfollow = <T = UserRelation.UnfollowResponse>(
  username: string,
  { pageName = 49, ref = 'PROFILE_MY_FOLLOWINGS' }: UserUnfollowOption = {}
) =>
  toResponse<T>(
    request.post('1.0/userRelation/unfollow', {
      json: {
        currentPageName: pageName,
        username,
        ref,
        sourcePageName: pageName,
      },
    })
  )

/**
 * 不看 TA 的内容
 * @param userId 用户 ID
 */
export const mute = <T = UserRelation.MuteResponse>(userId: string) =>
  toResponse<T>(
    request.post('1.0/userRelation/mute', {
      json: {
        id: userId,
      },
    })
  )

/**
 * 重新看 TA 的内容
 * @param userId 用户 ID
 */
export const unmute = <T = UserRelation.UnmuteResponse>(userId: string) =>
  toResponse<T>(
    request.post('1.0/userRelation/unmute', {
      json: {
        id: userId,
      },
    })
  )
