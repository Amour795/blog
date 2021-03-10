const Router = require('koa-router')
const mongoose = require('mongoose')
let router = new Router()

router.get('/getList', async (ctx) => {
  try {
    const Movie = mongoose.model('Movie')
    let { page = 1, size = 12 } = ctx.request.query
    let options = { limit: Number(size), skip: (page - 1) * size };
    let result = await Movie.find({}).skip(options.skip).limit(options.limit)
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
    let { id  } = ctx.request.query
    let result = await MovieDetails.find({ 'id': id }).exec()
    ctx.body = result[0]
  } catch (error) {
    ctx.body = {
      code: 500,
      message: error
    }
  }
})


module.exports = router;