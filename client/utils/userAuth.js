// import { message } from 'antd'
// import getLocalLanguageJson from 'utils/getLocalLanguageJson'
// const appLocale = getLocalLanguageJson().messages

/**
 * 用户访问权限拦截器
 * @export {Function} onEnter，详见以下文档：
 * https://github.com/reactjs/react-router/blob/master/docs/API.md#onEnter
 */
export default function userAuth(nextState, replace, next) {
  // 检查本地的token
  const token = localStorage.getItem('webToken')

  if (token) {
    return next()
  }

  next(replace('/account')) // 跳转到登录页
}
