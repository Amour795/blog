const mongoose = require('mongoose')
const db = process.env.MONGODB
const glob = require('glob')
const { resolve } = require('path')
//引入所有的Schema文件
exports.initSchemas = () => {
    glob.sync(resolve(__dirname, './schema/', '**/*.js')).forEach(require)
}
let options = {
    authSource: 'admin',
    auto_reconnect: true,
    user: process.env.MONGONAME,
    pass: process.env.MONGOPWD,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}

//连接数据库
exports.connect = () => {
    //连接数据库
    mongoose.connect(db, options)

    let maxConnectTimes = 0

    return new Promise((resolve, reject) => {
        //把所有连接放到这里

        //增加数据库监听事件
        mongoose.connection.on('disconnected', () => {
            console.log('***********数据库断开***********')
            if (maxConnectTimes < 3) {
                maxConnectTimes++
                mongoose.connect(db, options)
            } else {
                reject()
                throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
            }

        })

        mongoose.connection.on('error', err => {
            console.log('***********数据库错误***********')
            if (maxConnectTimes < 3) {
                maxConnectTimes++
                mongoose.connect(db, options)
            } else {
                reject(err)
                throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
            }

        })
        //链接打开的时
        mongoose.connection.once('open', () => {
            console.log('MongoDB connected successfully')
            resolve()
        })

    })

}

