import mongoose from 'mongoose'
import crypto from 'crypto'

import BaseModel from './base'
import Sequence from './sequence'
import config from '../config'

const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    uid: { type: Number },
    name: String,
    pass: String,
    email: String,
    phone: String,
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
    webToken: { type: String },
    shareData: [
      {
        key: String,
        appId: String
      }
    ]
  },
  { collection: 'userColletion' }
)

UserSchema.plugin(BaseModel)

UserSchema.index({ uid: 1 }, { unique: true })
UserSchema.index({ email: 1 }, { unique: true })
UserSchema.index({ phone: 1 }, { unique: true })

// 在创建user时，生成自增ID值
UserSchema.pre('save', function(next) {
  const now = new Date()
  const self = this

  this.updateAt = now
  if (this.isNew) {
    Sequence.increment('userColletion', (err, result) => {
      if (err) {
        throw err
      }
      self.uid = result.value.next
      next()
    })
  } else {
    next()
  }
})

// 保存密码时处理密码加密
UserSchema.pre('save', function(next) {
  const now = new Date()

  if (this.isModified('password') || this.isNew) {
    // 密码加密
    this.pass = crypto
      .createHash('sha1')
      .update(this.pass + ':' + config.saltPassword)
      .digest('hex')
  }

  this.updateAt = now

  next()
})

// 校验用户输入密码是否正确
UserSchema.methods.comparePassword = function(passw) {
  const currPass = crypto
    .createHash('sha1')
    .update(passw + ':' + config.saltPassword)
    .digest('hex')

  return currPass === this.pass
}

mongoose.model('userColletion', UserSchema)
