/*
 *处理返回值
 *@param response Object [必选] 后端返回的response对象
 *
 *@return Promise Object json处理后的数据
 */
export default function responseHandler(response) {
  return new Promise((resolve, reject) => {
    // 服务器返回状态
    switch (response.status) {
      case 401: // 无权限
        return reject({ code: response.status, message: '登录信息失效' })
      default:
        break
    }

    response.json().then(
      ({ code, message, data }) => {
        // 服务器返回状态
        switch (code) {
          case 401: // 未登录
          case 403: // 无权限
            reject({ code })
            break
          case 200: // 请求成功
            resolve(data)
            break
          default:
            // 其他报错
            reject({ code, message, data })
            break
        }
      },
      () => {
        console.log('response json解析错误')
        reject('json error')
      }
    )
  })
}
