import * as ApiOptions from './types/options'
import * as ApiResponses from './types/api-responses'
import * as Entity from './types/entity'

export { ApiOptions, ApiResponses, Entity }

export type { BeforeRequestHook } from 'ky'

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
export type {
  ApiConfig,
  ApiConfigResolved,
  ApiResponse,
  ApiSuccessResponse,
  ApiFailureResponse,
} from './request'
