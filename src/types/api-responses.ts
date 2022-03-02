/* eslint-disable @typescript-eslint/no-namespace */
import type {
  Notification,
  PostDetail,
  Comment,
  SimpleUser,
  TabIcons,
  User,
  RecommendPost,
} from './entity'

export namespace Posts {
  export interface CreateResponse {
    toast: string
    data: PostDetail
  }
  export interface GetResponse {
    data: PostDetail
  }
  export interface RemoveResponse {
    /** 提示文本 */
    toast: string
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
    data: SimpleUser[]
    loadMoreKey?: {
      createdAt: string
    }
  }

  export interface GetFollowerListResponse {
    data: SimpleUser[]
    loadMoreKey?: {
      createdAt: string
    }
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
    user: User
    enabledFeatures: string[]
    agreedProtocol: string[]
    bioUpdateAlert: boolean
  }

  export type RefreshTokenResponse = {
    [K in `x-${string}-access-token`]: string
  } & { [K in `x-${string}-refresh-token`]: string }

  export interface GeneralProfile {
    /** 用户信息 */
    user: User
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
      users: SimpleUser[]
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

  export interface AvatarGreetResponse {
    success: boolean
  }
}

export namespace PersonalUpdate {
  export interface SingleResponse {
    data: PostDetail[]
    loadMoreKey?: {
      lastId: string
    }
  }
}

export namespace Comments {
  export interface AddResponse {
    data: Comment
    toast: string
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
