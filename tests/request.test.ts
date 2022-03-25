import { beforeAll, describe, expect, it } from 'vitest'
import '../src/node-shim'
import { AbortController } from 'node-abort-controller'
import {
  getAccessToken,
  request,
  resolveApiConfig,
  setApiConfig,
} from '../dist/node'
import { defaultEnvironment } from '../src/constants'
import type { ApiConfig } from '../src'

if (!globalThis.AbortController) globalThis.AbortController = AbortController

describe('request', () => {
  const config = {
    endpointId: 'keji',
    endpointUrl: 'https://keji.org/api/',
    bundleId: 'org.keji.keji',
    buildNo: '10086',
    userAgent: 'keji-useragent',
  }

  it('access token should not be empty', () => {
    const token = 'TEST_TOKEN'
    setApiConfig({
      accessToken: token,
      ...config,
    })
    expect(getAccessToken()).toBe(token)
  })

  describe('request options should be correct', () => {
    const controller = new globalThis.AbortController()
    let req: Request
    const apiConfig: ApiConfig = resolveApiConfig({
      ...config,
      deviceId: 'TEST_DEVICE_ID',
      idfv: 'TEST_IDFV',
      userAgent: 'TEST_USER_AGENT',
      accessToken: 'TEST_ACCESS_TOKEN',
    })

    beforeAll(async () => {
      setApiConfig(apiConfig)
      const t = request('', {
        signal: controller.signal,
        retry: 0,
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
      expect(req.url).toBe(config.endpointUrl)
    })

    it('headers should be correct', () => {
      expect(req.headers.get('User-Agent')).toBe(apiConfig.userAgent)
      expect(req.headers.get(`x-${config.endpointId}-access-token`)).toBe(
        apiConfig.accessToken
      )
      expect(
        req.headers.get(`x-${config.endpointId}-device-properties`)
      ).includes(apiConfig.idfv)
      expect(req.headers.get(`x-${config.endpointId}-device-id`)).includes(
        apiConfig.deviceId
      )
    })
  })

  it('uuid should be random', () => {
    const cfg = resolveApiConfig(config)
    expect(cfg.deviceId).not.toBe(defaultEnvironment.deviceId)
    expect(cfg.idfv).not.toBe(defaultEnvironment.idfv)
  })
})
