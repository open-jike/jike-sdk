import { beforeAll, describe, expect, it } from 'vitest'

import { getAccessToken, request, setAccessToken } from '..'
import { API_BASE } from '../src/constants'

describe('common', () => {
  const token = 'TEST_TOKEN'
  setAccessToken(token)

  it('access token should not be empty', () => {
    expect(getAccessToken()).toBe(token)
  })

  describe('request options should be correct', () => {
    const controller = new AbortController()
    let req: Request

    beforeAll(async () => {
      const t = request('', {
        signal: controller.signal,
        hooks: {
          beforeRequest: [
            (req) => {
              throw req
            },
          ],
        },
      })
      controller.abort()
      req = await t.catch((err) => err)
    })

    it('prefix url should be correct', () => {
      expect(req.url).toBe(API_BASE)
    })

    it('access token should be correct', () => {
      expect(req.headers.get('x-jike-access-token')).toBe(token)
    })
  })
})
