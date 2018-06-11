const webpack = require('webpack')
const baseConfig = require('./webpack.base.conf')
const config = baseConfig.config
const commonPath = baseConfig.commonPath
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const SOURCE_MAP = 'cheap-module-eval-source-map'

config.output.filename = '[name].[chunkhash:6].js'
config.output.chunkFilename = '[id].[chunkhash:6].js'

config.devtool = SOURCE_MAP ? 'hidden-source-map' : false

// 生产环境下分离出 CSS 文件
// modifyVars 替换默认主题
config.module.rules.push(
  {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader', 'postcss-loader']
    })
  },
  {
    test: /\.less$/,
    loader: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader', 'postcss-loader', 'less-loader']
    })
  }
)

config.plugins.push(
  new CleanWebpackPlugin('dist', {
    root: commonPath.rootPath,
    verbose: false
  }),
  // 启用作用域提升
  // 作用域提升会移除模块外的函数包装,体积改进; 更显著的改进是 JavaScript 在浏览器中加载的速度
  new webpack.optimize.ModuleConcatenationPlugin(),
  // 复制高度静态资源
  new CopyWebpackPlugin([
    {
      context: commonPath.staticDir,
      from: '**/*',
      ignore: ['*.md']
    }
  ]),
  new webpack.optimize.UglifyJsPlugin({ sourceMap: false }),
  new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 30000 }),
  new ExtractTextPlugin({
    filename: '[name].[contenthash:6].css',
    allChunks: true // 若要按需加载 CSS 则请注释掉该行
  }),
  new HtmlWebpackPlugin({
    filename: '../index.html',
    template: commonPath.indexHTML,
    chunksSortMode: 'dependency'
  })
)

module.exports = config
