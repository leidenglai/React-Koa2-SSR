import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import { Provider } from 'react-redux'
import { addLocaleData, IntlProvider } from 'react-intl'
import { LocaleProvider } from 'antd'

import routes from '../../client/routes'
import store from '../../client/redux/store'

async function clientRoute(ctx, next) {
  let _renderProps

  match({ routes, location: ctx.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      console.log(error.stack)
    }

    _renderProps = renderProps
  })

  // 加载locale 配置文件
  const appLocale = require('../../client/i18n/en_US')

  addLocaleData(appLocale.data)

  if (_renderProps) {
    const Root = renderToString(
      <LocaleProvider locale={appLocale.antd}>
        <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
          <Provider store={store}>
            <RouterContext {..._renderProps} />
          </Provider>
        </IntlProvider>
      </LocaleProvider>
    )

    await ctx.render('index', {
      root: Root,
      state: store.getState()
    })
  } else {
    await next()
  }
}

export default clientRoute
