/* eslint-disable @typescript-eslint/no-namespace */

import type { LiteralUnion } from '../utils'
import type {
  Comment,
  FollowingUpdate,
  Notification,
  OriginalPost,
  PersonalPost,
  Profile as ProfileEntity,
  RecommendPost,
  SquareFeed,
  Story,
  TabIcons,
  Topic,
  User,
} from './entity'

export namespace Posts {
  export interface CreateResponse {
    /** 提示文本 */
    toast: string
    data: OriginalPost
  }
  export interface GetResponse {
    // TODO: post detail
    data: any
  }
  export interface RemoveResponse {
    /** 提示文本 */
    toast: string
  }
  export interface ListLikedUsersResponse {
    data: User[]
    loadMoreKey?: string
  }
  export interface HideResponse {
    /** 提示文本 */
    toast: LiteralUnion<'已设置'>
    isPrivate: boolean
    privatizableStatus: LiteralUnion<'ENABLE_RECOVER'>
  }
  export interface RecoverResponse {
    /** 提示文本 */
    toast: LiteralUnion<'已设置'>
    isPrivate: boolean
    privatizableStatus: LiteralUnion<'ENABLE_HIDE'>
  }
}

export namespace Notifications {
  export interface ListResponse {
    data: Notification[]
    loadMoreKey?: {
      lastNotificationId: string
    }
  }
}

export namespace UserRelation {
  export interface GetFollowingListResponse {
    data: User[]
    loadMoreKey?: string
  }

  export interface GetFollowerListResponse {
    data: User[]
    loadMoreKey?: string
  }

  export interface FollowResponse {
    toast: LiteralUnion<'关注成功'>
  }

  export interface UnfollowResponse {
    toast: LiteralUnion<'关注已取消'>
  }

  export interface MuteResponse {
    toast: LiteralUnion<'操作成功！'>
  }

  export interface UnmuteResponse {
    toast: LiteralUnion<'操作成功！'>
  }
  export interface AddBlockResponse {
    toast: LiteralUnion<'已将其加入黑名单'>
  }
  export interface RemoveBlockResponse {
    toast: LiteralUnion<'已将其解除黑名单'>
  }
}

export namespace Users {
  export interface GetSmsCodeResponse {
    data: {
      action: string
    }
  }

  export interface LoginResponse {
    isRegister: boolean
    user: ProfileEntity
    enabledFeatures: string[]
    agreedProtocol: string[]
    bioUpdateAlert: boolean
  }

  export type RefreshTokenResponse = {
    [K in `x-${string}-access-token`]: string
  } & { [K in `x-${string}-refresh-token`]: string }

  export interface GeneralProfile {
    /** 用户信息 */
    user: ProfileEntity
  }

  /**
   * 他人的用户信息
   */
  export interface UserProfile extends GeneralProfile {
    /** 关系信息，仅他人用户信息可见 */
    relationMessage?: string
    /** 关系用户，仅他人用户信息可见 */
    relationUsers?: {
      message: string
      users: User[]
      page: string
    }
    /** 是否**不**可见，仅他人用户信息可见 */
    invisible?: boolean
  }

  /**
   * 自己的用户信息
   */
  export interface MyProfile extends GeneralProfile {
    /** 启用的功能，仅自己可见 */
    enabledFeatures?: string[]
    /** 同意的协议，仅自己可见 */
    agreedProtocol?: string[]
    /** 底部栏图标信息，仅自己可见 */
    tabIcons?: TabIcons
  }

  export type Profile<M extends boolean = boolean> = M extends true
    ? MyProfile
    : UserProfile

  export type AvatarGreetResponse = {}

  export interface EditProfileResponse {
    toast: LiteralUnion<'已更新'>
    alert?: any
  }
}

export namespace PersonalUpdate {
  export interface SingleResponse {
    data: PersonalPost[]
    loadMoreKey?: {
      lastId: string
    }
  }

  export interface FollowingUpdatesResponse {
    data: FollowingUpdate[]
    loadMoreKey?: {
      session: 'PopulatedUpdate'
      lastPageEarliestTime: number
      lastReadTime: number
    }
  }

  export type FollowingUpdatesResponseMoreKey =
    FollowingUpdatesResponse['loadMoreKey']

  export interface PinResponse {
    toast: LiteralUnion<'已置顶'>
  }

  export interface UnpinResponse {
    toast: LiteralUnion<'已取消置顶'>
  }
}

export namespace Comments {
  export interface AddResponse {
    data: Comment
    toast: string
  }

  export interface RemoveResponse {
    toast: LiteralUnion<'已删除'>
  }

  export interface ListPrimaryResponse {
    data: Comment[]
    loadMoreKey?: {
      key: string
      partition: string
    }
  }
}

export namespace Upload {
  export interface TokenResponse {
    uptoken: string
  }
}

export namespace RecommendFeed {
  export interface ListResponse {
    data: RecommendPost[]
    toastMessage: string
    loadMoreKey?: {
      page: number
    }
  }
}

export namespace Stories {
  export interface FollowingFeedResponse {
    data: { type: 'USER_STORY'; user: User }[]
  }

  export interface ListUserStoriesResponse {
    data: Story[]
  }
}

export interface InteractiveResponse {
  url: string
}

export namespace Topics {
  // 圈子动态
  export interface GetTabsSquareFeedResponse {
    data: SquareFeed[]
    loadMoreKey?: {
      lastId: string
      suppressed: boolean
    }
  }

  // 圈子热门动态
  export interface GetTabsSelectedFeedResponse {
    data: SquareFeed[]
    loadMoreKey?: {
      offset: number
    }
  }

  // 搜索圈子
  export interface SearchResponse {
    data: Topic[]
    count: number
    loadMoreKey?: {
      skip: number
    }
    highlightWord: {
      words: string[]
      singleMaxHighlightTime: number
      totalMaxHighlightTime: number
    }
  }
}
