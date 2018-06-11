let config = require('../config')
let pathLib = require('path')

let env = process.env.NODE_ENV || 'development'

let log4js = require('log4js')

log4js.configure({
  appenders: [
    { type: 'console' },
    { type: 'file', filename: pathLib.join(config.logDir, 'cheese.log'), category: 'cheese' }
  ]
})

let logger = log4js.getLogger('cheese')

logger.setLevel(config.debug && env !== 'test' ? 'DEBUG' : 'ERROR')

module.exports = logger
