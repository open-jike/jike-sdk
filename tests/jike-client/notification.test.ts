import { describe, expect, it } from 'vitest'
import { JikeClient, limit } from '../../src'
import { config, refreshToken } from '../config'

describe('notification should work', () => {
  const client = new JikeClient({ ...config, refreshToken })

  it('queryNotifications should work', async () => {
    const notifications = await client.queryNotifications({
      limit: limit.limitMaxCount(100),
    });
    console.log(notifications.length);
    expect(notifications.length).lessThanOrEqual(100);
  });

  it('queryNotifications with merged should work', async () => {
    const notifications = await client.queryNotifications({
      limit: limit.limitMaxCount(100),
    }, true);
    console.log(notifications.length);
    expect(notifications.length).lessThanOrEqual(100);
  });
});
