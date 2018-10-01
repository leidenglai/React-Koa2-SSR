const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const baseConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const SOURCE_MAP = 'cheap-module-eval-source-map'

const clientConfig = baseConfig.config
const commonPath = baseConfig.commonPath

clientConfig.output.filename = '[name].[chunkhash:6].js'
clientConfig.output.chunkFilename = '[id].[chunkhash:6].js'

clientConfig.devtool = SOURCE_MAP ? 'hidden-source-map' : false

// 生产环境下分离出 CSS 文件
// modifyVars 替换默认主题
clientConfig.module.rules.push(
  {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [`css-loader?modules&context=${__dirname}&localIdentName=[name]__[local]___[hash:base64:5]`, 'postcss-loader']
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

clientConfig.plugins.push(
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
  new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
  // new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 30000 }),
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

function getExternals() {
  return fs
    .readdirSync(path.resolve(__dirname, '../node_modules'))
    .filter(filename => !filename.includes('.bin'))
    .reduce((externals, filename) => {
      externals[filename] = `commonjs ${filename}`

      return externals
    }, {})
}

const serverConfig = {
  context: path.resolve(__dirname, '..'),
  entry: { server: './server/server.prod' },
  output: {
    path: path.resolve(__dirname, '../dist/server'),
    filename: '[name].js',
    chunkFilename: 'chunk.[name].js'
  },
  target: 'node',
  node: {
    __filename: true,
    __dirname: true
  },
  module: {
    rules: [
      ...baseConfig.config.module.rules,
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [`css-loader?modules&context=${__dirname}&localIdentName=[name]__[local]___[hash:base64:5]`, 'postcss-loader']
        })
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'less-loader']
        })
      }
    ]
  },
  externals: getExternals(),
  resolve: baseConfig.config.resolve,
  plugins: [
    ...baseConfig.config.plugins,
    new webpack.optimize.ModuleConcatenationPlugin(),
    // new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 30000 }),
    // new webpack.optimize.UglifyJsPlugin({ sourceMap: false }),
    new ExtractTextPlugin({
      filename: '[name].[contenthash:6].css',
      allChunks: true // 若要按需加载 CSS 则请注释掉该行
    }),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') })
  ]
}

module.exports = [clientConfig, serverConfig]
