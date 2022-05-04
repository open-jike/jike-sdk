import { Blob } from 'buffer'
import sharp from 'sharp'
import Md5 from 'md5'
import { describe, expect, it } from 'vitest'
import { faker } from '@faker-js/faker'
import { api, isSuccess, setApiConfig } from '../../src'
import { config } from '../config'

describe('upload should work', async () => {
  setApiConfig(config)

  let token: string
  const image = await sharp({
    create: {
      width: Math.floor(Math.random() * 100) + 1,
      height: Math.floor(Math.random() * 100) + 1,
      channels: 3,
      background: faker.internet.color(),
    },
  })
    .png()
    .toBuffer()
  const md5 = Md5(image)

  it('token should work', async () => {
    const result = await api.upload.token(md5)
    expect(isSuccess(result)).toBe(true)
    expect(result.data.uptoken).a('string')
    token = result.data.uptoken
  })

  describe('upload image', () => {
    it('Buffer should work', async () => {
      // @ts-expect-error
      const result = await api.upload.upload(new Blob([image.buffer]), token)
      expect(result.success).toBe(true)
      expect(result.fileUrl).to.be.a('string')
      expect(result.id).to.be.a('string')
      expect(result.key).a('string')
    })

    it('Blob should work', async () => {
      const result = await api.upload.upload(image, token)
      expect(result.success).toBe(true)
      expect(result.fileUrl).to.be.a('string')
      expect(result.id).to.be.a('string')
      expect(result.key).a('string')
    })
  })
})
