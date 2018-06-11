// ========================================================
// 同步 history 配置
// ========================================================
import { useRouterHistory } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux'

let browserHistory

if (typeof document !== 'undefined') {
  browserHistory = useRouterHistory(createBrowserHistory)({ basename: '' })
}

export const historyMiddleware = routerMiddleware(browserHistory)

/**
 * @param  {Store}
 * @return {History} 增强版 history
 */
export default function(store) {
  return syncHistoryWithStore(browserHistory, store, { selectLocationState: state => state.router })
}
