const nock = require('nock')
const config = require('../server/config')

nock.enableNetConnect() // 允许真实的网络连接

// 设定环境变量
if (config.debug) {
  process.env.NODE_ENV = 'development'
} else {
  process.env.NODE_ENV = 'production'
}
