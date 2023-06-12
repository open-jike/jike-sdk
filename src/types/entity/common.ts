import { type LiteralUnion } from '../../utils'

export interface CommonImage {
  thumbnailUrl: string
  smallPicUrl: string
  middlePicUrl: string
  picUrl: string
  /** 格式，如 `jpeg`, `heic` */
  format: LiteralUnion<'jpeg' | 'heic' | 'png'>
}

// 地图 POI
export interface Poi {
  poiId: string // id
  name: string
  location: number[] // 经纬度
  countryname: string // 国家
  pname: string // 省份
  cityname: string // 城市
  formattedAddress: string
}

export type Ref =
  | ''
  | 'FOLLOWINGS_FEED_FOLLOW_SECTION'
  | 'FOLLOWINGS_FEED_POST_TOPIC'
  | 'FOLLOWINGS_FEED_RESPECT_SECTION_CELL'
  | 'NOTIFICATIONS'
  | 'PROFILE_FEED_POST_TOPIC'
  | 'PROFILE_MY_FOLLOWERS'
  | 'PROFILE_MY_FOLLOWINGS'
  | 'RECOMMEND_FEED_FRIEND_DISCOVERY_FollowingUserRespectUser'
  | 'RECOMMEND_FEED_FRIEND_DISCOVERY_KolUser'
  | 'RECOMMEND_FEED_FRIEND_DISCOVERY_SimilarPostCreatorRelatedUser'
  | 'RECOMMEND_FEED_POST'
  | 'RECOMMEND_FEED_POST_TOPIC'
  | 'REPOST_POST'
