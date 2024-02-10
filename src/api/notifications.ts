import { request, toResponse } from '../request'
import type { PaginationOption } from '../types/options'
import type { Notifications } from '../types/api-responses'

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
 * @param option 通知ID
 */
export const listMergedComment = <T = Notifications.ListMergedCommentResponse>(
  id: string,
) =>
  toResponse<T>(
    request.post(`1.0/notifications/listMergedMentions`, {
      json: {
        startNotificationId: id,
      },
    })
  )


/**
 *  获取通知列表，自动展开合并通知
 *  @param option 分页选项
 */
export const listWithMerged = async <T = Notifications.ListWithMergedResponse>(
  option: Pick<
    PaginationOption<{ lastNotificationId: string }>,
    'loadMoreKey'
  > = {}
) =>{
  let result = await list(option)
  let notifications = result.data.data
  for (const notification of notifications) {
    if (notification.linkType === 'MERGED_MENTION') {
      const mergedResult = await listMergedComment(notification.id)
      const mergedNotifications = mergedResult.data.data
      const index = notifications.indexOf(notification)
      notifications.splice(index, 1, ...mergedNotifications)
    }
  }
  result.data.data = notifications
  return result


}

