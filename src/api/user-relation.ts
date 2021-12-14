import { request } from '../common'
import type { PaginationOption } from '../types/request'

/**
 * 获取关注列表
 * @param username 用户名
 * @param option 选项
 */
export const getFollowingList = (
  username: string,
  option: PaginationOption = {}
) =>
  request.post('1.0/userRelation/getFollowingList', {
    json: {
      username,
      limit: option.limit ?? 10,
      loadMoreKey: option.loadMoreKey,
    },
  })
