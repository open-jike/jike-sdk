import got from 'got'
import { API_BASE } from './constants'

let accessToken = ''
export const setAccessToken = (token: string) => (accessToken = token)

export const request = got.extend({
  prefixUrl: API_BASE,
  responseType: 'json',
  handlers: [
    (options, next) => {
      if (accessToken) options.headers['x-jike-access-token'] = accessToken
      return next(options)
    },
  ],
})
