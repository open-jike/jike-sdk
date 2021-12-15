import { beforeAll, describe, it, expect } from 'vitest'
import { setAccessToken, api } from '../src'

describe('user relation should work', () => {
  beforeAll(() => {
    const token = process.env.ACCESS_TOKEN
    setAccessToken(token)
  })

  const username = '5C505995-681E-4C1E-AD4A-1CC683627B6E'
  const limit = 10

  it('getFollowerList should work', async () => {
    const result = await api.userRelation.getFollowerList(username, { limit })
    expect(result.success).toBe(true)
    expect(result.data.length).toBe(limit)
  })

  it('getFollowingList should work', async () => {
    const result = await api.userRelation.getFollowingList(username, { limit })
    expect(result.success).toBe(true)
    expect(result.data.length).toBe(limit)
  })
})
