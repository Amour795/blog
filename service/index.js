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


// jwt 鉴权登录超时
app.use(async (ctx, next) => {
    var token = ctx.headers.authorization;
    if (token) {
        await jwt.verify(token.split(' ')[1], 'Amour795', (err, { isAdmin }) => {
            // if (!isAdmin) {
            //     ctx.status = 401;
            //     // ctx.body = {
            //     //     status: 401,
            //     //     msg: '您不是系统管理员，没有权限操作'
            //     // }
            // }
        })
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

let user = require('./api/user.js'),
    article = require('./api/article.js'),
    admin = require('./api/admin.js'),
    files = require('./api/files.js'),
    message = require('./api/message.js'),
    movie = require('./api/movie.js')

router.use('/api/user', user.routes())
    .use('/api/article', article.routes())
    .use('/api/admin', admin.routes())
    .use('/api/files', files.routes())
    .use('/api/message', message.routes())
    .use('/api/movie', movie.routes())

app.use(router.routes())
    .use(serve(path.join(__dirname)))
    .use(router.allowedMethods())

app.listen(3000, () => {
    console.log('[Server] starting at port 3000')
})

