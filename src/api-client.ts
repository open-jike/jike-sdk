import { api } from './api'
import { setApiConfig } from './request'
import type { ApiConfig } from './request'
import type { Api } from './api'

/**
 * API 客户端
 * @description 用于多账号时，方便管理实例
 * @param apiConfig API 配置
 */
export const ApiClient = (apiConfig: ApiConfig): Api => {
  setApiConfig(apiConfig)
  return new Proxy(api, {
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
}
