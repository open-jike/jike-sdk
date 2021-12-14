import * as users from './users'
import * as userRelation from './user-relation'
import * as posts from './posts'

export const api = {
  ...users,
  ...userRelation,
  ...posts,
}
export type Api = typeof api
