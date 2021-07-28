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
      },

      '/emoji':{
        target:'https://meme-api.asoulfan.cn/?page=1&limit=5',
        changeOrigin:true,
        pathRewrite:{
          '^/emoji':'/'

    }
  },
      // 时间线
      '/aSoul': {
        target: 'https://support-api.asoulfan.cn',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/aSoul': '/api'
        }
      },
    }}}
