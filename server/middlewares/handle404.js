async function handle404(ctx, next) {
  if (ctx.status === 404) {
    ctx.redirect('/account')
    ctx.status = 301
  } else {
    next()
  }
}

export default handle404
