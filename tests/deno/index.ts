import { setApiConfig, ApiClient } from '../../dist/index.js'
import { config } from './config.ts'

setApiConfig(config)

const resp = await (ApiClient(config).users as any).profile()
console.log(JSON.stringify(resp))
