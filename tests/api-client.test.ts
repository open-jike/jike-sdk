import { describe, expect, it } from 'vitest'
import { ApiClient, getAccessToken } from '../src'
import { config } from './config'

describe('api client should work', () => {
  const client = ApiClient(config)

  it('access token should correct', async () => {
    client.users.profile().catch(() => undefined)
    expect(getAccessToken()).toBe(config.accessToken)
    expect((await client.users.profile())?.data?.user?.username).toBeTruthy()
    expect(getAccessToken()).toBe(config.accessToken)
  })
})
