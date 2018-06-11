// ======================================================
// 配置中间件
// ======================================================
import thunk from 'redux-thunk'
// import { historyMiddleware } from './syncHistoryWithStore'
// loading中间件 触发loading动画的action
import loadingMiddleware from '../middlewares/loading'

// const middlewares = [thunk, historyMiddleware, loadingMiddleware()]

const middlewares = [thunk, loadingMiddleware()]

/* global __DEV__ */
if (__DEV__) {
  /** Redux Logger (P.S: 打印日志会造成轻微的卡顿) **/
  const createLogger = require('redux-logger')

  middlewares.push(createLogger())
}

export default middlewares
