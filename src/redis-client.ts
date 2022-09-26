import Redis from 'ioredis'

const redisUrl = process.env.REDIS_URL

if (!redisUrl) {
  throw new Error('redisUrl not set in environment variable')
}

const createClient = () => new Redis(redisUrl)

const redisClientSingleton = createClient()

const getRedisClient = () => redisClientSingleton

export { getRedisClient }
