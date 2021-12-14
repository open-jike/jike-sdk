import { beforeAll, describe, it, expect } from 'vitest'
import { setAccessToken, api } from '../src'

describe('users should work', () => {
  beforeAll(() => {
    const token = process.env.ACCESS_TOKEN
    if (!token)
      throw new Error('please set environment variable `ACCESS_TOKEN`')
    setAccessToken(token)
  })

  it('profile should work', async () => {
    const result = await api.profile()
    expect(result.user.id).toBeTruthy()
    expect(result.user.username).toBeTruthy()
  })

  it('refreshToken should work', async () => {
    const token = process.env['REFRESH_TOKEN']
    if (!token)
      throw new Error('please set environment variable `REFRESH_TOKEN`')
    const result = await api.refreshToken(token)
    expect(result.success).toBe(true)
    expect(result['x-jike-access-token']).toBeTruthy()
    expect(result['x-jike-refresh-token']).toBeTruthy()
  })

  it('sendSms should work', async () => {
    const mobile = process.env.MOBILE
    if (!mobile) throw new Error('please set environment variable `MOBILE`')
    const result = await api.getSmsCode('86', mobile)
    expect(result.success).toBe(true)
    expect(result.data.action).toBe('LOGIN')
  })
})
