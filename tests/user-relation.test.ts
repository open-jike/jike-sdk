import { describe, it, expect } from 'vitest'
import { setApiConfig, api } from '../src'
import { config } from './config'

describe('user relation should work', () => {
  setApiConfig(config)

  const username = '5C505995-681E-4C1E-AD4A-1CC683627B6E'
  const limit = 10

  it('getFollowerList should work', async () => {
    const result = await api.userRelation.getFollowerList(username, { limit })
    expect(result.status).toBe(200)
    expect(result.data.success).toBe(true)
    expect(result.data.data.length).toBe(limit)
  })

  it('getFollowingList should work', async () => {
    const result = await api.userRelation.getFollowingList(username, { limit })
    expect(result.status).toBe(200)
    expect(result.data.success).toBe(true)
    expect(result.data.data.length).toBe(limit)
  })
})
