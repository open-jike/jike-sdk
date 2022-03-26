import { describe, expect, it } from 'vitest'
import { api, isSuccess, setApiConfig } from '../../src'
import { config } from '../config'

setApiConfig(config)

describe('comment should work', () => {
  it('list should work', async () => {
    const result = await api.recommendFeed.list()
    expect(isSuccess(result)).toBe(true)
    expect(result.data.data.length).greaterThan(0)
  })
})
