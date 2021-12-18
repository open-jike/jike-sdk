import { RequestFailureError } from './errors/LoginFailureError'
import type {
  ApiSuccessResponse,
  ApiFailureResponse,
  ApiResponse,
} from '../request'

export const resolveAreaCode = (code: string | number) => {
  if (typeof code === 'string' && code.startsWith('+')) return code
  return `+${code}`
}

export const isSuccess = <T extends Record<string, any>>(
  response: ApiResponse<T>
): response is ApiSuccessResponse<T> =>
  response.status === 200 && response.data.success

/**
 * @throws {RequestFailureError}
 */
export function throwRequestFailureError<T extends Record<string, any>>(
  response: ApiFailureResponse<T>,
  action: string
): never {
  throw new RequestFailureError(
    response?.data?.error ?? `${action}失败，未知原因`,
    response
  )
}
