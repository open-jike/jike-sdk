import type { StoryStatus } from './post'
import type { CommonImage } from './common'

/**
 * 头像图片
 */
export interface AvatarImage extends CommonImage {
  /** `120px` x `120px` */
  thumbnailUrl: string
  /** `300px` x `300px` */
  smallPicUrl: string
  /** `800px` x `800px` */
  middlePicUrl: string
  /** `1000px` x `1000px` */
  picUrl: string
  /** @unknown */
  campaignDecorationUrl: string
}

/**
 * 用户统计信息
 */
export interface StatsCount {
  /** 关注的话题 */
  topicSubscribed: number
  /** 创建的话题 */
  topicCreated: number
  /** 被关注数量 */
  followedCount: number
  /** 关注数量 */
  followingCount: number
  /** 精选动态数量 */
  highlightedPersonalUpdates: number
  /** 获取点赞数 */
  liked: number
  /** 夸夸数 */
  respectedCount: number
}

/** 背景图片 */
export interface BackgroundImage {
  /** 背景图图片地址 */
  picUrl: string
}

/** 用户信息 */
export interface User {
  id: string
  username: string
  screenName: string
  createdAt: string
  updatedAt: string
  isVerified: boolean
  verifyMessage: string
  briefIntro: string
  avatarImage: AvatarImage
  profileImageUrl: string
  statsCount: StatsCount
  isBannedForever: boolean
  isSponsor: boolean
  backgroundImage: BackgroundImage
  gender: string
  city?: string
  country?: string
  province?: string
  ref?: string
  refRemark?: RefRemark
  bio?: string
  decorations?: {
    /** 会员 */
    sponsor: {
      picUrl: string
      themes: {
        dark: {
          picUrl: string
        }
      }
    }
  }
  /** 会员过期时间 */
  sponsorExpiresAt?: string
  /** 尾部图标 */
  trailingIcons?: TrailingIcon[]
  following?: boolean
  storyStatus?: StoryStatus
}

export interface RefRemark {
  type: string
  refId: string
}

export interface TrailingIcon {
  picture: {
    picUrl: string
    format: string
  }
  picUrl: string
  url: string
}
