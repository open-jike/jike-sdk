import { beforeAll, describe, it, expect } from 'vitest'
import { getAccessToken, Client, setAccessToken } from '../src'
import type { Api } from '../src'

describe('client should work', () => {
  let client: Api
  let token: string
  beforeAll(() => {
    token = process.env.ACCESS_TOKEN
    if (!token)
      throw new Error('please set environment variable `ACCESS_TOKEN`')
    client = Client(token)
  })

  it('access token should correct', async () => {
    setAccessToken('TEST TOKEN')
    expect((await client.profile()).user.username).toBeTruthy()
    expect(getAccessToken()).toBe(token)
  })
})
