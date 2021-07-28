module.exports = {
  devServer: {
    open: false,
    proxy: {
      '/douyin': {
        target: 'https://www.iesdouyin.com',
        secure: true,
        changeOrigin: true,
        pathRewrite: {
          '^/douyin': '/'
        }
      },
      '/bilibili': {
        target: 'http://api.bilibili.com',
        changeOrigin: true,
        pathRewrite: {
          '^/bilibili': '/'
        }
      },
      '/emoji': {
        target: 'https://meme-api.asoulfan.cn/',
        changeOrigin: true,
        pathRewrite: {
          '^/emoji': '/'
        }
      },
      '/api': {
        target: 'https://support-api.asoulfan.cn/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}