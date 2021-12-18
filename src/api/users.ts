import { toResponse, request } from '../request'
import type {
  MyProfile,
  UserProfile,
  UserRefreshTokenResponse,
  GetSmsCodeResponse,
  LoginResponse,
} from '../types/response'

/**
 * 获取用户信息
 */
export const profile = <T = MyProfile & UserProfile>(username?: string) =>
  toResponse<T>(
    request('1.0/users/profile', {
      searchParams: {
        username: username ?? '',
      },
    })
  )

/**
 * 刷新 Access Token
 * @param refreshToken 登录时返回的 refresh token
 */
export const refreshToken = async <T = UserRefreshTokenResponse>(
  refreshToken: string
) =>
  toResponse<T>(
    request.post('app_auth_tokens.refresh', {
      headers: {
        'x-jike-refresh-token': refreshToken,
      },
    })
  )

/**
 * 发送登录验证码
 * @param areaCode 区号，如：+86
 * @param mobile 手机号
 */
export const getSmsCode = <T = GetSmsCodeResponse>(
  areaCode: string,
  mobile: string
) =>
  toResponse<T>(
    request.post('1.0/users/getSmsCode', {
      json: {
        action: 'PHONE_MIX_LOGIN',
        areaCode,
        mobilePhoneNumber: mobile,
      },
    })
  )

/**
 * 短信登录
 * @param areaCode 区号，如：+86
 * @param mobile 手机号
 * @param smsCode 短信验证码
 */
export const loginWithSmsCode = <T = LoginResponse>(
  areaCode: string,
  mobile: string,
  smsCode: string | number
) =>
  toResponse<T>(
    request.post('1.0/users/mixLoginWithPhone', {
      json: {
        areaCode,
        mobilePhoneNumber: mobile,
        smsCode: `${smsCode}`,
      },
      headers: {
        'x-jike-access-token': '',
      },
    }),
    (data) => ({
      success: !(data as any).error,
      ...data,
    })
  )

/**
 * 手机号与密码登录
 * @param areaCode 区号，如+86
 * @param mobile 手机号
 * @param password 密码
 */
export const loginWithPhoneAndPassword = <T = LoginResponse>(
  areaCode: string,
  mobile: string,
  password: string
) =>
  toResponse<T>(
    request.post('1.0/users/loginWithPhoneAndPassword', {
      json: {
        areaCode,
        mobilePhoneNumber: mobile,
        password,
      },
    })
  )
