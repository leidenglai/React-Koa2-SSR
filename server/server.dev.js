// 设置全局变量
global.__DEV__ = process.env.NODE_ENV.trim() === 'development'
global.__PROD__ = process.env.NODE_ENV.trim() === 'production'

global.__COMPONENT_DEVTOOLS__ = true

// Provide custom regenerator runtime and core-js
require('babel-polyfill')

require('isomorphic-fetch')

// Javascript require hook
const babelRegister = require('babel-register')

babelRegister({
  presets: ['es2015', ['env', { modules: false }], 'react', 'stage-2'],
  plugins: [
    'add-module-exports',
    'transform-runtime',
    'transform-decorators-legacy',
    [
      'import',
      {
        libraryName: 'antd',
        style: true
      }
    ],
    'lodash',
    [
      'css-modules-transform',
      {
        generateScopedName: '[name]__[local]___[hash:base64:5]',
        rootDir: __dirname,
        extensions: ['.css']
      }
    ]
  ]
})

// Node babel source map support
require('source-map-support').install()

const cssModulesHhook = require('css-modules-require-hook')
const lessParser = require('postcss-less').parse

// Css require hook
cssModulesHhook({
  extensions: ['.less'],
  rootDir: __dirname,
  processorOpts: { parser: lessParser },
  camelCase: true,
  generateScopedName: '[name]__[local]___[hash:base64:5]'
})

// Image require hook
require('asset-require-hook')({
  name: '/img/[name]-[hash:6].[ext]',
  extensions: ['jpg', 'jpeg', 'png', 'svg'],
  limit: 10240
})

const webpackConfig = require('../build/webpack.dev.conf')
// 配置别名
const moduleAlias = require('module-alias')

moduleAlias.addAliases(webpackConfig.resolve.alias)

const app = require('./app.js')
const convert = require('koa-convert')
const webpack = require('webpack')
const fs = require('fs')
const path = require('path')
const devMiddleware = require('koa-webpack-dev-middleware')
const hotMiddleware = require('koa-webpack-hot-middleware')
const views = require('koa-views')
const clientRoute = require('./middlewares/clientRoute')
const packBody = require('./middlewares/packBody')
const router = require('./routes')

// mongo数据库
require('./middlewares/mongooseLog') // 打印 mongodb 查询日志
require('./models')

const port = process.env.port || 3000
const compiler = webpack(webpackConfig)

// Webpack hook event to write html file into `/views/dev` from `/views/tpl` due to server render
compiler.plugin('emit', (compilation, callback) => {
  const assets = compilation.assets
  let file
  let data

  Object.keys(assets).forEach(key => {
    if (key.match(/\.html$/)) {
      file = path.resolve(__dirname, key)
      data = assets[key].source()
      fs.writeFileSync(file, data)
    }
  })
  callback()
})

app.use(views(path.resolve(__dirname, '../views/dev'), { map: { html: 'ejs' } }))
app.use(clientRoute)
app.use(router.routes())
app.use(packBody)

app.use(router.allowedMethods())
console.log(
  `\n==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.\n`
)
app.use(
  convert(
    devMiddleware(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    })
  )
)
app.use(convert(hotMiddleware(compiler)))
app.listen(port)
