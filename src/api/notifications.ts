import { request, toResponse } from '../request'
import { type PaginationOption } from '../types/options'
import { type Notifications } from '../types/api-responses'

/**
 * 获取通知列表
 * @param option 分页选项
 */
export const list = <T = Notifications.ListResponse>(
  option: Pick<
    PaginationOption<{ lastNotificationId: string }>,
    'loadMoreKey'
  > = {}
) =>
  toResponse<T>(
    request.post('1.0/notifications/list', {
      json: {
        loadMoreKey: option.loadMoreKey,
      },
    })
  )
