const path = require('path')
const webpack = require('webpack')
const rucksack = require('rucksack-css')
const autoprefixer = require('autoprefixer')

const rootPath = path.resolve(__dirname, '..') // 项目根目录
/**
 * 尽量减小搜索范围
 * target: '_dll_[name]' 指定导出变量名字
 */

module.exports = {
  entry: {
    // ================================
    // 框架 / 类库 分离打包
    // ================================
    vendor: [
      'babel-polyfill',
      'es6-promise',
      'history',
      'immutability-helper',
      'react',
      'react-dom',
      'react-intl',
      'react-redux',
      'react-router',
      'rc-queue-anim',
      'rc-tween-one',
      'react-router-redux',
      'redux',
      'redux-thunk',
      'isomorphic-fetch',
      'antd'
    ]
  },
  output: {
    path: path.join(rootPath, 'dist'),
    filename: '[name].dll.js',
    library: '_dll_[name]' // 全局变量名，其他模块会从此变量上获取里面模块
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      }
    ]
  },
  // manifest是描述文件
  plugins: [
    new webpack.DllPlugin({
      name: '_dll_[name]',
      path: path.join(rootPath, 'dist', 'manifest.json')
    }),

    /**
     * https://webpack.js.org/guides/migrating/#loader-configuration-is-through-options
     * 公共配置
     */
    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: { formatter: require('eslint-friendly-formatter') },
        postcss: [
          rucksack(),
          autoprefixer({ browsers: ['last 2 versions', 'Firefox ESR', '> 2%', 'ie >= 10', 'iOS >= 9'] })
        ]
      }
    })
  ]
}

// 作者：yanyongchao
// 链接：https://juejin.im/post/5ab7c222f265da237f1e4434
// 来源：掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
