const Router = require('koa-router')
const mongoose = require('mongoose')
let router = new Router()

const cheerio = require('cheerio')
const superagent = require('superagent')
const charset = require('superagent-charset')
const fs = require('fs')
charset(superagent);


router.get('/getList', async (ctx) => {
  try {
    const Movie = mongoose.model('Movie')
    let { page = 1, size = 12 } = ctx.request.query
    let options = { limit: Number(size), skip: (page - 1) * size };
    let result = await Movie.find({}).skip(options.skip).limit(options.limit)
    let total = await Movie.find({}).countDocuments({})
    ctx.body = {
      list: result,
      total: total
    }
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
    let { id } = ctx.request.query
    let result = await MovieDetails.find({ 'id': id }).exec()
    ctx.body = result[0]
  } catch (error) {
    ctx.body = {
      code: 500,
      message: error
    }
  }
})

router.get('/update', async (ctx) => {
  try {
    let { endPage = 1 } = ctx.request.query
    ctx.body = true
    let url = 'https://www.cilixiong.com/movie',
      start = 1,
      end = endPage || 1;
    let getMovie = async (url, start, end) => {
      let _url = ''
      if (start === 1) {
        _url = `${url}/index.html`
      } else {
        _url = `${url}/index_${start}.html`
      }
      superagent.get(_url)
        .charset('utf-8') //当前页面编码格式
        .buffer(true)
        .timeout({
          response: 5000,  // Wait 5 seconds for the server to start sending,
          deadline: 60000, // but allow 1 minute for the file to finish loading.
        })
        .retry(100)
        .end(async (err, sres) => {
          if (sres.statusCode == 200) {
            //用cheerio解析页面数据
            let $ = cheerio.load(sres.text);
            //下面类似于jquery的操作，前端的小伙伴们肯定很熟悉啦
            $(".masonry__container .masonry__item .text-block").each(async (index, element) => {
              let hrefArr = $(element)[0].attribs.href.split('.html')[0].split('/')
              let obj = {
                AlsoknownAs: '',
                typs: '',
                duration: '',
                showArea: '',
                id: hrefArr[hrefArr.length - 1],
                imgName: '',
                imgSrc: $(element).find('img')[0].attribs.src,
                name: $(element).find('img')[0].attribs.alt,
                year: $(element).find('figcaption .type--fine-print').text(),
                grade: $(element).find('figcaption .tag-picture2').text()
              }
              let _childrenNode = $(element).find('figcaption p')[0].children
              for (let i = 0; i < _childrenNode.length; i++) {
                switch (i) {
                  case 0:
                    obj.AlsoknownAs = _childrenNode[i].data.split('又名：')[1].split(' / ').filter(item => item)
                    break;
                  case 2:
                    obj.typs = _childrenNode[i].data.split('类型：')[1].split('|').filter(item => item)
                    break;
                  case 4:
                    obj.duration = _childrenNode[i].data.split('片长：')[1].split(' / ').filter(item => item)
                    break;
                  case 6:
                    obj.showArea = _childrenNode[i].data.split('上映地区：')[1].split(' / ').filter(item => item)
                    break;
                }
              }
              const Movie = mongoose.model('Movie')
              let result = await Movie.find({ 'id': obj.id }).exec()
              if (!result.length) {
                let newMovie = new Movie(obj)
                await newMovie.save().then(() => {
                  getMovieDetail(obj.id)
                })
              }
            });
            if (end >= start) {
              getMovie(url, start + 1, end)
            }
          }
        })
    }

    let getMovieDetail = (id) => {

      let _url = `${url}/${id}.html`
      superagent.get(_url)
        .charset('utf-8') //当前页面编码格式
        .buffer(true)
        .timeout({
          response: 5000,  // Wait 5 seconds for the server to start sending,
          deadline: 60000, // but allow 1 minute for the file to finish loading.
        })
        .retry(100)
        .end(async (err, sres) => { //页面获取到的数据
          if (sres.statusCode == 200) {
            //用cheerio解析页面数据
            let $ = cheerio.load(sres.text);
            let obj = {
              title: $('#movie-content .info-title').text(),
              info: $('.information-text').text(),
              id: id,
              magnetic: [],
              doubanScore: '',
              AlsoknownAs: '',
              year: '',
              typs: '',
              duration: '',
              showArea: '',
              toStar: '',
              updateTime: ''
            }
            $('#movie-content .tiny-title').each((index, el) => {
              let _text = $(el).text()
              switch (index) {
                case 0:
                  obj.doubanScore = _text.split('豆瓣评分: ')[1]
                  break;
                case 1:
                  obj.AlsoknownAs = _text.split('又名：')[1].split(' / ').filter(item => item)
                  break;
                case 2:
                  obj.year = _text.split('上映日期：')[1].split(' / ').filter(item => item)
                  break;
                case 3:
                  obj.typs = _text.split('类型：')[1].split('|').filter(item => item)
                  break;
                case 4:
                  obj.duration = _text.split('片长：')[1].split(' / ').filter(item => item)
                  break;
                case 5:
                  obj.showArea = _text.split('上映地区：')[1].split(' / ').filter(item => item)
                  break;
                case 6:
                  obj.toStar = _text.split('主演：')[1].split(' / ').filter(item => item)
                  break;
                case 7:
                  obj.updateTime = new Date(_text.split('最后更新于：')[1]).valueOf()
                  break;
              }
            })
            $('.tabs-container .picture-container .container').each((index, el) => {
              obj.magnetic.push({
                href: $(el).find('a')[0].attribs.href,
                name: $(el).find('a').text()
              })
            })
            const MovieDetails = mongoose.model('MovieDetails')
            let newMovieDetails = new MovieDetails(obj)
            await newMovieDetails.save()
          }
        })

    }
    getMovie(url, start, end)

  } catch (error) {
    ctx.body = {
      code: 500,
      message: error
    }
  }
})



module.exports = router;