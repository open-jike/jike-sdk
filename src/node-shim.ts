import { randomUUID } from 'crypto'
import { default as fetch, Headers, Request, Response } from 'node-fetch'
import FormData from 'form-data'

const globals: any = globalThis

// Fetch
if (!globals.fetch) {
  globals.fetch = fetch
  globals.Headers = Headers
  globals.Request = Request
  globals.Response = Response
}

if (!globals.FormData) {
  globals.FormData = FormData
}

// UUID
if (!globals.crypto) globals.crypto = {}
if (!globals.crypto.randomUUID) globals.crypto.randomUUID = randomUUID

export { fetch, Headers, Request, Response, randomUUID, FormData }
