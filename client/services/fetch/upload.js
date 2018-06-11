import { SERVER_API_ROOT_API } from 'config'
import responseHandler from 'utils/responseHandler'

/*
 * 包装fetch 上传文件
 * @param params Object [可选] 上传的file
 *
 * @return Promise Object
 */
export default function uploadFetch(file) {
  return new Promise((resolve, reject) => {
    let completeApi = SERVER_API_ROOT_API + '/product/savePic.do'
    let data = new FormData()

    const _userData = JSON.parse(localStorage.getItem('userData'))

    data.append('userId', _userData.userId)
    data.append('token', _userData.webToken)
    data.append('file', file)

    const options = {
      method: 'POST',

      /*
       * 需要发送的数据，可以是 Blob, BufferSource, FormData, URLSearchParams, 或者 USVString。
       * 需要注意的是 GET 和 HEAD 方法不能包含 body。
       */
      body: data,

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

    // 发送请求 返回promise对象
    fetch(completeApi, options)
      .then(responseHandler, err => {
        console.log('返回错误')
        reject(err.message)
        history.replace('/account')
      })
      .then(
        res => resolve(res),
        err => reject(err)
      )
  })
}
