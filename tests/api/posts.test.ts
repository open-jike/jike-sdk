import { describe, expect, it } from 'vitest'
import { api, isSuccess, setApiConfig } from '../../src'
import { PostType } from '../../src/types/options'
import { config } from '../config'

setApiConfig(config)

describe('posts should work', () => {
  const id = '61b8b9d298f39200100ba010'

  it('share should work', async () => {
    const post = await api.posts.get(PostType.ORIGINAL, id)
    expect(isSuccess(post)).toBe(true)

    const shareCount = post.data.data.shareCount

    const result = await api.posts.share(
      PostType.ORIGINAL,
      '61b8b9d298f39200100ba010',
      'weibo'
    )
    expect(isSuccess(result)).toBe(true)

    const updatedPost = await api.posts.get(PostType.ORIGINAL, id)
    expect(isSuccess(updatedPost)).toBe(true)
    expect(updatedPost.data.data.shareCount).greaterThan(shareCount)
  })

  it('like should work', async () => {
    const result = await api.posts.like(PostType.ORIGINAL, id)
    expect(isSuccess(result)).toBe(true)
  })

  it('unlike should work', async () => {
    const result = await api.posts.unlike(PostType.ORIGINAL, id)
    expect(isSuccess(result)).toBe(true)
  })
})

describe('comment should work', () => {
  it('get should work', async () => {
    const result = await api.comments.listPrimary(
      'ORIGINAL_POST',
      '61c0d39877abf80010426ba3'
    )
    expect(isSuccess(result)).toBe(true)
    expect(result.data.data.length).greaterThan(0)
  })

  it('like should work', async () => {
    const result = await api.comments.like(
      'ORIGINAL_POST',
      '61c04361d8c958001025e772'
    )
    expect(isSuccess(result)).toBe(true)
  })

  it('unlike should work', async () => {
    const result = await api.comments.unlike(
      'ORIGINAL_POST',
      '61c04361d8c958001025e772'
    )
    expect(isSuccess(result)).toBe(true)
  })
})

describe('new post should work', () => {
  let id: string

  it('create should work', async () => {
    const result = await api.posts.create(
      PostType.ORIGINAL,
      `Test Post. \n\n${Math.random()}`,
      /** 悄悄话 */
      { topicId: '5be41ae2a666dd00172d6072' }
    )
    expect(isSuccess(result)).toBe(true)
    expect(result.data.toast).toBe('发送成功')
    expect(result.data.data.id).a('string')
    id = result.data.data.id
  })

  it('comment should work', async () => {
    const result = await api.comments.add(
      'ORIGINAL_POST',
      id,
      `测试评论${Math.random()}`
    )
    expect(isSuccess(result)).toBe(true)
    expect(result.data.toast).toBe('发送成功')
    expect(result.data.data.id).a('string')
  })

  it('remove should work', async () => {
    const result = await api.posts.remove(PostType.ORIGINAL, id)
    expect(isSuccess(result)).toBe(true)
    expect(result.data.toast).toBe('删除成功')
  })

  it('listLikedUsers should work', async () => {
    const result = await api.posts.listLikedUsers(
      PostType.ORIGINAL,
      '626303a8079c68c18e2ac9bc'
    )
    expect(isSuccess(result)).toBe(true)
    expect(result.data.data.length).greaterThan(0)
  })
})
