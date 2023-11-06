import type { LiteralUnion } from '../../utils'
import type { Picture, PostStatus, PostType } from './post'
import type { User } from './user'

export interface Notification {
  id: string
  type: LiteralUnion<
    | 'LIKE_STORY'
    | 'REPLIED_TO_STORY_COMMENT'
    | 'COMMENT_STORY'
    | 'LIKE_PERSONAL_UPDATE'
    | 'COMMENT_PERSONAL_UPDATE'
    | 'REPLIED_TO_PERSONAL_UPDATE_COMMENT'
    | 'LIKE_PERSONAL_UPDATE_COMMENT'
    | 'COMMENT_AND_REPOST'
    | 'USER_RESPECT'
    | 'MENTION'
    | 'USER_FOLLOWED'
    | 'USER_SILENT_FOLLOWED'
    | 'PERSONAL_UPDATE_REPOSTED'
    | 'LIKE_AVATAR'
    | 'AVATAR_GREET'
  >
  /**
   * ISO-8601 格式，如 `2015-03-04T00:00:00.000Z`
   */
  createdAt: string
  /**
   * 似乎总是与 createdAt 一致
   * ISO-8601 格式，如 `2015-03-04T00:00:00.000Z`
   */
  updatedAt: string
  stoppable: boolean
  stopped: boolean
  actionType: LiteralUnion<'actionType' | 'USER_LIST'>
  actionItem: ActionItem
  linkUrl: string
  linkType: LiteralUnion<PostType>
  referenceItem: ReferenceItem
}

export interface ActionItem {
  type: LiteralUnion<'COMMENT' | 'LIKE' | 'FOLLOW'>
  users: User[]
  usersCount: number
  id: string
  content: string
  pictures: Picture[]
  enablePictureComments: boolean
  status: LiteralUnion<PostStatus>
  targetId: string
  targetType: LiteralUnion<PostType>
  collapsible: boolean
  collapsed: boolean
}

export interface ReferenceItem {
  id: string
  type: string
  content: string
  status: LiteralUnion<PostStatus>
  targetId: string
  targetType: LiteralUnion<PostType>
  /** 引用图片地址 */
  referenceImageUrl?: string
}
