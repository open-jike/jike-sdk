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
  bio?: string
  decorations?: Decorations
  sponsorExpiresAt?: Date
  trailingIcons?: TrailingIcon[]
  following?: boolean
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

  actionTime?: Date
  pinned?: Pinned
  target?: Target
  targetType?: string
  rootType?: string
  liked?: boolean
  syncCommentId?: string
  replyToComment?: ReplyToComment
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

export interface GetSmsCodeResponse {
  success: boolean
  data: {
    action: string
  }
}

export interface LoginFailureResponse {
  success: false
  error: string
}

export interface LoginSuccessResponse {
  success: true
  isRegister: boolean
  user: User
  enabledFeatures: string[]
  agreedProtocol: string[]
  bioUpdateAlert: boolean
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
  createdAt: Date
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
  urlsInText: any[]
  likeCount: number
  replyCount: number
  status: string
  user: SimpleUser
  pictures: any[]
  liked: boolean
  enablePictureComments: boolean
  readTrackInfo: any
  collapsed: boolean
  collapsible: boolean
  isPinned: boolean
  pinnable: boolean
}

export interface SingleResponse {
  success: boolean
  data: PostInfo[]
  loadMoreKey: {
    lastId: string
  }
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
  subscribedAt: Date
  ref: string
  isDreamTopic: boolean
  isAnonymous: boolean
  enablePictureComments: boolean
  enablePictureWatermark: boolean
  timeForRank: string
  lastMessagePostTime: Date
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
  squarePostUpdateTime: Date
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

export interface PostDetail {
  id: string
  type: string
  content: string
  urlsInText: UrlsInText[]
  status: string
  isCommentForbidden: boolean
  likeCount: number
  commentCount: number
  repostCount: number
  shareCount: number
  topic: Topic
  linkInfo: LinkInfo
  pictures: any[]
  collected: boolean
  collectTime?: any
  user: SimpleUser
  createdAt: Date
  isFeatured: boolean
  enablePictureComments: boolean
  repostable: boolean
  scrollingSubtitles: ScrollingSubtitle[]
  pinned: Pinned
  shouldShowCommentTip: boolean
  readTrackInfo: ReadTrackInfo
}

export interface PostDetailResponse {
  data: PostDetail
}
