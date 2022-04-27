import { describe, expect, it } from 'vitest'
import { JikeClient } from '../../src'
import { config, refreshToken } from '../config'

describe('user', async () => {
  const client = new JikeClient({ ...config, refreshToken })
  const username = 'c00cf715-b71b-464b-9dcc-d73e01878137'

  const profile = await client.getUser(username).queryProfile()
  const { following } = profile.user

  describe('isFollowing should work', () => {
    it('follower mode should work', async () => {
      expect(await client.getSelf().isFollowing(username, 'follower')).toBe(
        following
      )
    })

    it('following mode should work', async () => {
      expect(await client.getSelf().isFollowing(username, 'following')).toBe(
        following
      )
    })
  })
})
