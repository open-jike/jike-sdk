import { describe, expect, it } from 'vitest'
import { api, isSuccess, setApiConfig } from '../../src'
import { config } from '../config'

describe('stories should work', () => {
  setApiConfig(config)

  it('followingFeed should work', async () => {
    const result = await api.stories.followingFeed()
    expect(isSuccess(result)).toBe(true)
  })

  it('listUserStories should work', async () => {
    const result = await api.stories.listUserStories(
      'c00cf715-b71b-464b-9dcc-d73e01878137'
    )
    expect(isSuccess(result)).toBe(true)
  })

  it('getStoryVideo should word', async () => {
    const result = await api.stories.getStoryVideo('627fcab1d505530011e9c7c4')
    expect(isSuccess(result)).toBe(true)
  })
})
