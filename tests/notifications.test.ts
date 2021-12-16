import { beforeAll, describe, it, expect } from 'vitest'
import { setAccessToken, api } from '../src'

describe('notifications should work', () => {
  beforeAll(() => {
    const token = process.env.ACCESS_TOKEN
    setAccessToken(token)
  })

  it('list should work', async () => {
    const result = await api.notifications.list()
    expect(result.data.length).greaterThanOrEqual(1)
  })
})
