import redis from 'redis'
import bluebird from 'bluebird'

import config from '../config'
import logger from '../common/logger'

bluebird.promisifyAll(redis)

const redisClient = redis.createClient(config.redisPort, config.redisHost)

redisClient.on('connect', () => {
  console.log('Redis client connected')
})

redisClient.on('error', err => {
  logger.error(
    'connect to Redis://%s error: ',
    config.redisHost + ':' + config.redisPort,
    err.message
  )
  process.exit(1)
})

export default redisClient
