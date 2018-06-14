import _ from 'lodash'
import { message } from 'antd'

import * as config from 'config'
import responseHandler from 'utils/responseHandler'

/**
 *包装fetch普通数据请求
 *@param {String} api  [必选] 后端API
 *@param {[Object]} params [可选] 请求参数
 *@param {[String]} type [可选] 接口domain
 *@param {[String]} method  [可选] 请求类型
 *
 *@return Promise Object
 */
export default function packOptionsToFetch({ api, params = {}, type = 'API', method = 'POST' }) {
  return new Promise((resolve, reject) => {
    const webToken = localStorage.getItem('webToken')

    let globalParams = { ...config.DEF_REQUEST_CONFIG, webToken }

    let completeApi =
      config['SERVER_API_ROOT_' + type] +
      (config.SERVER_API_PORT ? ':' + config.SERVER_API_PORT : '') +
      api

    const requestParams = _.map(Object.assign({}, globalParams, params), (value, key) => {
      if (typeof value === 'object') {
        value = JSON.stringify(value)
      } else if (typeof value === 'string') {
        value = value.trim()
      }

      return key + '=' + encodeURIComponent(value)
    })

    const options = {
      method,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },

      // 让请求中包含cookie
      credentials: 'include',

      /*
       * same-origin：
       * 该模式是不允许跨域的，它需要遵守同源策略，否则浏览器会返回一个error告知不能跨域；
       * 其对应的response type为basic。
       * cors:
       * 该模式支持跨域请求，顾名思义它是以CORS的形式跨域；
       * 当然该模式也可以同域请求不需要后端额外的CORS支持；其对应的response type为cors。
       * no-cors:
       * 该模式用于跨域请求但是服务器不带CORS响应头，也就是服务端不支持CORS；
       * 这也是fetch的特殊跨域请求方式；其对应的response type为opaque。
       */
      mode: 'cors'
    }

    if (method.toLowerCase() == 'post') {
      /*
       * 需要发送的数据，可以是 Blob, BufferSource, FormData, URLSearchParams, 或者 USVString。
       * 需要注意的是 GET 和 HEAD 方法不能包含 body。
       */
      options.body = requestParams.join('&')
    } else if (method.toLowerCase() == 'get') {
      completeApi = completeApi + '?' + requestParams.join('&')
    }

    // 发送请求 返回promise对象
    fetch(completeApi, options)
      .then(responseHandler)
      .then(res => resolve(res))
      .catch((error = {}) => {
        console.log(error)

        if (error.code == 401 && window.location.pathname !== '/account') {
          // 无权限 返回登录
          window.location.href = '/account'
        } else if (error.code == 403) {
          message.error('你没有此接口的权限')
        } else {
          error.message && message.error(error.message)

          reject(error)
        }
      })
  })
}
