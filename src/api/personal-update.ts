import { request } from '../common'
import type { PaginationOption } from '../types/request'
import type { SingleResponse } from '../types/response'

/**
 * 获取关注列表
 * @param username 用户名
 * @param option 选项
 */
export const single = async <T = SingleResponse>(
  username: string,
  option: PaginationOption = {}
) =>
  request
    .post('1.0/personalUpdate/single', {
      json: {
        username,
        limit: option.limit ?? 10,
        loadMoreKey: option.loadMoreKey,
      },
    })
    .json<T>()
