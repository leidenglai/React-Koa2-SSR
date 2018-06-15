import validator from 'validator'
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
    const userDataJson = await redisClient.getAsync(webToken)

    if (!userDataJson) {
      return ctx.throw(401, { msg: '错误的accessToken' })
    } else {
      ctx.userData = JSON.parse(userDataJson)
      await next()
    }
  } else {
    // 如果没有token，则返回错误
    return ctx.throw(401, '没有token')
  }
}
