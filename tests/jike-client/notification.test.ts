import { describe, expect, it } from 'vitest'
import { JikeClient, limit } from '../../src'
import { config, refreshToken } from '../config'

describe('notifications should work', () => {
  const client = new JikeClient({ ...config, refreshToken })

  it('queryNotifications should work', async () => {
    const notifications = await client.queryNotifications({
      limit: limit.limitMaxCount(100),
    });
    expect(notifications.length).lessThanOrEqual(100);
  });
});
