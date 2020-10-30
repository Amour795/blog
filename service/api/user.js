
const Router = require('koa-router')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
let router = new Router()


router.post('/register', async (ctx) => {
    //取得Model
    const User = mongoose.model('User')
    //把从前端接收的POST数据封装成一个新的user对象
    let newUser = new User(ctx.request.body)
    //用mongoose的save方法直接存储，然后判断是否成功，返回相应的结果
    await newUser.save().then(() => {
        //成功返回code=200，并返回成功信息
        ctx.body = {
            code: 200,
            message: '注册成功'
        }
    }).catch(error => {
        //失败返回code=500，并返回错误信息
        ctx.body = {
            code: 500,
            message: error
        }
    })
})

/*登录的实践 */
router.post('/login', async (ctx) => {
    //得到前端传递过来的数据
    let loginUser = ctx.request.body
    let userName = loginUser.userName
    let password = loginUser.password
    //引入User的model
    const User = mongoose.model('User')
    //查找用户名是否存在，如果存在开始比对密码
    await User.findOne({ userName: userName }).exec().then(async (result) => {
        if (result) {
            //当用户名存在时，开始比对密码
            let newUser = new User()  //因为是实例方法，所以要new出对象，才能调用
            await newUser.comparePassword(password, result.password)
                .then((isMatch) => {
                    if (isMatch) {
                        // 写入token的信息
                        const userToken = {
                            userName: result.userName,
                            userId: result._id,
                            date: new Date().getTime()
                        }
                        // 签发Token 1小时后过期
                        const token = jwt.sign(userToken, 'Amour795', { expiresIn: '1h' })
                        jwt.sign({}, 'Amour795')
                        ctx.body = {
                            userName: result.userName,
                            userId: result._id,
                            status: isMatch,
                            token: token
                        }
                    }
                    else {
                        ctx.body = { code: 200, status: isMatch, message: !isMatch ? '用户名或密码错误' : '' }
                    }
                })
                .catch(error => {
                    //出现异常，返回异常
                    ctx.body = { code: 200, status: false, message: error }
                })
        } else {
            ctx.body = { code: 200, message: '用户名不存在' }
        }

    }).catch(error => {
        ctx.body = { code: 500, message: error }
    })
})

module.exports = router;