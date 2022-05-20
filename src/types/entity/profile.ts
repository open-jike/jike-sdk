import type { StoryStatus } from './post'
import type { LiteralUnion } from '../../utils'
import type { AvatarImage, BackgroundImage, StatsCount, User } from './user'

/**
 * 用户信息
 */
export interface Profile {
  /** 用户ID */
  id: string
  /** 用户名 */
  username: string
  /** 昵称 */
  screenName: string
  /**
   * 注册时间
   *
   * ISO-8601 格式，如 `2015-03-04T00:00:00.000Z`
   */
  createdAt: string
  /**
   * 最后更新资料时间
   *
   * ISO-8601 格式，如 `2015-03-04T00:00:00.000Z`
   */
  updatedAt: string
  /** 是否已认证 */
  isVerified: boolean
  /** 认证信息 */
  verifyMessage: string
  /** 自我介绍，与 `bio` 一致 */
  briefIntro: string
  /** 头像信息 */
  avatarImage: AvatarImage
  /** 头像图片地址，`120px` x `120px` */
  profileImageUrl: string
  /** 统计信息 */
  statsCount: StatsCount
  /** 是否永久封禁 */
  isBannedForever: boolean
  /** 是否是赞助者 */
  isSponsor: boolean
  /** 背景图 */
  backgroundImage: BackgroundImage
  /** 签名 */
  bio: string
  /** 性别 */
  gender?: 'MALE' | 'FEMALE'
  /** 城市 ID，如 `001044001` */
  city: string
  /** 国家 ID，如 `001` */
  country: string
  /** 身份 ID，如 `001044` */
  province: string
  groupId: string
  /** 偏好设置，仅自己可见 */
  preferences?: Preferences
  /** 是否是测试版用户，仅自己可见 */
  isBetaUser?: boolean
  usernameSet?: boolean
  /** 微信 `OpenId`，仅自己可见 */
  wechatOpenId?: string
  /** 微信 `UnionId`，仅自己可见 */
  wechatUnionId?: string
  /**
   * 手机号，仅自己可见
   *
   * 有打码，如 `*******1234`
   */
  mobilePhoneNumber?: string
  /** 区号，仅自己可见，如 `+86` */
  areaCode?: string
  groupVersion: number
  /**
   * 上次改名时间，仅自己可见
   *
   * ISO-8601 格式，如 `2015-03-04T00:00:00.000Z`
   */
  lastChangeNameTime?: string
  /** 生日，仅自己可见，如 `2000-01-01` */
  birthday?: string
  /** 微信用户信息 */
  wechatUserInfo: WechatUserInfo
  topicRoles: any[]
  school?: School
  /** 星座 */
  zodiac: string
  /** 行业 */
  industry?: string
  /** 是否显示 `夸夸` */
  showRespect: boolean
  /** 勋章 */
  medals: Medal[]
  /** 主页标签 */
  profileTags: ProfileTag[]
  /** 背景图遮罩颜色，如 `#141A1F` */
  backgroundMaskColor: string
  /** 是否是登录用户，仅自己可见 */
  isLoginUser?: boolean
  /** 是否被封禁，仅自己可见 */
  isBanned?: boolean
  /** 是否发过动态，仅自己可见 */
  userHasPosted?: boolean
  /** 注册 APP 版本，仅自己可见 */
  registerAppVersion?: string
  /** 是否有日记，仅自己可见 */
  hasStories?: boolean
  /** 更换头像限制信息，仅自己可见 */
  restrictedAvatarChange?: RestrictedChange
  /** 更换昵称限制信息，仅自己可见 */
  restrictedNameChange?: RestrictedChange
  /** 是否是默认昵称，仅自己可见 */
  isDefaultScreenName?: boolean
  /** 访客信息，仅自己可见 */
  profileVisitInfo?: ProfileVisitInfo
  /** 是否关注 */
  following: boolean
  /** 是否拉黑 */
  blocking: boolean
  /** 是否 不看TA的内容 */
  muting: boolean
  /** 是否 添加到桌面小组件 */
  watching: boolean
  /** 是否特别关心 */
  isWatching: boolean
  /** 日记状态 */
  storyStatus: LiteralUnion<StoryStatus>
  /** 是否夸夸过 */
  respected: boolean

  [key: string]: any
}

/**
 * 偏好设置
 */
export interface Preferences extends Record<string, any> {
  autoPlayVideo: boolean
  topicTagGuideOn: boolean
  dailyNotificationOn: boolean
  followedNotificationOn: boolean
  subscribeWeatherForecast: boolean
  privateTopicSubscribe: boolean
  undiscoverableByPhoneNumber: boolean
  saveDataUsageMode: boolean
  topicPushSettings: string
  debugLogOn: boolean
  env: string
  syncCommentToPersonalActivity: boolean
  repostWithComment: boolean
  enablePrivateChat: boolean
  blockStrangerPoke: boolean
  enablePictureWatermark: boolean
  enableOperationPush: boolean
  enableChatSound: boolean
  replyNotificationAllowGroup: string
  likeNotificationOn: boolean
  respectNotificationOn: boolean
  mentionNotificationOn: boolean
  openMessageTabOnLaunch: boolean
  tabOnLaunch: string
  hideSubscribeTab?: any
  undiscoverableByWeiboUser?: any
  paidMarket?: any
  followingUpdatesSortBy: string
  liveNotificationOn: boolean
}

/**
 * 微信用户信息
 */
export interface WechatUserInfo {
  /** 微信 `OpenId` */
  id: string
  /** 微信昵称 */
  externalName: string
}

/**
 * 勋章信息
 */
export interface Medal {
  /** 图片地址 */
  picUrl: string
  /** 勋章名称 */
  name: string
  /** 获取时间 */
  gotMedalAt: string
}

/**
 * 主页标签
 */
export interface ProfileTag {
  /** 图片地址 */
  picUrl?: string
  /** 类型 */
  type: string
  /** 文本 */
  text: string
}

/**
 * 更换限制
 */
export interface RestrictedChange {
  /**
   * 下一次可更换时间
   *
   * ISO-8601 格式，如 `2015-03-04T00:00:00.000Z`
   */
  nextChangeDate: string
  /** 限制天数 */
  limits: number
}

/**
 * 访客信息
 */
export interface ProfileVisitInfo {
  /** 今日访客数 */
  todayCount: number
  /** 最后访客 */
  latestVisitor: User
}

/**
 * 学校信息
 */
export interface School {
  /** 学校 ID */
  id: string
  /** 学校名称 */
  name: string
  /** 专业 */
  major: string
  /** 入学年份 */
  enrollmentYear: number
  /**
   * 隐私类型
   * - `PUBLIC`: 公开
   * - `ALUMNI_ONLY`: 仅校友可见
   */
  privacyType: LiteralUnion<'PUBLIC' | 'ALUMNI_ONLY'>
}

/**
 * 底部栏图标信息
 */
export interface TabIcons {
  /** 第四个图标 */
  tab4: string
}
