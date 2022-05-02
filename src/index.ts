// eslint-disable-next-line @typescript-eslint/no-unused-vars
const shim = (_value: any) => undefined
shim(_nodeShim)

export {
  request,
  getAccessToken,
  setAccessToken,
  getApiConfig,
  setApiConfig,
  resolveApiConfig,
} from './request'
export * from './api'
export * from './api-client'
export * from './client'
export * as ApiOptions from './types/options'
export * as ApiResponses from './types/api-responses'
export * as Entity from './types/entity'
export type {
  ApiConfig,
  ApiConfigResolved,
  ApiResponse,
  ApiSuccessResponse,
  ApiFailureResponse,
} from './request'
