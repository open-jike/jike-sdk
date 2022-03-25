import { describe, expect, it } from 'vitest'
import { api, setApiConfig } from '../../src'
import { config } from '../config'

describe('notifications should work', () => {
  setApiConfig(config)

  it('list should work', async () => {
    const result = await api.notifications.list()
    expect(result.status).toBe(200)
    expect(result.data.data.length).greaterThanOrEqual(1)
  })
})
