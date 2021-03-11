// const webpack = require('webpack')
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: process.env.VUE_APP_BASE_URL, // 要访问的接口域名
        changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))
    config.resolve.alias.set('@views', resolve('src/views'))
    config.resolve.alias.set('@api', resolve('src/api'))
    config.resolve.alias.set('@utils', resolve('src/utils'))
    config.resolve.alias.set('@components', resolve('src/components'))
  }
}