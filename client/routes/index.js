// import { injectReducer } from 'reducers'
import createContainer from 'utils/createContainer'
// import userAuth from 'utils/userAuth' // 用户访问拦截器

// Hook for server
// if (typeof require.ensure !== 'function') {
//   require.ensure = function(dependencies, callback) {
//     // 避免前后端渲染差异， require.ensure加载的交给前端渲染
//     callback(require)
//   }
// }

export default [
  {
    path: 'browserError',
    getComponent(nextState, cb) {
      /* 组件连接 state */
      const BrowserErrorContainer = createContainer(({ userData }) => {
        return { userData }
      })(require('components/BrowserError'))

      cb(null, BrowserErrorContainer)
    }
  },
  {
    path: 'account',

    indexRoute: {
      getComponent(nextState, cb) {
        /* 组件连接 state */
        const LoginContainer = createContainer(
          ({ globalData }) => {
            return { loading: globalData.loading }
          }, // mapStateToProps,
          require('actions/account').default // mapActionCreators,
        )(require('containers/account/LoginPage'))
        // 木偶组件

        cb(null, LoginContainer)
      }
    },
    childRoutes: [
      {
        // 对应 /order/detail/:orderId
        path: 'register',
        getComponent(nextState, cb) {
          /* 组件连接 state */
          const RegisterContainer = createContainer(
            ({ globalData }) => {
              return { loading: globalData.loading }
            }, // mapStateToProps,
            require('actions/account').default // mapActionCreators,
          )(require('containers/account/RegisterPage'))
          // 木偶组件

          cb(null, RegisterContainer)
        }
      }
    ]
  }
]
