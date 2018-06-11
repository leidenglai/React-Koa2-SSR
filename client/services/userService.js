import packOptionsToFetch from './fetch'

/**
 * 对应后端涉及到用户认证的 API
 */
class UserService {
  /**
   * 用户登录
   * @param  {Object}
   * params.email 用户名 邮箱
   * params.pass 密码
   * @return {Promise}
   */
  login(userData) {
    return packOptionsToFetch({
      method: 'GET',
      api: '/api/user/login',
      params: userData
    })
  }

  /**
   * 用户注册
   * @param  {Object}
   * params.email 用户名 邮箱
   * params.pass 密码
   * params.rePass 确认密码
   * params.phone 手机号
   *
   * @return {Promise}
   */
  register(userData) {
    return packOptionsToFetch({
      method: 'POST',
      api: '/api/user/register',
      params: userData
    })
  }

  /**
   * 用户退出
   * @return {Promise}
   */
  logout() {
    return packOptionsToFetch({
      method: 'post',
      api: '/api/user/logout'
    })
  }

  // 查询卖家基础信息
  getSellerBaseProfile() {
    return packOptionsToFetch({
      method: 'GET',
      api: '/api/user/getSellerBaseProfile'
    })
  }

  /**
   * 初始化分享
   * 如facebook SDK加载需要的初始条件 请求后端，如appID等
   **/
  getInitShareData() {
    return packOptionsToFetch({
      method: 'GET',
      api: '/api/user/getSharekey'
    })
  }
}

// 实例化后再导出
export default new UserService()
