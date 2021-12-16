/// <reference lib="dom" />

import ky from 'ky'
import { API_BASE, defaultEnvironment } from './constants'
import type { ResponsePromise } from 'ky'

export interface ApiConfig {
  accessToken: string
  deviceId: string
  idfv: string
  userAgent: string
}

export const resolveApiConfig = (config: Partial<ApiConfig>): ApiConfig => {
  return {
    accessToken: config.accessToken || '',
    deviceId: config.deviceId || defaultEnvironment.deviceId,
    idfv: config.idfv || defaultEnvironment.idfv,
    userAgent: config.userAgent || defaultEnvironment.userAgent,
  }
}
let apiConfig: ApiConfig = resolveApiConfig({})

export const setApiConfig = (config: Partial<ApiConfig>) =>
  (apiConfig = resolveApiConfig(config))
export const getApiConfig = () => apiConfig
export const setAccessToken = (token: string) => (apiConfig.accessToken = token)
export const getAccessToken = () => apiConfig.accessToken

export const request = ky.create({
  prefixUrl: API_BASE,
  headers: {
    manufacturer: defaultEnvironment.manufacturer,
    os: defaultEnvironment.os,
    'os-version': defaultEnvironment.osVersion,
    bundleid: defaultEnvironment.bundleId,
  },
  throwHttpErrors: false,
  fetch,
  hooks: {
    beforeRequest: [
      (req) => {
        const key = 'x-jike-access-token'
        if (req.headers.get(key) === '') req.headers.delete(key)
        else if (apiConfig.accessToken)
          req.headers.set(key, apiConfig.accessToken)

        req.headers.set('User-Agent', apiConfig.userAgent)
        req.headers.set('x-jike-device-id', apiConfig.deviceId)
        req.headers.set(
          'x-jike-device-properties',
          JSON.stringify({ idfv: apiConfig.idfv })
        )
        ;(req as any).highWaterMark = 1024 * 1024
      },
    ],
  },
})

export interface ApiResponse<T>
  extends Pick<
    Response,
    'headers' | 'ok' | 'redirected' | 'status' | 'statusText' | 'type' | 'url'
  > {
  data: T
}
export const toResponse = async <T>(
  response: ResponsePromise,
  hook?: (data: T) => T
): Promise<ApiResponse<T>> => {
  const res = await response
  const contentType = res.headers.get('content-type')
  let data: any
  if (contentType?.includes('application/json')) {
    data = await res.json()
    if (hook) data = hook(data)
  } else {
    data = await res.text()
  }
  return {
    headers: res.headers,
    ok: res.ok,
    redirected: res.redirected,
    status: res.status,
    statusText: res.statusText,
    type: res.type,
    url: res.url,
    data,
  }
}
