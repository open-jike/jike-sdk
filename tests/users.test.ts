import { beforeAll, describe, it, expect } from 'vitest'
import { setAccessToken, api } from '../src'

describe('users should work', () => {
  beforeAll(() => {
    const token = process.env.ACCESS_TOKEN
    setAccessToken(token)
  })

  it('profile should work', async () => {
    const result = await api.profile()
    expect(result?.user?.id).toBeTruthy()
    expect(result?.user?.username).toBeTruthy()
  })

  it('refreshToken should work', async () => {
    const token = process.env['REFRESH_TOKEN']
    if (!token) return
    const result = await api.refreshToken(token)
    expect(result.success).toBe(true)
    expect(result['x-jike-access-token']).toBeTruthy()
    expect(result['x-jike-refresh-token']).toBeTruthy()
  })

  const mobile = process.env.MOBILE
  const smsCode = process.env.SMS_CODE

  it('sendSms should work', async () => {
    if (!mobile || smsCode) return
    const result = await api.getSmsCode('+86', mobile)
    expect(result.success).toBe(true)
    expect(result.data.action).toBe('LOGIN')
  })

  it('loginWithSmsCode should work', async () => {
    if (!mobile || !smsCode) return
    const result = await api.loginWithSmsCode('+86', mobile, smsCode)
    expect(result.success).toBe(true)
  })
})
