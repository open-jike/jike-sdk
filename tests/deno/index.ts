/* eslint-disable no-console */
import { getAccessToken, setAccessToken, Client } from '../../dist/modern.js'

setAccessToken('TEST-TOKEN')
console.log(getAccessToken())

const token = Deno.env.get('ACCESS_TOKEN')
if (!token) throw new Error('please set environment variable `ACCESS_TOKEN`')

const resp = await (Client(token) as any).profile()
console.log(JSON.stringify(resp))
