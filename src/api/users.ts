import { request } from '../common'
import type { UserProfile, UserRefreshTokenResponse } from '../types/response'

/**
 * 获取个人主页
 */
export const profile = <T = UserProfile>() => request<T>('1.0/users/profile')

/**
 * 刷新 Access Token
 * @param refreshToken 登录时返回的 refresh token
 */
export const refreshToken = async <T = UserRefreshTokenResponse>(
  refreshToken: string
) =>
  request.post<T>('app_auth_tokens.refresh', {
    headers: {
      'x-jike-refresh-token': refreshToken,
    },
  })
