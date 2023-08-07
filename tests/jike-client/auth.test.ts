import { describe, expect, it } from 'vitest'
import { JikeClient, RequestFailureError } from '../../src'
import { config, refreshToken } from '../config'

describe('login should work', () => {
  const client = new JikeClient(config)
  const mobile = process.env.MOBILE
  const code = process.env.CODE

  it('sendSmsCode should work', async () => {
    if (!mobile || code) return
    await client.sendSmsCode(86, mobile)
  })

  it('loginWithSmsCode should work', async () => {
    if (!mobile || !code) return
    await client.loginWithSmsCode(86, mobile, code)
  })

  it('loginWithSmsCode should throw an error', async () => {
    if (!mobile) return

    const err: RequestFailureError = await client
      .loginWithSmsCode(86, mobile, '123123')
      .catch((error) => error)
    expect(err).instanceOf(RequestFailureError)
    expect(err.message).oneOf(['验证码已失效', '错误登录次数过多，请稍后再试'])
  })
})

it('renew token should work', async () => {
  const client = new JikeClient({
    ...config,
    refreshToken,
    accessToken: 'ERROR',
  })
  const username = await client.getSelf().getUsername()
  expect(username).to.be.a('string')
})
