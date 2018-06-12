import Router from 'koa-router'
import user from '../controllers/user'
import checkAuth from '../middlewares/checkAuth'

const router = new Router({ prefix: '/user' })

// 测试接口
router.get('/getSharekey', checkAuth, user.getSharekey)

// 获取用户信息
router.get('/getSellerBaseProfile', checkAuth, user.getSellerBaseProfile)

// 登录
router.get('/login', user.login)

// 注册
router.post('/register', user.registerUser)

export default router
