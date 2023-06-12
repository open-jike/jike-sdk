import { PostType } from '../../types/options'
import { type PostTypeRaw } from '../../types/entity'

export const rawTypeToEnum = (type: PostTypeRaw): PostType =>
  type === 'ORIGINAL_POST' ? PostType.ORIGINAL : PostType.REPOST

export const enumTypeToRaw = (type: PostType): PostTypeRaw =>
  type === PostType.ORIGINAL ? 'ORIGINAL_POST' : 'REPOST'
