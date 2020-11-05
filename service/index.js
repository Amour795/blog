const Koa = require('koa')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const path = require('path')
const koa_jwt = require('koa-jwt')
const serve = require('koa-static')
const { connect, initSchemas } = require('./database/init.js')
const app = new Koa()
    //立即执行函数
    ; (async () => {
        await connect()
        initSchemas()
    })()
// 解析body
const bodyParser = require('koa-bodyparser')
app.use(bodyParser());
// 解决跨域
const cors = require('koa2-cors')
app.use(cors())
//路由
const Router = require('koa-router')
let router = new Router();

let user = require('./api/user.js')
let article = require('./api/article.js');
let admin = require('./api/admin.js');
let files = require('./api/files.js');
router.use('/user', user.routes())
    .use('/article', article.routes())
    .use('/admin', admin.routes())
    .use('/files', files.routes())
// jwt 鉴权登录超时
app.use(async (ctx, next) => {
    var token = ctx.headers.authorization;
    if (token) {
        let userInfo = jwt.verify(token.split(' ')[1], 'Amour795', () => { })
        ctx.state = {
            data: userInfo
        };
    }
    await next();
})
// jwt 鉴权登录超时
app.use(async (ctx, next) => {
    return next().catch((err) => {
        if (401 == err.status) {
            ctx.status = 401;
            ctx.body = {
                status: 401,
                msg: '登录过期，请重新登录'
            }
        } else {
            throw err;
        }
    });
});
// jwt 鉴权登录超时
app.use(koa_jwt({
    secret: 'Amour795'
}).unless({
    path: [/\/user/, /\/article/, /\/files/, /\/upload/]
}));

app.use(router.routes())
    .use(serve(path.join(__dirname)))
    .use(router.allowedMethods())

app.listen(3000, () => {
    console.log('[Server] starting at port 3000')
})

