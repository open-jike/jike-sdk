import { describe, expect, it } from 'vitest'
import { JikeClient } from '../../src'
import { PostType } from '../../src/types/options'
import { config, refreshToken } from '../config'

describe('post', () => {
  const client = new JikeClient({ ...config, refreshToken })

  it('createPost should work', async () => {
    const { post, toast } = await client.createPost(
      PostType.ORIGINAL,
      '👋 Hello World!\n\n ✨ From Jike SDK. \n\n Made with ❤️.'
    )

    expect(toast).to.be.a('string')
    expect(post.id).to.be.a('string')
  })
})
