import { assert } from 'https://deno.land/std@0.134.0/testing/asserts.ts'
import { ApiClient, isSuccess, setApiConfig } from '../../dist/index.js'
import { config } from './config.ts'

setApiConfig(config)

const response = await (ApiClient(config).users as any).profile()
assert(isSuccess(response))

console.log(JSON.stringify(response, undefined, 2))
