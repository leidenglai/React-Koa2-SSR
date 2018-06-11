import UserService from 'services/userService'

/**
 * 分享组件
 */

class ShareInit {
  constructor() {
    UserService.getInitShareData().then(data => {
      if (data.key === 'facebook') {
        /* global __DEV__ */
        this.isLoadFacebookApi(__DEV__ ? '1825793994397852' : data.appId)
      }
    })
  }

  // 初始化facebook接口
  isLoadFacebookApi(appId) {
    window.fbAsyncInit = function() {
      const { FB } = window

      FB.init({
        appId,
        xfbml: true,
        version: 'v2.10'
      })
      FB.AppEvents.logPageView()
    }
    ;(function(d, s, id) {
      const fjs = d.getElementsByTagName(s)[0]

      if (d.getElementById(id)) {
        return false
      }

      const js = d.createElement(s)

      js.id = id
      js.src = '//connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    })(document, 'script', 'facebook-jssdk')
  }
}

export default new ShareInit()
