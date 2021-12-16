import { describe, it, expect } from 'vitest'
import { getAccessToken, ApiClient, setAccessToken } from '../src'
import { config } from './config'

describe('api client should work', async () => {
  const client = ApiClient(config)
  it('access token should correct', async () => {
    setAccessToken('TEST TOKEN')
    expect((await client.users.profile()).data.user.username).toBeTruthy()
    expect(getAccessToken()).toBe(config.accessToken)
  })
})
