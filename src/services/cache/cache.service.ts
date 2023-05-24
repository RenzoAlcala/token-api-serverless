import type { RedisClientType } from 'redis';
import { createClient } from 'redis';

let redisClient: RedisClientType
let isReady: boolean

const cacheOptions = {
  url: process.env.REDIS_URL || 'redis://tokenredis-0001-001.frr542.0001.use1.cache.amazonaws.com:6379',
}

async function getCache(): Promise<RedisClientType> {
  if (!isReady) {
    redisClient = createClient({
      ...cacheOptions,
    })
    redisClient.on('error', err => console.error(`Redis Error: ${err}`))
    redisClient.on('connect', () => console.info('Redis connected'))
    redisClient.on('reconnecting', () => console.info('Redis reconnecting'))
    redisClient.on('ready', () => {
      isReady = true
      console.info('Redis ready!')
    })
    await redisClient.connect();
  }
  if(!redisClient.isOpen) {
    redisClient.connect();
  }
  return redisClient;
}

export {
  getCache,
}