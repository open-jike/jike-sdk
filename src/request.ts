/// <reference lib="dom" />
import ky, { HTTPError } from 'ky'
import { defaultEnvironment } from './constants'
import { generateUUID } from './utils'
import type { KyInstance } from 'ky/distribution/types/ky'
import type { BeforeRetryState } from 'ky/distribution/types/hooks'
import type { ResponsePromise } from 'ky'

/**
 * API 配置
 */
export interface ApiConfigResolved {
  /** 接入点 ID */
  endpointId: string
  /** 接入点 URL */
  endpointUrl: string
  /** APP ID */
  bundleId: string
  /** 构建 ID */
  buildNo: string
  /** `access-token` */
  accessToken: string
  /** 设备 ID */
  deviceId: string
  /** `idfv` */
  idfv: string
  /** `User-Agent` 请求头 */
  userAgent: string
  /** 是否重试 */
  beforeRetry: (state: BeforeRetryState) => boolean | Promise<boolean>
}
export type ApiConfig = Partial<ApiConfigResolved> &
  Pick<
    ApiConfigResolved,
    'endpointId' | 'endpointUrl' | 'bundleId' | 'buildNo' | 'userAgent'
  >

/**
 * 解析 API 配置
 * @param config 可空的配置
 */
export const resolveApiConfig = (config: ApiConfig): ApiConfigResolved => {
  return {
    ...config,
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
    beforeRetry: config.beforeRetry ?? (() => false),
  }
}
let apiConfig: ApiConfigResolved = undefined as any // MUST BE SET FIRST

/**
 * 设置 API 配置
 * @param config 配置
 */
export const setApiConfig = (config: ApiConfig) => {
  apiConfig = resolveApiConfig(config)
  _request = ky.create({
    prefixUrl: apiConfig.endpointUrl,
    headers: {
      manufacturer: defaultEnvironment.manufacturer,
      os: defaultEnvironment.os,
      'os-version': defaultEnvironment.osVersion,
    },
    retry: {
      limit: 2,
      statusCodes: [401],
      methods: ['get', 'post', 'put', 'head', 'delete', 'options', 'trace'],
    },
    fetch,
    hooks: {
      beforeRequest: [
        (req) => {
          const apiConfig = getApiConfig()
          const key = `x-${apiConfig.endpointId}-access-token`
          if (req.headers.get(key) === '') req.headers.delete(key)
          else if (apiConfig.accessToken && !req.headers.has(key))
            req.headers.set(key, apiConfig.accessToken)

          req.headers.set('User-Agent', apiConfig.userAgent)
          req.headers.set('bundleid', apiConfig.bundleId)
          req.headers.set(
            `x-${apiConfig.endpointId}-device-id`,
            apiConfig.deviceId
          )
          req.headers.set(
            `x-${apiConfig.endpointId}-device-properties`,
            JSON.stringify({ idfv: apiConfig.idfv })
          )
          ;(req as any).highWaterMark = 1024 * 1024
        },
      ],
      beforeRetry: [
        async (opts) => {
          const isRetry = await apiConfig.beforeRetry(opts)
          if (isRetry) return
          throw opts.error
        },
      ],
    },
  })
}

/** 获取 API 配置 */
export const getApiConfig = () => {
  if (!apiConfig) throw new Error('Please set apiConfig!')
  return apiConfig
}

/**
 * 设置全局配置 `access-token`
 * @param token `access-token`
 */
export const setAccessToken = (token: string) => (apiConfig.accessToken = token)
/** 获取全局配置 `access-token` */
export const getAccessToken = () => apiConfig.accessToken

let _request: KyInstance

/**
 * API 请求函数，继承自 [ky](https://github.com/sindresorhus/ky)
 */
export const request = new Proxy(() => undefined, {
  get: (_o, ...args) => Reflect.get(_request, ...args),
  apply: (_o, ...args) => Reflect.apply(_request, ...args),
  ownKeys: (_o, ...args) => Reflect.ownKeys(_request, ...args),
}) as unknown as KyInstance

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
  let res: Response
  try {
    res = await response
  } catch (err: unknown) {
    if (err instanceof HTTPError) {
      res = err.response
    } else throw err
  }
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
