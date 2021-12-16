import { describe, it, expect } from 'vitest'
import { setApiConfig, api } from '../src'
import { config } from './config'

describe('posts should work', () => {
  setApiConfig(config)
  const id = '61b8b9d298f39200100ba010'

  it('share should work', async () => {
    const post = await api.posts.get(id)
    expect(post.status).toBe(200)
    const shareCount = post.data.data.shareCount

    const result = await api.posts.share('61b8b9d298f39200100ba010', 'weibo')
    expect(result.status).toBe(200)
    expect(result.data.success).toBe(true)

    const updatedPost = await api.posts.get(id)
    expect(updatedPost.status).toBe(200)
    expect(updatedPost.data.data.shareCount).greaterThan(shareCount)
  })

  it('like should work', async () => {
    const result = await api.posts.like(id)
    expect(result.status).toBe(200)
    expect(result.data.success).toBe(true)
  })

  it('unlike should work', async () => {
    const result = await api.posts.unlike(id)
    expect(result.status).toBe(200)
    expect(result.data.success).toBe(true)
  })
})
