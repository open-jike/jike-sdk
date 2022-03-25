import { ApiClient, setApiConfig } from '../../dist/index.js'
// @ts-expect-error
import { config } from './config.ts'

setApiConfig(config)

const resp = await (ApiClient(config).users as any).profile()
console.log(JSON.stringify(resp))
