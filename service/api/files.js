
const Router = require('koa-router')
const fs = require('fs');
const path = require('path')
const koaBody = require('koa-body')
const moment = require('moment')
let router = new Router()

router.post('/uploadFiles',
  koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 2000 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
    }
  })
  , async (ctx) => {
    try {
      // 上传单个文件
      const file = ctx.request.files.file; // 获取上传文件
      let newFileName = `${moment(new Date()).format('YYYY-M-D k:m:s')}-${Math.floor(Math.random()*1000)}.${file.name.split('.').pop().toLowerCase()}`
      let filePath = path.join('./upload', newFileName)
      // 创建可读流
      const reader = fs.createReadStream(file.path);
      // 创建可写流
      const upStream = fs.createWriteStream(filePath);
      const pro = new Promise((resolve, reject) => {
        var stream = reader.pipe(upStream);
        stream.on('finish', function () {
          resolve(`/upload/${newFileName}`);
        });
      })
      return ctx.body = {
        code: 200,
        url: await pro
      }

    } catch (error) {
      ctx.body = { code: 500, message: error }
    }
  })

module.exports = router;