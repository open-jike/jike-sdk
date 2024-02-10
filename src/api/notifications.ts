import { request, toResponse } from '../request'
import type { PaginationOption } from '../types/options'
import type { Notifications } from '../types/api-responses'
import type { Notification } from '../types/entity'

/**
 * 获取通知列表
 * @param option 分页选项
 */
export const list = <T = Notifications.ListResponse>(
  option: Pick<
    PaginationOption<{ lastNotificationId: string }>,
    'loadMoreKey'
  > = {},
) =>
  toResponse<T>(
    request.post('1.0/notifications/list', {
      json: {
        loadMoreKey: option.loadMoreKey,
      },
    }),
  )

/**
 * 获取合并通知的列表
 * @param option 起始通知 ID
 */
export const listMergedMentions = <
  T = Notifications.ListMergedMentionsResponse,
>(
  id: string,
) =>
  toResponse<T>(
    request.post(`1.0/notifications/listMergedMentions`, {
      json: {
        startNotificationId: id,
      },
    }),
  )

/**
 * 获取通知列表，自动展开合并通知
 * @param option 分页选项
 */
export const listWithMerged = async (
  option: Pick<
    PaginationOption<{ lastNotificationId: string }>,
    'loadMoreKey'
  > = {},
) => {
  const result = await list(option)
  const notifications: Notification[] = []
  for (const item of result.data.data) {
    if (item.linkType === 'MERGED_MENTION') {
      const merged = (await listMergedMentions(item.id)).data.data
      notifications.push(...merged)
    } else {
      notifications.push(item)
    }
  }
  result.data.data = notifications
  return result
}
