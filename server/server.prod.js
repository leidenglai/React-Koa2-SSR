import 'babel-polyfill'
import 'isomorphic-fetch'
import serve from 'koa-static'
import path from 'path'
import views from 'koa-views'
import app from './app'
import router from './routes'
import clientRoute from './middlewares/clientRoute'
import packBody from './middlewares/packBody'
import handle404 from './middlewares/handle404'

import './middlewares/mongooseLog'
import './models'

// 设置全局变量
global.__DEV__ = process.env.NODE_ENV.trim() === 'development'
global.__PROD__ = process.env.NODE_ENV.trim() === 'production'

global.__COMPONENT_DEVTOOLS__ = false

const port = process.env.port || 3000

app.use(views(path.resolve(__dirname, '../views/prod'), { map: { html: 'ejs' } }))
app.use(serve(path.resolve(__dirname, '../dist/client')))
app.use(clientRoute)
app.use(router.routes())
app.use(packBody) // 处理body返回
app.use(router.allowedMethods())
app.use(handle404) // 处理404
app.listen(port)
console.log(
  `\n==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.\n`
)
