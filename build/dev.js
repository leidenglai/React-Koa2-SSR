const Koa = require('koa')
const webpack = require('webpack')
const convert = require('koa-convert')
const serve = require('koa-static')
const devMiddleware = require('koa-webpack-dev-middleware')
const hotMiddleware = require('koa-webpack-hot-middleware')
const commonPath = require('./webpack.base.conf').commonPath
const config = require('./webpack.dev.conf')

const app = new Koa()
const compiler = webpack(config)

// for highly stable resources
app.use(serve(commonPath.staticDir))

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(
  convert(
    devMiddleware(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath
    })
  )
)

// enable hot-reload and state-preserving
// compilation error display
app.use(convert(hotMiddleware(compiler)))
app.listen(4000, '127.0.0.1', err => {
  err && console.log(err)
})
