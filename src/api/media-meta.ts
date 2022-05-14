import { request, toResponse } from '../request'
import type { InteractiveResponse } from '../types/api-responses'

/**
 * 获取视频地址
 * @param id 视频id
 * @param type 类型 如：STORY
 * @param trigger 触发 如：user
 */
export const interactive = async <T = InteractiveResponse>(
  id: string,
  type: string,
  trigger: string
) =>
  toResponse<T>(
    request.post('1.0/mediaMeta/interactive', {
      searchParams: {
        id,
        type,
        trigger,
      },
    })
  )
