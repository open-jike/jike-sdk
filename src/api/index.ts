import * as users from './users'
import * as userRelation from './user-relation'
import * as posts from './posts'
import * as recommendFeed from './recommend-feed'
import * as personalUpdate from './personal-update'
import * as notifications from './notifications'
import * as comments from './comments'
import * as upload from './upload'
import * as stories from './stories'

/**
 * API
 * - {@link api/users | `users`}: 用户
 * - {@link api/user-relation | `userRelation`}: 用户关系
 * - {@link api/posts | `posts`}: 动态
 * - {@link api/recommend-feed | `recommendFeed`}: 动态
 * - {@link api/personal-update | `personalUpdate`}: 主页
 * - {@link api/notifications | `notifications`}: 通知
 * - {@link api/comments | `comments`}: 评论
 * - {@link api/upload | `upload`}: 上传
 * - {@link api/stories | `stories`}: 快拍
 */
export const api = {
  users,
  userRelation,
  posts,
  recommendFeed,
  personalUpdate,
  notifications,
  comments,
  upload,
  stories,
}
/**
 * API 集合
 * @see API 详情请查看 {@link api}
 */
export type Api = typeof api
