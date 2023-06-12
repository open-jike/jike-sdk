import { type LiteralUnion } from '../utils'
import { type Profile } from './entity'

/**
 * @description 分页选项
 */
export interface PaginationOption<T = Record<string, any>> {
  /**
   * @description 最大记录数
   * @default 10
   */
  limit?: number

  /**
   * 上一页的 `loadMoreKey`
   */
  loadMoreKey?: Partial<T>
}

/**
 * @description 动态类型
 */
export enum PostType {
  /** 原帖 */
  ORIGINAL = 'originalPosts',
  /** 转发 */
  REPOST = 'reposts',
}

/**
 * @description 发送动态选项
 */
export interface CreatePostOption {
  /**
   * @description 是否同步到个人主页
   * @default `true`
   */
  syncToPersonalUpdates?: boolean
  /**
   * @description 图片 key 列表
   * @default `[]`
   */
  pictureKeys?: string[]

  /**
   * @description 圈子 ID
   * @default `undefined`
   */
  topicId?: string

  linkInfo?: {
    type: LiteralUnion<'NORMAL' | 'AUDIO'>
    pictureUrl: string
    urlsInText: []
    linkType: LiteralUnion<'default'>
    title: string
    linkUrl: string
    supplementary: boolean
  }
}

/**
 * @description 发送评论选项
 */
export interface AddCommentOption {
  /**
   * @description 同步到个人主页
   * @default `false`
   */
  syncToPersonalUpdates?: boolean
  /**
   * @description 图片 key 列表
   * @default `[]`
   */
  pictureKeys?: string[]
}

export interface ListCommentMoreKey {
  key: string
  partition: string
}
/**
 * @description 获取评论选项
 */
export interface ListCommentOption
  extends PaginationOption<ListCommentMoreKey> {
  /**
   * 排序
   * @default `LIKES`
   */
  order?: 'LIKES' | 'TIME'
}

/**
 * @description 获取动态广场选项
 */
export interface ListRecommendFeedOption
  extends PaginationOption<{ page: number }> {
  /**
   * @description 触发方式
   * @default `auto`
   */
  trigger?: string
}

/**
 * @description 关注用户选项
 */
export interface UserFollowOption {
  pageName?: number
}

/**
 * @description 取消关注用户选项
 */
export interface UserUnfollowOption {
  pageName?: number
  ref?: string
}

/**
 * @description 修改用户信息选项
 */
export interface EditProfilePayload
  extends Partial<
    Pick<
      Profile,
      | 'bio'
      | 'gender'
      | 'school'
      | 'industries'
      | 'country'
      | 'province'
      | 'city'
      | 'birthday'
      | 'screenName'
    >
  > {
  /** 情感状态 */
  relationshipState?: string
  [key: string]: any
}
