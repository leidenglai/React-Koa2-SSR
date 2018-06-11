async function packBody(ctx, next) {
  if (ctx.body) {
    const { data, code, message } = ctx.body

    if (code !== 200 && code !== undefined) {
      ctx.body = {
        code,
        message
      }
    } else {
      ctx.body = {
        code: 200,
        data,
        message: 'success'
      }
    }
  } else {
    await next()
  }
}

export default packBody
