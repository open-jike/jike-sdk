import { beforeAll, describe, expect, it } from 'vitest'
import {
  type ApiConfig,
  getAccessToken,
  request,
  resolveApiConfig,
  setApiConfig,
} from '../src'
import { defaultEnvironment } from '../src/constants'

describe('request', () => {
  const config: ApiConfig = {
    endpointId: 'keji',
    endpointUrl: 'https://keji.org/api/',
    bundleId: 'org.keji.keji',
    appVersion: '1.2.3',
    buildNo: '10086',
    userAgent: 'keji-useragent',
  }

  it('access token should not be empty', () => {
    const token = 'TEST_TOKEN'
    setApiConfig({ ...config, accessToken: token })
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
      req = await t.catch((error) => error)
    })

    it('prefix url should be correct', () => {
      expect(req.url).toBe(config.endpointUrl)
    })

    it('headers should be correct', () => {
      expect(req.headers.get('User-Agent')).toBe(apiConfig.userAgent)
      expect(req.headers.get('App-Version')).toBe(apiConfig.appVersion)

      const accessToken = `x-${config.endpointId}-access-token`
      const deviceProperties = `x-${config.endpointId}-device-properties`
      const deviceId = `x-${config.endpointId}-device-id`
      expect(req.headers.get(accessToken)).toBe(apiConfig.accessToken)
      expect(req.headers.get(deviceProperties)).includes(apiConfig.idfv)
      expect(req.headers.get(deviceId)).includes(apiConfig.deviceId)
    })
  })

  it('uuid should be random', () => {
    const cfg = resolveApiConfig(config)
    expect(cfg.deviceId).not.toBe(defaultEnvironment.deviceId)
    expect(cfg.idfv).not.toBe(defaultEnvironment.idfv)
  })
})
