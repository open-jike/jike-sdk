import { type Topic } from './topic'
import { type Picture, type ReadTrackInfo, type UrlsInText } from './post'
import { type User } from './user'

export type PostTypeRaw = 'ORIGINAL_POST' | 'REPOST'
export type TargetType = PostTypeRaw | 'STORY'

export interface Target {
  type: string
  id: string
  content: string
  urlsInText: UrlsInText[]
  status: string
  user: User
  commentCount: number
  repostCount: number
  likeCount: number
  shareCount: number
  rootType: string
  pictures: Picture[]
  createdAt: string
  liked: boolean
  collected: boolean
  syncCommentId: string
}

export interface ReplyToComment {
  type: string
  id: string
  targetType: string
  targetId: string
  threadId: string
  createdAt: Date
  level: number
  content: string
  likeCount: number
  replyCount: number
  status: string
  user: User
}

export interface HotReply {
  type: string
  id: string
  targetType: string
  targetId: string
  threadId: string
  createdAt: Date
  level: number
  content: string
  likeCount: number
  replyCount: number
  status: string
  user: User
  pictures: Picture[]
  replyToComment: ReplyToComment
}

export interface Comment {
  type: 'COMMENT'
  id: string
  targetType: string
  targetId: string
  threadId: string
  createdAt: string
  level: number
  content: string
  urlsInText: UrlsInText[]
  likeCount: number
  replyCount: number
  status: string
  user: User
  pictures: Picture[]
  liked: boolean
  hotReplies: HotReply[]
  enablePictureComments: boolean
  readTrackInfo: ReadTrackInfo
  collapsed: boolean
  collapsible: boolean
  isPinned: boolean
  hideable: boolean
  deletable: boolean
  pinnable: boolean
}

export interface Payload {
  id: string
  feedType: string
  type: string
  key: string
  reason: string
  readTrackInfo: ReadTrackInfo
}

export interface Reason {
  key: string
  text: string
  payload: Payload
}

export interface DislikeMenu {
  title: string
  subtitle: string
  reasons: Reason[]
}

export interface RecommendPost {
  id: string
  readTrackInfo: ReadTrackInfo
  dislikeMenu: DislikeMenu
  user: User
  topic: Topic
  content: string
  pictures: Picture[]
  likeCount: number
  commentCount: number
  repostCount: number
  shareCount: number
  createdAt: Date
  type: string
}
