import {
  File,
  FormData,
  Headers,
  Request,
  Response,
  default as fetch,
} from 'node-fetch'

const globals: any = globalThis

// Fetch
if (!globals.fetch) {
  globals.fetch = fetch
  globals.Headers = Headers
  globals.Request = Request
  globals.Response = Response
}

if (!globals.FormData) {
  globals.File = File
  globals.FormData = FormData
}

export { fetch, Headers, Request, Response, FormData }
