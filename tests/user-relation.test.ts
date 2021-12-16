import { describe, it, expect } from 'vitest'
import { setApiConfig, api } from '../src'
import { config } from './config'

describe('user relation should work', () => {
  setApiConfig(config)

  const username = '82D23B32-CF36-4C59-AD6F-D05E3552CBF3'
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
