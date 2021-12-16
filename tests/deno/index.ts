/* eslint-disable */
import { getAccessToken, setAccessToken, ApiClient } from '../../dist/index.js'

setAccessToken('TEST-TOKEN')
console.log(getAccessToken())

const token = Deno.env.get('ACCESS_TOKEN')
if (!token) throw new Error('please set environment variable `ACCESS_TOKEN`')

const resp = await (ApiClient({ accessToken: token }).users as any).profile()
console.log(JSON.stringify(resp))
