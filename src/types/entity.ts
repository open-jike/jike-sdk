/**
 * 头像图片
 */
export interface AvatarImage {
  /** `120px` x `120px` */
  thumbnailUrl: string
  /** `300px` x `300px` */
  smallPicUrl: string
  /** `800px` x `800px` */
  middlePicUrl: string
  /** `1000px` x `1000px` */
  picUrl: string
  /** 格式，如 `jpeg` */
  format: string

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

/**
 * 偏好设置
 */
export interface Preferences {
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
  latestVisitor: SimpleUser
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
  privacyType: 'PUBLIC' | 'ALUMNI_ONLY'
}

/**
 * 用户信息
 */
export interface User {
  /** 用户ID，无实际含义 */
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
  gender: 'MALE' | 'FEMALE'
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
}

export interface SimpleUser {
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
  refRemark?: RefRemark
  bio?: string
  decorations?: Decorations
  sponsorExpiresAt?: string
  trailingIcons?: TrailingIcon[]
  following?: boolean
}

/**
 * 底部栏图标信息
 */
export interface TabIcons {
  /** 第四个图标 */
  tab4: string
}

export interface RefRemark {
  type: string
  refId: string
}

export interface Rollouts {
  wmpShare: {
    id: string
    path: string
  }
}

export interface ScrollingSubtitle {
  text: string
  type: string
}

export type PostTypeRaw = 'ORIGINAL_POST' | 'REPOST'
export interface PostDetail {
  id: string
  type: PostTypeRaw
  content: string
  urlsInText: UrlsInText[]
  status: string
  isCommentForbidden: boolean
  likeCount: number
  commentCount: number
  repostCount: number
  shareCount: number
  pictures: any[]
  collected: boolean
  collectTime?: any
  user: SimpleUser
  createdAt: string
  isFeatured: boolean
  enablePictureComments: boolean
  repostable: boolean
  rollouts: Rollouts
  scrollingSubtitles: ScrollingSubtitle[]
  actionTime?: string
  pinned?: Pinned
  target?: Target
  targetType?: string
  rootType?: string
  liked?: boolean
  syncCommentId?: string
  replyToComment?: Comment
}

export interface Sponsor {
  picUrl: string
  themes: {
    dark: {
      picUrl: string
    }
  }
}

export interface Decorations {
  sponsor: Sponsor
}

export interface Picture {
  picUrl: string
  format: string
}

export interface TrailingIcon {
  picture: Picture
  picUrl: string
  url: string
}

export interface Pinned {
  personalUpdate: boolean
}

export interface Target {
  type: string
  id: string
  content: string
  urlsInText: any[]
  status: string
  user: SimpleUser
  commentCount: number
  repostCount: number
  likeCount: number
  shareCount: number
  rootType: string
  pictures: any[]
  createdAt: string
  liked: boolean
  collected: boolean
  syncCommentId: string
}
export interface UrlsInText {
  title: string
  originalUrl: string
  url: string
  type: string
}

export interface SquarePicture {
  format: string
  picUrl: string
  middlePicUrl: string
  smallPicUrl: string
  thumbnailUrl: string
  livePhoto?: any
  themes: any
}

export interface Tips {
  inDraft: string
  inComment: string
}

export interface Topic {
  id: string
  type: string
  content: string
  subscribersCount: number
  squarePicture: SquarePicture
  briefIntro: string
  topicType: string
  operateStatus: string
  isValid: boolean
  isVerified: boolean
  topicId: number
  isSearchable: boolean
  likeIcon: string
  messagePrefix: string
  internalTags: any[]
  customTags: any[]
  auditStatus: string
  newCategory: any[]
  involvedUsers?: any
  entryTab: string
  tabs: any[]
  rectanglePicture?: any
  pictureUrl: string
  thumbnailUrl: string
  subscribedStatusRawValue: number
  subscribedAt: string
  ref: string
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
  maintainer?: any
  isUserTopicAdmin: boolean
  activitySection?: any
  activitySections: any[]
  tips: Tips
  toppingArea?: any
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

export interface LinkInfo {
  title: string
  pictureUrl: string
  linkUrl: string
  source: string
}

export interface ReadTrackInfo {
  recommendReason: string
  recommendReasonPolicy: string
}

export interface ActionItem {
  type: string
  users: SimpleUser[]
  usersCount: number
  id: string
  content: string
  pictures: any[]
  enablePictureComments: boolean
  status: string
  targetId: string
  targetType: string
  collapsible: boolean
  collapsed: boolean
}

export interface ReferenceItem {
  id: string
  type: string
  content: string
  status: string
  targetId: string
  targetType: string
}

export interface Notification {
  id: string
  type: string
  createdAt: string
  updatedAt: string
  stoppable: boolean
  stopped: boolean
  actionType: string
  actionItem: ActionItem
  linkUrl: string
  linkType: string
  referenceItem: ReferenceItem
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
  user: SimpleUser
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
  user: SimpleUser
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
  user: SimpleUser
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
