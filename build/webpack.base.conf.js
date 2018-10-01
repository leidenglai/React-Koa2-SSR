const path = require('path')
const webpack = require('webpack')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const rucksack = require('rucksack-css')
const autoprefixer = require('autoprefixer')

const rootPath = path.resolve(__dirname, '..') // 项目根目录
const src = path.join(rootPath, 'client') // 开发源码目录
const env = process.env.NODE_ENV.trim() // 当前环境

let commonPath = {
  rootPath,
  dist: path.join(rootPath, 'dist'), // build 后输出目录
  indexHTML: path.join(src, 'index.html'), // 入口基页
  staticDir: path.join(rootPath, 'static') // 无需处理的静态资源目录
}

// 静态资源目录
const CDN_PATH = `${env == 'production' ? '//lei.reacttest.com/client/' : 'http://'}`

process.noDeprecation = true

module.exports = {
  commonPath,

  // webpack主要公共配置
  config: {
    entry: {
      // ================================
      // 框架 / 类库 分离打包
      // ================================
      app: path.join(src, 'app.js')
    },
    output: {
      path: path.join(commonPath.dist, 'client'),
      publicPath: CDN_PATH
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        // ================================
        // 自定义路径别名
        // ================================
        assets: path.join(src, 'assets'),
        components: path.join(src, 'components'),
        constants: path.join(src, 'constants'),
        actions: path.join(src, 'redux/actions'),
        reducers: path.join(src, 'redux/reducers'),
        store: path.join(src, 'redux/store'),
        routes: path.join(src, 'routes'),
        services: path.join(src, 'services'),
        utils: path.join(src, 'utils'),
        HoC: path.join(src, 'utils/HoC'),
        mixins: path.join(src, 'utils/mixins'),
        containers: path.join(src, 'containers'),
        config: path.join(src, 'config'),
        static: path.join(rootPath, 'static')
      }
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: [
            'babel-loader?' +
              JSON.stringify({
                cacheDirectory: true,
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
                  'lodash'
                ],
                presets: ['es2015', ['env', { modules: false }], 'react', 'stage-2'],
                env: { production: { presets: ['react-optimize'] } }
              }),
            'eslint-loader'
          ],

          exclude: /node_modules/
        },
        {
          test: /\.html$/,
          loader: 'html-loader'
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          loader: 'url-loader',
          options: {
            limit: 10240, // 10KB 以下使用 base64
            name: 'img/[name]-[hash:6].[ext]'
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)$/,
          loader: 'url-loader?limit=10240&name=fonts/[name]-[hash:6].[ext]'
        }
      ]
    },
    plugins: [
      new ProgressBarPlugin(), // 进度条

      /**
       * https://webpack.js.org/guides/migrating/#loader-configuration-is-through-options
       * 公共配置
       */
      new webpack.LoaderOptionsPlugin({
        options: {
          eslint: { formatter: require('eslint-friendly-formatter') },
          postcss: [rucksack(), autoprefixer({ browsers: ['last 2 versions', 'Firefox ESR', '> 2%', 'ie >= 10', 'iOS >= 9'] })]
        }
      }),

      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require('../dist/manifest.json')
      }),

      new webpack.optimize.CommonsChunkPlugin({
        // 公共代码分离打包
        // names: ['vendor']

        names: ['vendor', 'manifest'],
        minChunks: 'Infinity'
      }),

      /**
       * https://github.com/lodash/lodash-webpack-plugin
       * 按需打包Lodash.js
       */
      new LodashModuleReplacementPlugin({
        shorthands: true,
        collections: true,
        caching: true,
        paths: true
      }),

      new webpack.DefinePlugin({
        // ================================
        // 配置开发全局常量
        // ================================
        __DEV__: env === 'development',
        __PROD__: env === 'production',
        __COMPONENT_DEVTOOLS__: false, // 是否使用组件形式的 Redux DevTools
        __WHY_DID_YOU_UPDATE__: false // 是否检测不必要的组件重渲染
      })
    ]
  }
}
