import { describe, it, expect } from 'vitest'
import { JikeClient } from '../src'
import { LoginFailureError } from '../src/client/errors/LoginFailureError'
import { config } from './config'

describe('notifications should work', () => {
  const client = new JikeClient({
    accessToken: config.accessToken,
  })

  const mobile = process.env.MOBILE
  it('loginWithSmsCode should throw an error', async () => {
    if (!mobile) return
    try {
      await client.loginWithSmsCode(86, mobile, '123123')
    } catch (err: unknown) {
      expect(err).instanceOf(LoginFailureError)
      if (err instanceof LoginFailureError)
        expect(err.message).to.be.a('string')
    }
  })
})
