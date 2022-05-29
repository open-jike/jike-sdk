import { request, toResponse } from '../request'
import type { Topic } from '../types/api-responses'
import type { PaginationOption } from '../types/options'

/**
 * 获取圈子动态
 * @param topicId 圈子 id
 * @param option 选项
 */
export const getTabsSquareFeed = <T = Topic.GetTabsSquareFeedResponse>(
  topicId: string,
  option: PaginationOption = {}
) =>
  toResponse<T>(
    request.post('1.0/topics/tabs/square/feed', {
      json: {
        topicId,
        limit: option.limit ?? 10,
        loadMoreKey: option.loadMoreKey,
      },
    })
  )

/**
 * 获取圈子热门动态
 * @param topicId 圈子 id
 * @param option 选项
 */
export const getTabsSelectedFeed = <T = Topic.GetTabsSelectedFeedResponse>(
  topicId: string,
  option: PaginationOption<{ offset: number }> = {}
) =>
  toResponse<T>(
    request.post('1.0/topics/tabs/selected/feed', {
      json: {
        topicId,
        limit: option.limit ?? 10,
        loadMoreKey: option.loadMoreKey,
      },
    })
  )
