import { api } from './api'
import { setApiConfig } from './request'
import type { ApiConfig } from './request'
import type { Api } from './api'

export const ApiClient = (apiConfig: Partial<ApiConfig>): Api =>
  new Proxy(api, {
    get(target, prop) {
      const mods = Reflect.get(target, prop)
      return new Proxy(mods, {
        get(target, prop) {
          return function (this: unknown, ...args: any[]) {
            setApiConfig(apiConfig)
            return Reflect.get(target, prop).apply(this, args)
          }
        },
      })
    },
  })
