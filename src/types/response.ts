export interface AvatarImage {
  thumbnailUrl: string
  smallPicUrl: string
  middlePicUrl: string
  picUrl: string
  format: string
  campaignDecorationUrl: string
}

export interface StatsCount {
  topicSubscribed: number
  topicCreated: number
  followedCount: number
  followingCount: number
  highlightedPersonalUpdates: number
  liked: number
  respectedCount: number
}

export interface BackgroundImage {
  picUrl: string
}

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

export interface WechatUserInfo {
  id: string
  externalName: string
}

export interface Medal {
  picUrl: string
  name: string
  gotMedalAt: string
}

export interface ProfileTag {
  picUrl: string
  type: string
  text: string
}

export interface RestrictedAvatarChange {
  nextChangeDate: Date
  limits: number
}

export interface RestrictedNameChange {
  nextChangeDate: string
  limits: number
}

export interface SimpleUser {
  id: string
  username: string
  screenName: string
  createdAt: Date
  updatedAt: Date
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
}

export interface ProfileVisitInfo {
  todayCount: number
  latestVisitor: SimpleUser
}

export interface User {
  id: string
  username: string
  screenName: string
  createdAt: Date
  updatedAt: Date
  isVerified: boolean
  verifyMessage: string
  briefIntro: string
  avatarImage: AvatarImage
  profileImageUrl: string
  statsCount: StatsCount
  isBannedForever: boolean
  isSponsor: boolean
  backgroundImage: BackgroundImage
  bio: string
  gender: string
  city: string
  country: string
  province: string
  groupId: string
  preferences: Preferences
  isBetaUser: boolean
  usernameSet: boolean
  wechatOpenId: string
  wechatUnionId: string
  mobilePhoneNumber: string
  areaCode: string
  groupVersion: number
  lastChangeNameTime: Date
  birthday: string
  wechatUserInfo: WechatUserInfo
  topicRoles: any[]
  school: Record<string, any> // TODO: unknown
  zodiac: string
  industry: string
  showRespect: boolean
  medals: Medal[]
  profileTags: ProfileTag[]
  backgroundMaskColor: string
  isLoginUser: boolean
  isBanned: boolean
  userHasPosted: boolean
  registerAppVersion: string
  hasStories: boolean
  restrictedAvatarChange: RestrictedAvatarChange
  restrictedNameChange: RestrictedNameChange
  isDefaultScreenName: boolean
  profileVisitInfo: ProfileVisitInfo
}

export interface TabIcons {
  tab4: string
}

export interface UserProfile {
  user: User
  enabledFeatures: string[]
  agreedProtocol: string[]
  tabIcons: TabIcons
}

export interface UserRefreshTokenResponse {
  success: boolean
  'x-jike-access-token': string
  'x-jike-refresh-token': string
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

export interface PostInfo {
  id: string
  type: string
  content: string
  urlsInText: any[]
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
  createdAt: Date
  isFeatured: boolean
  enablePictureComments: boolean
  repostable: boolean
  rollouts: Rollouts
  scrollingSubtitles: ScrollingSubtitle[]
}

export interface CreatePostResponse {
  success: boolean
  toast: string
  data: PostInfo
}

export interface GetFollowingListResponse {
  success: boolean
  data: SimpleUser[]
  loadMoreKey: { createdAt: Date }
}
