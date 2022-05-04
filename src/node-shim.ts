import { randomUUID } from 'crypto'
import {
  Blob,
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
  globals.Blob = Blob
  globals.FormData = FormData
}

// UUID
if (!globals.crypto) globals.crypto = {}
if (!globals.crypto.randomUUID) globals.crypto.randomUUID = randomUUID

export const _nodeShim = {
  fetch,
  Headers,
  Request,
  Response,
  FormData,
  randomUUID,
}
