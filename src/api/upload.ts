import ky from 'ky'
import { request, toResponse } from '../request'
import type { Upload } from '../types/api-responses'

export const token = <T = Upload.TokenResponse>(md5: string) =>
  toResponse<T>(
    request.get('1.0/upload/token', {
      searchParams: { md5 },
    })
  )

export const upload = async (image: File | Buffer, token: string) => {
  let file: File
  if (typeof Buffer !== 'undefined' && Buffer.isBuffer(image)) {
    file = new File([image.buffer], '?')
  } else {
    file = image as File
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
