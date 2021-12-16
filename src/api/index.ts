import * as users from './users'
import * as userRelation from './user-relation'
import * as posts from './posts'
import * as personalUpdate from './personal-update'
import * as notifications from './notifications'

export const api = {
  users,
  userRelation,
  posts,
  personalUpdate,
  notifications,
}
export type Api = typeof api
