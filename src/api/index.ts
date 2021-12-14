import * as users from './users'
import * as userRelation from './user-relation'
import * as posts from './posts'

export default {
  ...users,
  ...userRelation,
  ...posts,
}
