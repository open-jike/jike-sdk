import { describe, expect, it } from 'vitest'
import { JikeClient } from '../../src'
import { config, refreshToken } from '../config'

describe('constructor', () => {
  const client = new JikeClient({ ...config, refreshToken })

  it('toJSON should work', async () => {
    const json = await client.toJSON()
    const profile = await client.getSelf().queryProfile()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { beforeRetry, ...cfg } = client.config
    expect(json).toEqual({
      ...cfg,
      refreshToken: client.refreshToken,
      userId: profile.user.id,
      username: profile.user.username,
      screenName: profile.user.screenName,
    })
  })

  it('serialize should work', async () => {
    const data = await client.serialize()
    const profile = await client.getSelf().queryProfile()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { beforeRetry, ...cfg } = client.config
    expect(data).toEqual(
      JSON.stringify({
        ...cfg,
        refreshToken: client.refreshToken,
        userId: profile.user.id,
        username: profile.user.username,
        screenName: profile.user.screenName,
      })
    )
  })

  it('fromJSON should work', async () => {
    const client2 = JikeClient.fromJSON(await client.toJSON())
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { beforeRetry: _, ...clienConfig } = client.config
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { beforeRetry, ...clien2Config } = client2.config
    expect(clien2Config).toEqual(clienConfig)
  })

  it('serialize should work', async () => {
    const client2 = JikeClient.fromJSON(JSON.parse(await client.serialize()))
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { beforeRetry: _, ...clienConfig } = client.config
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { beforeRetry, ...clien2Config } = client2.config
    expect(clien2Config).toEqual(clienConfig)
  })

  it('should create user instance only once', () => {
    expect(client.getSelf()).toBe(client.getSelf())
    const username = '82D23B32-CF36-4C59-AD6F-D05E3552CBF3'
    expect(client.getUser(username)).toBe(client.getUser(username))
  })
})
