import { describe, expect, it } from 'vitest'
import { JikeClient, limit } from '../../src'
import { config, refreshToken } from '../config'

describe('feeds', () => {
  const client = new JikeClient({ ...config, refreshToken })

  it('queryFollowingUpdates should work', async () => {
    const MAX_COUNT = 40
    const records = await client.queryFollowingUpdates({
      limit: limit.limitMaxCount(MAX_COUNT),
    })
    expect(records.length).toBe(40)
  })
})
