/* eslint-disable node/prefer-global/buffer */
import ky from 'ky'
import { request, toResponse } from '../request'
import type { Buffer, Blob as NodeBlob } from 'node:buffer'
import type { Upload } from '../types/api-responses'

export const token = <T = Upload.TokenResponse>(md5: string) =>
  toResponse<T>(
    request.get('1.0/upload/token', {
      searchParams: { md5 },
    }),
  )

export const upload = async (
  image: NodeBlob | Blob | Buffer,
  token: string,
) => {
  let file: Blob
  if (
    typeof globalThis.Buffer !== 'undefined' &&
    globalThis.Buffer.isBuffer(image)
  ) {
    file = new Blob([image.buffer])
  } else {
    file = image as Blob
  }
  const formData = new FormData()
  formData.append('file', file)
  formData.append('token', token)
  const result = await ky
    .post('https://upload.qiniup.com/', {
      body: formData,
      throwHttpErrors: false,
    })
    .json<{ fileUrl: string; id: string; key: string; success: boolean }>()
  return result
}
