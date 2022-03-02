import { describe, it, expect } from 'vitest'
import { api, setApiConfig } from '../../src'
import { config } from '../config'

describe('users should work', () => {
  setApiConfig(config)

  const username = '82D23B32-CF36-4C59-AD6F-D05E3552CBF3'

  it('profile should work', async () => {
    const result = await api.users.profile()
    expect(result.status).toBe(200)
    expect(result.data?.user?.id).toBeTruthy()
    expect(result.data?.user?.username).toBeTruthy()
  })

  it('profile with username should work', async () => {
    const result = await api.users.profile(username)
    expect(result.status).toBe(200)
    expect(result.data?.user?.username).toBe(username)
  })

  it('refreshToken should work', async () => {
    const token = process.env['REFRESH_TOKEN']
    if (!token) return
    const result = await api.users.refreshToken(token)
    expect(result.status).toBe(200)
    expect(result.data.success).toBe(true)
    expect(result.data[`x-${config.endpointId}-access-token`]).toBeTruthy()
    expect(result.data[`x-${config.endpointId}-refresh-token`]).toBeTruthy()
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

  it('avatarGreet should work', async () => {
    const result = await api.users.avatarGreet(
      '5C505995-681E-4C1E-AD4A-1CC683627B6E'
    )
    expect(result.status).toBe(200)
    expect(result.data.success).is.a('boolean')
    expect(result.data.success).toBe(true)
  })
})
