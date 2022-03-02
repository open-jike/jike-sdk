import { toResponse, request } from '../request'
import type { ListRecommendFeedOption } from '../types/options'
import type { RecommendFeed } from '../types/api-responses'

/**
 * 获取动态广场
 * @param option 选项
 */
export const list = <T = RecommendFeed.ListResponse>(
  option: ListRecommendFeedOption = {}
) =>
  toResponse<T>(
    request.post('1.0/recommendFeed/list', {
      json: {
        limit: option.limit ?? 10,
        trigger: option.trigger ?? 'auto',
        loadMoreKey: option.loadMoreKey,
      },
    })
  )
