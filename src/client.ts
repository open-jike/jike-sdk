import { api } from './api'
import { setAccessToken } from './common'
import type { Api } from './api'

export const Client = (accessToken: string): Api =>
  new Proxy(api, {
    get(target, prop: keyof Api) {
      const fn = target[prop] as (...args: any[]) => any
      return function (this: unknown, ...args: any[]) {
        setAccessToken(accessToken)
        return fn.apply(this, args)
      }
    },
  })
