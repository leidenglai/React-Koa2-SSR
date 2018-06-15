import _ from 'lodash'
import { Promise } from 'es6-promise'

import * as proxyUser from '../proxy/user'
import config from '../config'
import statusCode from '../common/statusCode'
import { getHmac } from '../utils/cryptoHelper'
import redisClient from '../models/redisClient'

export function getSharekey(ctx, next) {
  const { uid } = ctx.userData

  return proxyUser.getInitShareData(uid).then(shareData => {
    ctx.body = { data: shareData }

    next()
  })
}

/**
 *  获取用户信息
 */
export function getSellerBaseProfile(ctx, next) {
  const { uid } = ctx.userData

  return proxyUser.getUserDataByUserId(uid).then(userData => {
    ctx.body = { data: userData }

    next()
  })
}

/**
 * 登录
 */
export function login(ctx, next) {
  return proxyUser
    .checkUser(ctx.query)
    .then(user => {
      if (user && user.comparePassword(ctx.query.pass)) {
        // 创建token
        const hashToken = getHmac(user.email, config.secret)
        const userDataJson = JSON.stringify({
          email: user.email,
          uid: user.uid,
          webToken: hashToken
        })

        // 使用token作为key将用户数据存入redis 然后再存数据库
        const redisSetPromise = redisClient.setAsync(hashToken, userDataJson).then(() => user)

        // Expire in 3 seconds
        redisClient.expire(hashToken, config.tokenExpire)

        user.webToken = hashToken

        return redisSetPromise // 存入数据库
      } else {
        return Promise.reject(statusCode.err10001)
      }
    })
    .then(user => user.save())
    .then(user => {
      // 登录成功处理
      ctx.body = {
        data: {
          email: user.email,
          phone: user.phone,
          shareData: user.shareData,
          webToken: user.webToken,
          uid: user.uid
        }
      }

      next()
    })
    .catch(err => {
      const code = err.code ? err.code : 10001

      // 统一处理Promise链的报错返回
      ctx.body = _.assign(err, { code })

      next()
    })
}

/**
 * 注册
 */
export function registerUser(ctx, next) {
  const { email, phone, pass } = _.mapValues(ctx.request.body, _.trim)

  // 检查用户名和邮箱是否存在
  return Promise.all([proxyUser.getUserDataByEmail(email), proxyUser.getUserDataByPhone(phone)])
    .then(data => {
      if (data[0]) {
        // 邮箱已存在
        return Promise.reject(statusCode.err10002)
      }
      if (data[1]) {
        // 手机号已存在
        return Promise.reject(statusCode.err10003)
      }

      return proxyUser.createUser({
        email,
        phone,
        pass,
        isNew: true
      })
    })
    .then(() => {
      ctx.body = { message: '注册成功' }

      next()
    })
    .catch(err => {
      // 统一处理Promise链的报错返回
      ctx.body = err

      next()
    })
}

/**
 *  退出登录
 */
export function loginOut(ctx, next) {
  const { webToken } = ctx.userData

  // 删除redis中的webToken 跳转到登录
  return redisClient.delAsync(webToken).then(() => {
    ctx.body = statusCode.info301

    ctx.redirect('/account')
    ctx.status = 301
    next()
  })
}

export default {
  getSharekey,
  getSellerBaseProfile,
  login,
  registerUser,
  loginOut
}
