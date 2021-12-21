import sharp from 'sharp'
import Md5 from 'md5'
import { describe, it, expect } from 'vitest'
import faker from 'faker'
import { setApiConfig, api } from '../src'
import { config } from './config'

describe('upload should work', async () => {
  setApiConfig(config)

  let token: string
  const image = await sharp({
    create: {
      width: Math.floor(Math.random() * 100),
      height: Math.floor(Math.random() * 100),
      channels: 3,
      background: faker.internet.color(),
    },
  })
    .png()
    .toBuffer()
  const md5 = Md5(image)

  it('token should work', async () => {
    const result = await api.upload.token(md5)
    expect(result.status).toBe(200)
    expect(result.data.success).toBe(true)
    expect(result.data.uptoken).a('string')
    token = result.data.uptoken
  })

  it('upload image', async () => {
    const result = await api.upload.upload(image, token)
    expect(result.success).toBe(true)
    expect(result.fileUrl).to.be.a('string')
    expect(result.id).to.be.a('string')
    expect(result.key).a('string')
  })
})
