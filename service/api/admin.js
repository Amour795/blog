
const Router = require('koa-router')
let router = new Router()
const mongoose = require('mongoose')

router.post('/save', async (ctx) => {
    //取得Model
    const Article = mongoose.model('Article')
    //把从前端接收的POST数据封装成一个新的user对象
    let newUArticle = new Article(ctx.request.body)
    //用mongoose的save方法直接存储，然后判断是否成功，返回相应的结果
    await newUArticle.save().then(() => {
        //成功返回code=200，并返回成功信息
        ctx.body = {
            code: 200,
            message: '保存成功'
        }
    }).catch(error => {
        //失败返回code=500，并返回错误信息
        ctx.body = {
            code: 500,
            message: error
        }
    })
})

router.get('/getArticleList', async (ctx) => {
    try {
        const Article = mongoose.model('Article')
        let result = await Article.find().exec()
        ctx.body = result.map(v => {
            return {
                id: v._id,
                content: v.content,
                createTime: v.createTime,
                updateTime: v.updateTime,
                imgList: v.imgList,
                tag: v.tag,
                title: v.title,
            }
        })
    } catch (error) {
        ctx.body = { code: 500, message: err }
    }
})

router.get('/getArticleById', async (ctx) => {
    try {
        const Article = mongoose.model('Article')
        let { id } = ctx.request.query
        let result = await Article.find({ '_id': id }).exec()
        ctx.body = result.map(v => {
            return {
                id: v._id,
                content: v.content,
                createTime: v.createTime,
                updateTime: v.updateTime,
                imgList: v.imgList,
                tag: v.tag,
                title: v.title,
            }
        })[0]
    } catch (error) {
        ctx.body = { code: 500, message: err }
    }
})

module.exports = router;