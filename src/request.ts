/// <reference lib="dom" />
import ky from 'ky'
import { API_BASE, defaultEnvironment } from './constants'
import { generateUUID } from './utils'
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
    deviceId: (
      config.deviceId ||
      generateUUID() ||
      defaultEnvironment.deviceId
    ).toUpperCase(),
    idfv: (
      config.idfv ||
      generateUUID() ||
      defaultEnvironment.idfv
    ).toUpperCase(),
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

type ResponseMeta = Pick<
  Response,
  'headers' | 'ok' | 'redirected' | 'status' | 'statusText' | 'type' | 'url'
>
export interface ApiSuccessResponse<T = any> extends ResponseMeta {
  data: T & {
    /** 是否请求成功 */
    success: true
  }
}
export interface ApiFailureResponse<T = any> extends ResponseMeta {
  data: T & {
    /** 是否请求成功 */
    success: false
    /** 错误信息 */
    error: string
  }
}
export type ApiResponse<T = any> = ApiSuccessResponse<T> | ApiFailureResponse<T>

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
    if (typeof data === 'object')
      data = {
        success: data?.success !== false,
        ...data,
      }
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
