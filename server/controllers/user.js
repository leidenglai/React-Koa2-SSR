import _ from 'lodash'
import jwt from 'jsonwebtoken'
import { Promise } from 'es6-promise'

import * as proxyUser from '../proxy/user'
import config from '../config'

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
    .then(checkResult => {
      if (checkResult && checkResult.comparePassword(ctx.query.pass)) {
        // 创建token
        const webToken = jwt.sign(
          { email: checkResult.email, uid: checkResult.uid },
          config.secret,
          { expiresIn: 86400 }
        ) // expires in 24 hours

        // 更新用户的webToken
        checkResult.webToken = webToken

        return checkResult.save()
      } else {
        return Promise.reject(10001)
      }
    })
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
      // 统一处理Promise链的报错返回
      const code = _.isNumber(err) ? err : err.code || 100003

      ctx.body = {
        code,
        message: '用户或者密码错误'
      }

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
        return Promise.reject({ code: 100002, message: '邮箱已存在' })
      }
      if (data[1]) {
        // 手机号已存在
        return Promise.reject({ code: 100003, message: '手机号已存在' })
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
      ctx.body = {
        code: err.code,
        message: err.message
      }

      next()
    })
}

export default {
  getSharekey,
  getSellerBaseProfile,
  login,
  registerUser
}
