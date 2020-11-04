
const Router = require('koa-router')
let router = new Router()
const mongoose = require('mongoose')

router.get('/getArticleList', async (ctx) => {
    try {
        const Article = mongoose.model('Article')
        let result = await Article.find({ publish: false }).exec()
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