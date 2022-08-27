import { request, toResponse } from '../request'
import type { Topics } from '../types/api-responses'
import type { PaginationOption } from '../types/options'

/**
 * 获取圈子动态
 * @param topicId 圈子 id
 * @param option 选项
 */
export const getTabsSquareFeed = <T = Topics.GetTabsSquareFeedResponse>(
  topicId: string,
  // NOTE: suppressed 应该传 false，但不知道这个参数是什么意思
  option: PaginationOption<{ lastId: string; suppressed: boolean }> = {}
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
export const getTabsSelectedFeed = <T = Topics.GetTabsSelectedFeedResponse>(
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
