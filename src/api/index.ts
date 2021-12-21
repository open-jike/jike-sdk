import * as users from './users'
import * as userRelation from './user-relation'
import * as posts from './posts'
import * as personalUpdate from './personal-update'
import * as notifications from './notifications'
import * as comments from './comments'

/**
 * API
 * - {@link api/users | `users`}: 用户
 * - {@link api/user-relation | `userRelation`}: 用户关系
 * - {@link api/posts | `posts`}: 动态
 * - {@link api/personal-update | `personalUpdate`}: 主页
 * - {@link api/notifications | `notifications`}: 通知
 * - {@link api/comments | `comments`}: 通知
 */
export const api = {
  users,
  userRelation,
  posts,
  personalUpdate,
  notifications,
  comments,
}
/**
 * API 集合
 * @see API 详情请查看 {@link api}
 */
export type Api = typeof api
