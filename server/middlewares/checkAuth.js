import jwt from 'jsonwebtoken' // 用来创建和确认用户信息摘要
import validator from 'validator'
import config from '../config'
import redisClient from '../models/redisClient'

// 检查用户会话
export async function auth(ctx, next) {
  // 检查post的信息或者url查询参数或者头信息
  let webToken = String(
    ctx.body && ctx.body.webToken || ctx.query.webToken || ctx.headers['x-access-token'] || ''
  )

  webToken = validator.trim(webToken)

  // 解析 token
  if (webToken) {
    // redis中取出token原文
    const token = await redisClient.getAsync(webToken)

    console.log(token)

    if (!token) {
      return ctx.throw(401, { msg: '错误的accessToken' })
    }

    // invalid token - synchronous
    try {
      // 校验token过期
      const decoded = jwt.verify(token, config.secret)

      ctx.userData = { ...decoded, webToken }
      await next()
    } catch (err) {
      return ctx.throw(401, { msg: 'token过期' })
    }
  } else {
    // 如果没有token，则返回错误
    return ctx.throw(401, '没有token')
  }
}
