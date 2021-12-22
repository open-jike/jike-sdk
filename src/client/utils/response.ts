import { RequestFailureError } from '../errors/RequestFailureError'
import type {
  ApiSuccessResponse,
  ApiFailureResponse,
  ApiResponse,
} from '../../request'

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
  let reason = response?.data?.error
  if (!reason && response.status === 401) reason = '未登录'
  reason ||= `${action}失败，未知原因`
  throw new RequestFailureError(reason, response)
}
