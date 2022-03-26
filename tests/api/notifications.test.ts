import { describe, expect, it } from 'vitest'
import { api, isSuccess, setApiConfig } from '../../src'
import { config } from '../config'

describe('notifications should work', () => {
  setApiConfig(config)

  it('list should work', async () => {
    const result = await api.notifications.list()
    expect(isSuccess(result)).toBe(true)
    expect(result.data.data.length).greaterThanOrEqual(1)
  })
})
