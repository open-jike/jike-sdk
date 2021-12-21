import { toResponse, request } from '../request'
import type { PostTypeRaw } from '../types/entity'
import type { AddCommentOption } from '../types/options'
import type { Comments } from '../types/api-responses'

export const add = <T = Comments.AddResponse>(
  targetType: PostTypeRaw,
  targetId: string,
  content: string,
  option: AddCommentOption = {}
) =>
  toResponse<T>(
    request.post('1.0/comments/add', {
      json: {
        force: false,
        sourcePageName: 11,
        currentPageName: 14,
        content,
        syncToPersonalUpdates: option.syncToPersonalUpdates ?? false,
        pictureKeys: option.syncToPersonalUpdates ?? [],
        targetId,
        targetType,
      },
    })
  )

export const like = <T = {}>(targetType: PostTypeRaw, id: string) =>
  toResponse<T>(
    request.post('1.0/comments/like', {
      json: { targetType, id },
    })
  )

export const unlike = <T = {}>(targetType: PostTypeRaw, id: string) =>
  toResponse<T>(
    request.post('1.0/comments/unlike', {
      json: { targetType, id },
    })
  )
