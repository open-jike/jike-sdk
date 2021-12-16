import { beforeAll, describe, it, expect } from 'vitest'
import { setAccessToken, api } from '../src'

describe('users should work', () => {
  beforeAll(() => {
    const token = process.env.ACCESS_TOKEN
    setAccessToken(token)
  })

  it('profile should work', async () => {
    const result = await api.users.profile()
    expect(result?.user?.id).toBeTruthy()
    expect(result?.user?.username).toBeTruthy()
  })

  it('refreshToken should work', async () => {
    const token = process.env['REFRESH_TOKEN']
    if (!token) return
    const result = await api.users.refreshToken(token)
    expect(result.success).toBe(true)
    expect(result['x-jike-access-token']).toBeTruthy()
    expect(result['x-jike-refresh-token']).toBeTruthy()
  })

  const mobile = process.env.MOBILE
  const smsCode = process.env.SMS_CODE
  const password = process.env.PASSWORD

  it('sendSms should work', async () => {
    if (!mobile || smsCode) return
    const result = await api.users.getSmsCode('+86', mobile)
    expect(result.success).toBe(true)
    expect(result.data.action).toBe('LOGIN')
  })

  it('loginWithSmsCode should work', async () => {
    if (!mobile || !smsCode) return
    const result = await api.users.loginWithSmsCode('+86', mobile, smsCode)
    expect(result.success).toBe(true)
    if (result.success) expect(result.user).toBeTruthy()
  })

  it('loginWithPhoneAndPassword should work', async () => {
    if (!mobile || !password) return
    const result = await api.users.loginWithPhoneAndPassword(
      '+86',
      mobile,
      password
    )
    expect(result.success).toBe(true)
    if (result.success) expect(result.user).toBeTruthy()
  })
})
