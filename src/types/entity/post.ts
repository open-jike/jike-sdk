import type { LiteralUnion } from '../../utils'
import type { CommonImage } from './common'
import type { User } from './user'
import type { Topic } from '.'

export type PostType = 'ORIGINAL_POST' | 'REPOST' | 'STORY'
export type StoryStatus = 'NONE' | 'READ' | 'PICTURE'
export type PostStatus = 'NORMAL' | 'DELETED'

/**
 * 个人更新动态
 */
export interface PersonalUpdate {
  type: 'PERSONAL_UPDATE'
  id: string
  /**
   * ISO-8601 格式，如 `2015-03-04T00:00:00.000Z`
   */
  createdAt: string
  updateIds: string[]
  action: LiteralUnion<'USER_FOLLOW' | 'LIVE_SHARE' | 'USER_RESPECT'>
  usernames: string[]
  targetUsernames: string[]
  users: User[]
  targetUsers: User[]
  readTrackInfo: ReadTrackInfo
}

/**
 * 原帖
 */
export interface OriginalPost {
  type: 'ORIGINAL_POST'
  id: string
  /**
   * ISO-8601 格式，如 `2015-03-04T00:00:00.000Z`
   */
  createdAt: string
  /** 内容 */
  content: string
  urlsInText: UrlsInText[]
  /** 状态 */
  status: PostStatus
  /** 是否禁止评论 */
  isCommentForbidden: boolean
  /** 点赞数 */
  likeCount: number
  /** 评论数 */
  commentCount: number
  /** 转发数 */
  repostCount: number
  /** 分享数 */
  shareCount: number
  /** @unknown 是否收藏 */
  collected: boolean
  /** @unknown 收藏时间 */
  collectTime: null | string
  /** 用户 */
  user: User
  /** @unknown */
  isFeatured: boolean
  /** @unknown */
  enablePictureComments: boolean
  /** 是否可转发 */
  repostable: boolean
  /** 圈子 */
  topic?: Topic
  /** 图片 */
  pictures?: Picture[]
  /** 视频 */
  video?: Video
  /** 链接 */
  linkInfo?: LinkInfo
  /** @unknown 似乎是用户的个性签名 */
  scrollingSubtitles?: ScrollingSubtitle[]
  rollouts?: Rollouts
  /** 点赞按钮 */
  likeIcon?: LiteralUnion<'book'>
  /** 阅读时的 track 信息 */
  readTrackInfo: ReadTrackInfo
  /** 是否点赞 */
  liked?: boolean
}

/**
 * 转帖
 */
export interface Repost {
  type: 'REPOST'
  id: string
  [key: string]: any
}

/** 动态 */
export type Post = OriginalPost | Repost

/** 主页动态 */
export type PersonalPost = {
  /**
   * ISO-8601 格式，如 `2015-03-04T00:00:00.000Z`
   */
  actionTime: string
} & Post

/** 关注动态 */
export type FollowingUpdate = {
  /**
   * ISO-8601 格式，如 `2015-03-04T00:00:00.000Z`
   */
  actionTime: string
} & (PersonalUpdate | Post)

/** 阅读时的 track 信息 */
export interface ReadTrackInfo {
  storyStatus?: LiteralUnion<StoryStatus>
  loadedAt: number
  feedType: LiteralUnion<'FOLLOWING_UPDATES'>
}

/** 图片信息 */
export interface Picture extends CommonImage {
  key: string
  cropperPosX: number
  cropperPosY: number
  width: number
  height: number
  watermarkPicUrl: string
}

/** 视频信息 */
export interface Video {
  type: 'VIDEO'
  image: {
    picUrl: string
    thumbnailUrl: string
    format: string
  }
  duration: number
  width: number
  height: number
}

/** 链接信息 */
export interface LinkInfo {
  title: string
  pictureUrl: string
  linkUrl: string
  source: string
}

/** 内容中的链接 */
export interface UrlsInText {
  title: string
  originalUrl: string
  url: string
  type: LiteralUnion<'mention' | 'link' | 'hashtag'>
}

/** @unknown */
export interface ScrollingSubtitle {
  text: string
  type: LiteralUnion<'COMMON'>
}

/** @unknown */
export interface Rollouts {
  wmpShare: {
    id: string
    path: string
  }
}
