
const Router = require('koa-router')
const mongoose = require('mongoose')
let router = new Router()


router.post('/save', async (ctx) => {
  //取得Model
  const Message = mongoose.model('Message')
  let { userId, userName } = ctx.state.user
  let newMessage = new Message({
    ...ctx.request.body,
    createTime: new Date(),
    userId,
    userName
  })
  await newMessage.save().then(() => {
    //成功返回code=200，并返回成功信息
    ctx.body = {
      code: 200,
      state: true,
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

router.get('/getList', async (ctx) => {
  try {
    const Message = mongoose.model('Message')
    let { articleId } = ctx.request.query
    let result = await Message.find({ articleId: articleId }).exec()
    let _list = await result.sort((a, b) => new Date(b.createTime).getTime() - new Date(a.createTime).getTime()).map(v => {
      return {
        createTime: v.createTime,
        articleId: v.articleId,
        content: v.content,
        userName: v.userName,
      }
    })
    ctx.body = _list
  } catch (error) {
    ctx.body = {
      code: 500,
      message: error
    }
  }
})

module.exports = router;