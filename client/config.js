export let SERVER_PROTOCOL = '//'

export const SOURCE_TYPE = 1

// 开发环境使用http协议
/* global __DEV__ */
if (__DEV__) {
  SERVER_PROTOCOL = 'http://'
}

// 卖家主域名
let SELLER_MAIN_DOMAIN = 'mynovoshops.com'
// 后端 API 地址
let SERVER_API_ROOT = 'http://localhost'
// 卖家完整域名

// 后端 API 地址
export const SERVER_API_ROOT_API = SERVER_API_ROOT

// 端口
export const SERVER_API_PORT = '3000'

// 卖家后台域名
export const SELLER_HOSTNAME = SELLER_MAIN_DOMAIN

// 请求默认参数
export const DEF_REQUEST_CONFIG = {}
