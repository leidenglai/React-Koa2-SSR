import UserService from 'services/userService'
import { history } from 'store'

// ================================
// Action Creator
// ================================

// 加载本地用户数据
export const USERDATA_GET = 'USERDATA_GET'
export const getUserData = () => dispatch => {
  const userData = JSON.parse(localStorage.getItem('userData'))

  dispatch({
    type: USERDATA_GET,
    payload: userData
  })
}

export const checkLogin = () => () => {
  // 检查本地的token
  const token = localStorage.getItem('token')

  if (!token) {
    history.replace('/account')
  }
}

// ================================
// Action Type
// ================================
export const LOG_OUT = 'LOG_OUT'
export const logout = () => {
  history.replace('/account')

  return dispatch => {
    UserService.logout().then(() => {
      localStorage.removeItem('token')
      localStorage.removeItem('userData')
      dispatch({ type: LOG_OUT })
    })
  }
}

// 卖家app的下载信息
export const GET_DOWNLOAD_URL = 'GET_DOWNLOAD_URL'
export const getSellerBaseProfile = (cb = () => {}) => dispatch => {
  UserService.getSellerBaseProfile().then(data => {
    dispatch({
      type: GET_DOWNLOAD_URL,
      payload: data
    })

    // 执行回调
    cb()
  })
}

export default { getSellerBaseProfile }
