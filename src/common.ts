import ky from 'ky'
import { API_BASE, env } from './constants'
import install from './fetch-node'

install()

let accessToken = ''
export const setAccessToken = (token: string) => (accessToken = token)
export const getAccessToken = () => accessToken

export const request = ky.create({
  prefixUrl: API_BASE,
  headers: {
    'user-agent': env.userAgent,
    'x-jike-device-id': env.deviceId,
    'x-jike-device-properties': JSON.stringify({ idfv: env.idfv }),
    manufacturer: env.manufacturer,
    os: env.os,
    'os-version': env.osVersion,
    bundleid: env.bundleId,
  },
  hooks: {
    beforeRequest: [
      (req) => {
        const key = 'x-jike-access-token'
        if (req.headers.get(key) === '') req.headers.delete(key)
        else if (accessToken) req.headers.set(key, accessToken)
      },
    ],
  },
})
