import { beforeAll, describe, it, expect } from 'vitest'
import { setAccessToken, api } from '../src'

describe('personal update should work', () => {
  beforeAll(() => {
    const token = process.env.ACCESS_TOKEN
    if (!token)
      throw new Error('please set environment variable `ACCESS_TOKEN`')
    setAccessToken(token)
  })

  it('single should work', async () => {
    const limit = 10
    const result = await api.single('82D23B32-CF36-4C59-AD6F-D05E3552CBF3', {
      limit,
    })
    expect(result.success).toBe(true)
    expect(
      result.data.filter((post) => !post.pinned.personalUpdate).length
    ).toBe(limit)
  })
})
