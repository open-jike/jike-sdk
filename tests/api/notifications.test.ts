import { describe, expect, it } from 'vitest'
import { api, isSuccess, setApiConfig } from '../../src'
import { config } from '../config'

describe('notifications should work', () => {
  setApiConfig(config)

  it('list should work', async () => {
    const result = await api.notifications.list()
    expect(isSuccess(result)).toBe(true)
    expect(result.data.data.length).greaterThanOrEqual(1)
  })

  it('list merged_notifications should work', async () => {
    const testMergedCommentId = '65c464b350cd1a4d56c9bb53'
    const result =
      await api.notifications.listMergedMentions(testMergedCommentId)
    expect(isSuccess(result)).toBe(true)
    expect(result.data.data.length).greaterThanOrEqual(1)
  })

  it.only('list with merged should work', async () => {
    const result = await api.notifications.listWithMerged()
    expect(result.data.data.length).greaterThanOrEqual(1)
  })
})
