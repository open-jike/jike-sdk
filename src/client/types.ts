import type { ApiConfigResolved } from '../request'
import type { PersonalUpdate } from '../types/api-responses'

export interface JikeClientJSON extends Omit<ApiConfigResolved, 'beforeRetry'> {
  refreshToken: string
  userId: string
  username: string
  screenName: string
}

export type FollowingUpdatesMoreKey =
  PersonalUpdate.FollowingUpdatesResponseMoreKey
