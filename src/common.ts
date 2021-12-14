import ky from 'ky'
import { API_BASE } from './constants'
import './fetch-node'

export const isNode = true

let accessToken = ''
export const setAccessToken = (token: string) => (accessToken = token)
export const getAccessToken = () => accessToken

export const request = ky.create({
  prefixUrl: API_BASE,
  hooks: {
    beforeRequest: [
      (req) => {
        if (accessToken) req.headers.set('x-jike-access-token', accessToken)
      },
    ],
  },
})
