module.exports = {
  devServer: {
    open:false,
    proxy:{
      '/douyin':{
        target:'https://www.iesdouyin.com',
        secure:true,
        changeOrigin:true,
        pathRewrite:{
          '^/douyin':'/'
        }
      },
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