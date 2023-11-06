import { request, toResponse } from '../request'
import type { PostTypeRaw } from '../types/entity'
import type {
  AddCommentOption,
  ListCommentMoreKey,
  ListPrimaryCommentOption,
  PaginationOption,
} from '../types/options'
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
        pictureKeys: option.pictureKeys ?? [],
        targetId,
        targetType,
        replyToCommentId: option.replyToCommentId,
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

export const remove = <T = Comments.RemoveResponse>(
  targetType: PostTypeRaw,
  id: string
) =>
  toResponse<T>(
    request.post('1.0/comments/remove', {
      json: { targetType, id },
    })
  )

export const listPrimary = <T = Comments.ListPrimaryResponse>(
  targetType: PostTypeRaw,
  targetId: string,
  option: ListPrimaryCommentOption = {}
) =>
  toResponse<T>(
    request.post('1.0/comments/listPrimary', {
      json: {
        targetType,
        targetId,
        order: option.order ?? 'LIKES',
        limit: option.limit ?? 10,
        loadMoreKey: option.loadMoreKey,
      },
    })
  )

export const list = <T = Comments.ListResponse>(
  targetType: PostTypeRaw,
  threadId: string,
  option: PaginationOption<ListCommentMoreKey> = {}
) =>
  toResponse<T>(
    request.post('1.0/comments/list', {
      json: {
        targetType,
        threadId,
        limit: option.limit ?? 20,
        loadMoreKey: option.loadMoreKey,
      },
    })
  )
