// const webpack = require('webpack')
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  chainWebpack:config=>{
    config.resolve.alias.set('@', resolve('src'))
    config.resolve.alias.set('@views', resolve('src/views'))
    config.resolve.alias.set('@api', resolve('src/api'))
    config.resolve.alias.set('@utils', resolve('src/utils'))
    config.resolve.alias.set('@components', resolve('src/components'))
    
  }
}