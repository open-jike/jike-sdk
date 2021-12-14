import { describe, expect, it } from 'vitest'

import { getAccessToken, request, setAccessToken } from '../src'
import { API_BASE } from '../src/constants'

describe('common', () => {
  const token = 'TEST_TOKEN'
  setAccessToken(token)

  it('access token should not be empty', () => {
    expect(getAccessToken()).toBe(token)
  })

  describe('request options should be correct', () => {
    it('prefix url should be correct', () => {
      expect(request.defaults.options.prefixUrl).toBe(API_BASE)
    })

    it('response type should be correct', () => {
      expect(request.defaults.options.responseType).toBe('json')
    })

    it('access token should be correct', async () => {
      const t = request('', {
        hooks: {
          beforeRequest: [
            () => {
              throw 'cancel request'
            },
          ],
        },
      })
      t.cancel('canceled')
      const { request: req } = await t.catch((err) => err)
      expect(req.options.headers['x-jike-access-token']).toBe(token)
    })
  })
})
