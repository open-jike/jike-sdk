import { beforeAll, describe, it, expect } from 'vitest'
import { setAccessToken, api } from '../src'

describe('posts should work', () => {
  beforeAll(() => {
    const token = process.env.ACCESS_TOKEN
    setAccessToken(token)
  })

  it('share should work', async () => {
    const id = '61b8b9d298f39200100ba010'

    const post = await api.posts.get(id)
    const shareCount = post.data.shareCount

    const result = await api.posts.share('61b8b9d298f39200100ba010', 'weibo')
    expect(result.success).toBe(true)

    const updatedPost = await api.posts.get(id)
    expect(updatedPost.data.shareCount).greaterThan(shareCount)
  })
})
