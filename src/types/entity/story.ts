import { type LiteralUnion } from '../../utils'
import { type CommonImage } from './common'
import { type User } from './user'

export interface StoryPicture extends CommonImage {
  key: string
  cropperPosX: number
  cropperPosY: number
  width: number
  height: number
}

export interface StoryVideo {
  duration: number
  height: number
  type: string
  width: number
  image: {
    format: string
    picUrl: string
    thumbnailUrl: string
  }
}

export interface Story {
  type: 'STORY'
  id: string
  storyType: LiteralUnion<'PICTURE' | 'VIDEO'>
  status: LiteralUnion<'PUBLIC'>
  user: User
  emoji?: string
  video?: StoryVideo
  thumbnailVideo?: StoryVideo
  picture: StoryPicture
  liked: boolean
  likeCount: number
  commentCount: number
  viewerCount: number
  createdAt: string
  likedUsers: User[]
  enablePictureComments: boolean
  isFeatured: boolean
}
