/**
 * config
 */
import path from 'path'

const config = {
  // debug 为 true 时，用于本地调试
  debug: true,

  logDir: path.join(__dirname, 'logs'),

  // mongodb 配置
  db: 'mongodb://127.0.0.1:27017/ReactIsomorphicDb',

  secret: 'ilovenotbug',

  // 密码“加盐”
  saltPassword: 'ilovenotbug2',

  // redis 配置，默认是本地
  redisHost: '127.0.0.1',
  redisPort: 6379,
  redisDb: 0,
  redisPassword: '',

  // token 失效时间 86400 = 1day
  tokenExpire: 86400
}

if (process.env.NODE_ENV === 'test') {
  config.db = 'mongodb://127.0.0.1:27017/ReactIsomorphicDbTest'
}

export default config
