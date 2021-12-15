import { beforeAll, describe, it, expect } from 'vitest'
import { setAccessToken, api } from '../src'

describe('posts should work', () => {
  beforeAll(() => {
    const token = process.env.ACCESS_TOKEN
    setAccessToken(token)
  })

  const id = '61b8b9d298f39200100ba010'

  it('share should work', async () => {
    const post = await api.posts.get(id)
    const shareCount = post.data.shareCount

    const result = await api.posts.share('61b8b9d298f39200100ba010', 'weibo')
    expect(result.success).toBe(true)

    const updatedPost = await api.posts.get(id)
    expect(updatedPost.data.shareCount).greaterThan(shareCount)
  })

  it('like should work', async () => {
    const result = await api.posts.like(id)
    expect(result.success).toBe(true)
  })

  it('unlike should work', async () => {
    const result = await api.posts.unlike(id)
    expect(result.success).toBe(true)
  })
})
