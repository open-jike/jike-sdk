import { describe, it, expect } from 'vitest'
import { JikeClient } from '../src'
import { RequestFailureError } from '../src/client/errors/LoginFailureError'
import { config } from './config'

describe('notifications should work', () => {
  const client = new JikeClient(
    { accessToken: config.accessToken },
    { deviceId: config.deviceId, idfv: config.idfv }
  )
  const mobile = process.env.MOBILE

  it('sendSmsCode should work', async () => {
    if (!mobile) return
    client.sendSmsCode(86, mobile)
  })

  it('loginWithSmsCode should throw an error', async () => {
    if (!mobile) return
    try {
      await client.loginWithSmsCode(86, mobile, '123123')
    } catch (err: unknown) {
      expect(err).instanceOf(RequestFailureError)
      if (err instanceof RequestFailureError)
        expect(err.message).oneOf([
          '验证码已失效',
          '错误登录次数过多，请稍后再试',
        ])
    }
  })
})
