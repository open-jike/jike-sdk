import { beforeAll, describe, expect, it } from 'vitest'
import '../src/node-shim'
import { AbortController } from 'node-abort-controller'
import {
  getAccessToken,
  request,
  setAccessToken,
  setApiConfig,
  resolveApiConfig,
} from '../dist/node'
import { API_BASE, defaultEnvironment } from '../src/constants'
import type { ApiConfig } from '../dist/node'

if (!globalThis.AbortController) globalThis.AbortController = AbortController

describe('request', () => {
  const token = 'TEST_TOKEN'
  setAccessToken(token)

  it('access token should not be empty', () => {
    expect(getAccessToken()).toBe(token)
  })

  describe('request options should be correct', () => {
    const controller = new globalThis.AbortController()
    let req: Request
    const apiConfig: ApiConfig = {
      deviceId: 'TEST_DEVICE_ID',
      idfv: 'TEST_IDFV',
      userAgent: 'TEST_USER_AGENT',
      accessToken: 'TEST_ACCESS_TOKEN',
    }

    beforeAll(async () => {
      setApiConfig(apiConfig)
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

    it('headers should be correct', () => {
      expect(req.headers.get('User-Agent')).toBe(apiConfig.userAgent)
      expect(req.headers.get('x-jike-access-token')).toBe(apiConfig.accessToken)
      expect(req.headers.get('x-jike-device-properties')).includes(
        apiConfig.idfv
      )
      expect(req.headers.get('x-jike-device-id')).includes(apiConfig.deviceId)
    })
  })

  it('uuid should be random', () => {
    const config = resolveApiConfig({})
    expect(config.deviceId).not.toBe(defaultEnvironment.deviceId)
    expect(config.idfv).not.toBe(defaultEnvironment.idfv)
  })
})
