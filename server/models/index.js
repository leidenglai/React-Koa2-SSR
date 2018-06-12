import mongoose from 'mongoose'
import config from '../config'
import logger from '../common/logger'

mongoose.connect(config.db)
const db = mongoose.connection

db.on('error', err => {
  logger.error('connect to %s error: ', config.db, err.message)
  process.exit(1)
})

// models
require('./user')

export const User = mongoose.model('userColletion')
