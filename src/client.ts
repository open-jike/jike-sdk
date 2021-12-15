import { api } from './api'
import { setAccessToken } from './common'
import type { Api } from './api'

export const Client = (accessToken: string): Api =>
  new Proxy(api, {
    get(target, prop) {
      const mods = Reflect.get(target, prop)
      return new Proxy(mods, {
        get(target, prop) {
          return function (this: unknown, ...args: any[]) {
            setAccessToken(accessToken)
            return Reflect.get(target, prop).apply(this, args)
          }
        },
      })
    },
  })
