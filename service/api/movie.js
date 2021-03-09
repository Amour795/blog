const Router = require('koa-router')
const mongoose = require('mongoose')
let router = new Router()

router.get('/getList', async (ctx) => {
  try {
    const Movie = mongoose.model('Movie')
    let result = await Movie.find({ 'name': '肖申克的救赎' }).exec()
    ctx.body = result
  } catch (error) {
    ctx.body = {
      code: 500,
      message: error
    }
  }
})

router.get('/getDetails', async (ctx) => {
  try {
    const MovieDetails = mongoose.model('MovieDetails')
    let result = await MovieDetails.find({ 'title': '肖申克的救赎' }).exec()
    ctx.body = result[0]
  } catch (error) {
    ctx.body = {
      code: 500,
      message: error
    }
  }
})


module.exports = router;