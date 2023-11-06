import type { LiteralUnion } from '../../utils'
import type { CommonImage, Poi, Ref } from './common'
import type { OriginalPost } from './post'

export interface Topic {
  type: 'TOPIC'
  id: string
  content: string
  /** 圈子人数 */
  subscribersCount: number
  /** 圈子图片 */
  squarePicture: SquarePicture
  /** 圈子介绍 */
  briefIntro: string
  topicType: LiteralUnion<'OFFICIAL' | 'CUSTOM'>
  operateStatus: LiteralUnion<'ONLINE'>
  /** 是否有效 */
  isValid: boolean
  /** 是否认真 */
  isVerified: boolean
  /** 圈子 ID */
  topicId?: number
  /** 是否可被搜索 */
  isSearchable: boolean
  /** 点赞图标 */
  likeIcon: string
  messagePrefix: string
  internalTags: any[]
  customTags: any[]
  auditStatus: string
  newCategory: any[]
  involvedUsers: any
  entryTab: any
  tabs: any[]
  rectanglePicture: any
  pictureUrl: string
  thumbnailUrl: string
  subscribedStatusRawValue: number
  subscribedAt: string
  ref: LiteralUnion<Ref>
  isDreamTopic: boolean
  isAnonymous: boolean
  enablePictureComments: boolean
  enablePictureWatermark: boolean
  timeForRank: string
  lastMessagePostTime: string
  createdAt: string
  updatedAt: string
  subscribersTextSuffix: string
  subscribersName: string
  friendsAlsoSubscribe: string
  maintainer: any
  isUserTopicAdmin: boolean
  activitySection: any
  activitySections: any[]
  tips: {
    inDraft: string
    inComment: string
  }
  toppingArea: any
  inShortcuts: boolean
  preferSection: string
  relatedHashtags: any[]
  intro: string
  squarePostUpdateTime: string
  subscribersAction: string
  approximateSubscribersCount: string
  subscribersDescription: string
  isCommentForbidden: boolean
  botCount: number
  recentPost: string
  source: string
  enableForUserPost: boolean
}

export interface SquarePicture extends CommonImage {
  livePhoto: any
  themes: any
}

export interface SquareFeed extends OriginalPost {
  poi?: Poi
  isSuppressed: boolean
  subtitle: string
}
