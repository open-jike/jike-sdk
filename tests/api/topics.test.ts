import { describe, expect, it } from 'vitest'
import { api, isSuccess, setApiConfig } from '../../src'
import { config } from '../config'

describe('topics should work', () => {
  setApiConfig(config)

  const topicId = '562dfeb0daf87d13002cad92' // 深圳吃喝玩乐圈子
  const limit = 10

  it('getTabsSquareFeed should work', async () => {
    const result = await api.topics.getTabsSquareFeed(topicId, { limit })
    expect(isSuccess(result)).toBe(true)
    expect(result.data.data.length).toBe(limit)
  })

  it('getTabsSelectedFeed should work', async () => {
    const result = await api.topics.getTabsSelectedFeed(topicId, { limit })
    expect(isSuccess(result)).toBe(true)
    expect(result.data.data.length).toBe(limit)
  })
})
