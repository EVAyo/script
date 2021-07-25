module.exports = {
  devServer: {
    https:false,
    open:false,
    proxy:{
      '/api':{
        target:'http://api.bilibili.com',
        changeOrigin:true,
        pathRewrite:{
          '^/api':'/'
        }
      }
    }
  }
}