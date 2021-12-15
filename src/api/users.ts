import { request } from '../common'
import type {
  UserProfile,
  UserRefreshTokenResponse,
  GetSmsCodeResponse,
  LoginFailureResponse,
  LoginSuccessResponse,
} from '../types/response'

/**
 * 获取个人主页
 */
export const profile = <T = UserProfile>() =>
  request('1.0/users/profile').json<T>()

/**
 * 刷新 Access Token
 * @param refreshToken 登录时返回的 refresh token
 */
export const refreshToken = async <T = UserRefreshTokenResponse>(
  refreshToken: string
) =>
  request
    .post('app_auth_tokens.refresh', {
      headers: {
        'x-jike-refresh-token': refreshToken,
      },
    })
    .json<T>()

/**
 * 发送登录验证码
 * @param areaCode 区号，如：+86
 * @param mobile 手机号
 */
export const getSmsCode = <T = GetSmsCodeResponse>(
  areaCode: string,
  mobile: string
) =>
  request
    .post('1.0/users/getSmsCode', {
      json: {
        action: 'PHONE_MIX_LOGIN',
        areaCode,
        mobilePhoneNumber: mobile,
      },
    })
    .json<T>()

/**
 * 短信登录
 * @param areaCode 区号，如：+86
 * @param mobile 手机号
 * @param smsCode 短信验证码
 */
export const loginWithSmsCode = <
  T = LoginFailureResponse | LoginSuccessResponse
>(
  areaCode: string,
  mobile: string,
  smsCode: string | number
) =>
  request
    .post('1.0/users/mixLoginWithPhone', {
      json: {
        areaCode,
        mobilePhoneNumber: mobile,
        smsCode: `${smsCode}`,
      },
      headers: {
        'x-jike-access-token': '',
      },
      throwHttpErrors: false,
    })
    .json<T>()
    .then((data) => ({
      success: !(data as any).error,
      ...data,
    }))
