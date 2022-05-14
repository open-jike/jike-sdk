import type { LiteralUnion } from '../../utils/typings'

export interface CommonImage {
  thumbnailUrl: string
  smallPicUrl: string
  middlePicUrl: string
  picUrl: string
  /** 格式，如 `jpeg`, `heic` */
  format: LiteralUnion<'jpeg'>
}

export type Ref =
  | ''
  | 'FOLLOWINGS_FEED_POST_TOPIC'
  | 'REPOST_POST'
  | 'FOLLOWINGS_FEED_RESPECT_SECTION_CELL'
  | 'FOLLOWINGS_FEED_FOLLOW_SECTION'
  | 'RECOMMEND_FEED_POST'
  | 'RECOMMEND_FEED_POST_TOPIC'
  | 'RECOMMEND_FEED_FRIEND_DISCOVERY_SimilarPostCreatorRelatedUser'
  | 'RECOMMEND_FEED_FRIEND_DISCOVERY_FollowingUserRespectUser'
  | 'RECOMMEND_FEED_FRIEND_DISCOVERY_KolUser'
