import * as users from './users'
import * as userRelation from './user-relation'
import * as posts from './posts'
import * as personalUpdate from './personal-update'

export const api = {
  ...users,
  ...userRelation,
  ...posts,
  ...personalUpdate,
}
export type Api = typeof api
