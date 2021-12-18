/// <reference lib="dom" />
import ky from 'ky'
import { API_BASE, defaultEnvironment } from './constants'
import { generateUUID } from './utils'
import type { ResponsePromise } from 'ky'

/**
 * API 配置
 */
export interface ApiConfig {
  /** `access-token` */
  accessToken: string
  /** 设备 ID */
  deviceId: string
  /** `idfv` */
  idfv: string
  /** `User-Agent` 请求头 */
  userAgent: string
}

/**
 * 解析 API 配置
 * @param config 可空的配置
 */
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

/**
 * 设置 API 配置
 * @param config 配置
 */
export const setApiConfig = (config: Partial<ApiConfig>) =>
  (apiConfig = resolveApiConfig(config))

/** 获取 API 配置 */
export const getApiConfig = () => apiConfig

/**
 * 设置全局配置 `access-token`
 * @param token `access-token`
 */
export const setAccessToken = (token: string) => (apiConfig.accessToken = token)
/** 获取全局配置 `access-token` */
export const getAccessToken = () => apiConfig.accessToken

/**
 * API 请求函数，继承自 [ky](https://github.com/sindresorhus/ky)
 */
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
/**
 * API 成功响应
 * @template T 响应数据
 */
export interface ApiSuccessResponse<T = any> extends ResponseMeta {
  data: T & {
    /** 是否请求成功 */
    success: true
  }
}
/**
 * API 失败响应
 * @template T 响应数据
 */
export interface ApiFailureResponse<T = any> extends ResponseMeta {
  data: T & {
    /** 是否请求成功 */
    success: false
    /** 错误信息 */
    error: string
  }
}
/**
 * API 响应
 * @template T 响应数据
 */
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
