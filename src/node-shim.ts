import { Blob } from 'node:buffer'
import * as crypto from 'node:crypto'
import { File, FormData, Headers, Request, Response, fetch } from 'undici'

const globals = Object.assign(globalThis, {
  File,
  Blob,
  fetch,
  Headers,
  Request,
  Response,
  FormData,
  crypto,
})

export {
  File,
  Blob,
  fetch,
  Headers,
  Request,
  Response,
  FormData,
  crypto,
  globals as globalThis,
}
