const webpack = require('webpack')
const baseConfig = require('./webpack.base.conf')
const config = baseConfig.config
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const SOURCE_MAP = true

config.output.publicPath = '/'
config.output.filename = '[name].js'
config.output.chunkFilename = 'chunk.[id].js'

config.devtool = SOURCE_MAP ? 'cheap-module-eval-source-map' : false

// add hot-reload related code to entry chunk
config.entry.app = [
  config.entry.app,
  'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
]

// 开发环境下直接内嵌 CSS 以支持热替换
// modifyVars 替换默认主题
config.module.rules.push(
  {
    test: /\.css$/,
    use: [
      'style-loader',
      `css-loader?modules&context=${__dirname}&localIdentName=[name]__[local]___[hash:base64:5]`,
      'postcss-loader'
    ]
  },
  {
    test: /\.less$/,
    use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
  }
)

config.plugins.push(
  // 开启全局的模块热替换（HMR）
  new webpack.HotModuleReplacementPlugin(),

  // 当模块热替换（HMR）时在浏览器控制台输出对用户更友好的模块名字信息
  new webpack.NamedModulesPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new ExtractTextPlugin({ filename: '[name].css' }),

  new HtmlWebpackPlugin({
    filename: '../views/dev/index.html',
    template: './views/tpl/index.tpl.html',
    chunksSortMode: 'dependency'
  })
  // new BrowserSyncPlugin(
  //   {
  //     host: '127.0.0.1',
  //     open: false,
  //     port: 4000,
  //     proxy: 'http://127.0.0.1:4000/',
  //     logConnections: false,
  //     notify: false,
  //     browser: 'google chrome'
  //   },
  //   {
  //     reload: false
  //   }
  // )
)

module.exports = config
