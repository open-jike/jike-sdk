import { describe, expect, it } from 'vitest'
import { api, setApiConfig } from '../../src'
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
    expect(result.status).toBe(200)
    expect(result.data.success).toBe(true)
    expect(
      result.data.data.filter((post) => !post.pinned?.personalUpdate).length
    ).toBe(limit)
  })
})
