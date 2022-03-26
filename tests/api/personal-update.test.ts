import { describe, expect, it } from 'vitest'
import { api, isSuccess, setApiConfig } from '../../src'
import { config } from '../config'

describe('personal update should work', () => {
  setApiConfig(config)

  it('single should work', async () => {
    const limit = 10
    const result = await api.personalUpdate.single(
      '82D23B32-CF36-4C59-AD6F-D05E3552CBF3',
      {
        limit,
      }
    )
    expect(isSuccess(result)).toBe(true)
    expect(
      result.data.data.filter((post) => !post.pinned?.personalUpdate).length
    ).toBe(limit)
  })

  it('followingUpdates should work', async () => {
    const result = await api.personalUpdate.followingUpdates()
    expect(isSuccess(result)).toBe(true)
    expect(result.data.data.length).greaterThan(0)
  })
})
