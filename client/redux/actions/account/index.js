import UserService from 'services/userService'

// ================================
// Action Type
// ================================
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'

export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS'
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR'

// ================================
// Action Creator
// ================================

function loginDone(userData) {
  return {
    type: LOG_IN_SUCCESS,
    payload: userData
  }
}

function resetDone() {
  return { type: RESET_PASSWORD_SUCCESS }
}

function login(formData) {
  return dispatch =>
    UserService.login(formData).then(re => {
      // token保存本地
      localStorage.setItem('webToken', re.webToken)

      dispatch(loginDone(re))
    })
}

// 注册账号
function register(formData) {
  return () => UserService.register(formData)
}

export function logout() {
  return () => UserService.logout()
}

export function resetPassword(formData) {
  return dispatch =>
    UserService.resetPwd(formData).then(() => {
      dispatch(resetDone())
    })
}

/* default 导出所有 Action Creators */
export default {
  // 虽然是同步的函数，但请不要自行 bindActionCreators
  // 皆因调用 connect 后，react-redux 已经帮我们做了，见：
  // https://github.com/reactjs/react-redux/blob/master/src/utils/wrapActionCreators.js
  login,
  logout,
  register
}
