import { describe, it, expect } from 'vitest'
import { api, setApiConfig } from '../src'
import { config } from './config'

describe('users should work', () => {
  setApiConfig(config)

  it('profile should work', async () => {
    const result = await api.users.profile()
    expect(result.status).toBe(200)
    expect(result.data?.user?.id).toBeTruthy()
    expect(result.data?.user?.username).toBeTruthy()
  })

  it('refreshToken should work', async () => {
    const token = process.env['REFRESH_TOKEN']
    if (!token) return
    const result = await api.users.refreshToken(token)
    expect(result.status).toBe(200)
    expect(result.data.success).toBe(true)
    expect(result.data['x-jike-access-token']).toBeTruthy()
    expect(result.data['x-jike-refresh-token']).toBeTruthy()
  })

  const mobile = process.env.MOBILE
  const smsCode = process.env.SMS_CODE
  const password = process.env.PASSWORD

  it('sendSms should work', async () => {
    if (!mobile || smsCode || password) return
    const result = await api.users.getSmsCode('+86', mobile)
    expect(result.status).toBe(200)
    expect(result.data.success).toBe(true)
    expect(result.data.data.action).toBe('LOGIN')
  })

  it('loginWithSmsCode should work', async () => {
    if (!mobile || !smsCode) return
    const result = await api.users.loginWithSmsCode('+86', mobile, smsCode)
    expect(result.status).toBe(200)
    expect(result.data.success).toBe(true)
    if (result.data.success) expect(result.data.user).toBeTruthy()
  })

  it('loginWithPhoneAndPassword should work', async () => {
    if (!mobile || !password) return
    const result = await api.users.loginWithPhoneAndPassword(
      '+86',
      mobile,
      password
    )
    expect(result.status).toBe(200)
    expect(result.data.success).toBe(true)
    if (result.data.success) expect(result.data.user).toBeTruthy()
  })
})
