/**
 * 分页选项
 */
export interface PaginationOption<T = any> {
  /**
   * 最大记录数
   * @default 10
   */
  limit?: number

  /**
   * 上一页的 `loadMoreKey`
   */
  loadMoreKey?: Partial<T>
}

export enum PostType {
  /** 动态 */
  ORIGINAL = 'originalPosts',
  /** 转发 */
  REPOST = 'reposts',
}

export interface CreatePostOption {
  /**
   * 同步到个人主页
   * @default true
   */
  syncToPersonalUpdates?: boolean
  /**
   * 图片 key 列表
   * @default []
   */
  pictureKeys?: string[]

  /**
   * 圈子 ID
   * @default undefined
   */
  topicId?: string
}

export interface AddCommentOption {
  /**
   * 同步到个人主页
   * @default false
   */
  syncToPersonalUpdates?: boolean
  /**
   * 图片 key 列表
   * @default []
   */
  pictureKeys?: string[]
}
