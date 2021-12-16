import { request } from '../common'
import type { PaginationOption } from '../types/request'
import type { NotificationListResponse } from '../types/response'

/**
 * 获取通知列表
 * @param option 分页选项
 */
export const list = <T = NotificationListResponse>(
  option: Pick<PaginationOption, 'loadMoreKey'> = {}
) =>
  request
    .post('1.0/notifications/list', {
      json: {
        loadMoreKey: option.loadMoreKey,
      },
    })
    .json<T>()
