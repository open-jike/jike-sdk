export interface PaginationOption {
  /**
   * 最大记录数
   * @default 10
   */
  limit?: number

  /**
   * 上一页的 `loadMoreKey`
   */
  loadMoreKey?: any
}
