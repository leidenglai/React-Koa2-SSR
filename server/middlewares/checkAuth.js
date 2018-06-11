/* !
 * Moajs Middle
 * Copyright(c) 2015-2019 Alfred Sang <shiren1118@126.com>
 * MIT Licensed
 */
import jwt from 'jsonwebtoken' // 用来创建和确认用户信息摘要

import config from '../config'

// 检查用户会话
export default async function checkAuth(ctx, next) {
  // 检查post的信息或者url查询参数或者头信息
  const webToken =
    ctx.body && ctx.body.webToken || ctx.query.webToken || ctx.headers['x-access-token']

  // 解析 token
  if (webToken) {
    // invalid token - synchronous
    try {
      // 确认token
      const decoded = jwt.verify(webToken, config.secret)

      ctx.userData = decoded
      await next()
    } catch (err) {
      return ctx.throw(401, { msg: 'token过期' })
    }
  } else {
    // 如果没有token，则返回错误
    return ctx.throw(401, '没有token')
  }
}
