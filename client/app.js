// es6兼容文件
import 'babel-polyfill'
/* 入口启动文件 */
import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { Router } from 'react-router'
import store, { history } from 'store'
import routes from 'routes'

// promise兼容 Auto-polyfill: https://github.com/stefanpenner/es6-promise
import 'es6-promise/auto'

// https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API
import 'isomorphic-fetch'

// // 全局加载lodash
// // Load the core build.
// windows._ = require('lodash/core');

import { LocaleProvider } from 'antd'

// 国际化
import { addLocaleData, IntlProvider } from 'react-intl'

import getLocalLanguageJson, { getLanguage } from 'utils/getLocalLanguageJson'
import shimInil from 'utils/shimInil'

// 初始化分享 如加载facebook SDK, 内含一个token的测试接口
import 'utils/shareInit'

/*
 * 国际化
 * 兼容不支持Intl浏览器
 */
window.localLanguage = getLanguage()
shimInil(window.localLanguage, () => {
  // 加载locale 配置文件
  const appLocale = getLocalLanguageJson()

  addLocaleData(appLocale.data)

  /* global __DEV__ */
  if (__DEV__) {
    console.info('[当前环境] 开发环境')
  }

  /* global __PROD__ */
  if (__PROD__) {
    console.info('[当前环境] 生产环境')
  }

  const MOUNT_NODE = document.getElementById('app')

  MOUNT_NODE.className += ` ${window.localLanguage}`

  // 加载intl,redux
  const App = () =>
    <LocaleProvider locale={appLocale.antd}>
      <IntlProvider
        className={window.localLanguage}
        locale={appLocale.locale}
        messages={appLocale.messages}>
        <Provider store={store}>
          <Router history={history}>{routes}</Router>
        </Provider>
      </IntlProvider>
    </LocaleProvider>

  // ================================
  // 将根组件挂载到 DOM，启动！
  // ================================
  ReactDOM.render(<App />, MOUNT_NODE)
})

// === Webpack 处理 assets，取消注释即可进行测试 === //
/* 处理 less / sass */
/* 公共css覆盖 */
import 'assets/less/common.less'
import 'assets/less/i18n.less'
// import 'assets/less/normalize.less'
// import 'assets/scss/normalize.scss'

/**
 * 【拓展】
 *  react-redux 的 Provider 中传入的属性
 *  可以让全体组件轻松访问，避免繁琐累赘的层层下传。例子：
 *
 *  class XXX extends Component {
 *    static contextTypes = {
 *      // 组件中需要这样子声明
 *      store: PropTypes.object.isRequired
 *    }
 *    componentDidMount () {
 *      // 之后就可以直接这样用
 *      this.context.store.getState()
 *    }
 *  }
 *
 *  但上面这种官方的做法实在太麻烦，于是我们有更为直接的方式：
 *  import store from 'store'
 *  store.getState() // 只读，更改 state 只能通过 dispatch
 */
