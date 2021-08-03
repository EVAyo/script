/*
 * @Author: maggot-code
 * @Date: 2021-08-02 22:21:50
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-08-03 12:43:53
 * @Description: file content
 */
module.exports = {
  devServer: {
    open: false,
    proxy: {
      '/api/px/douyin': {
        target: 'https://www.iesdouyin.com',
        secure: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api/px/douyin': '/'
        }
      },
      '/api/px/bilibili': {
        target: 'http://api.bilibili.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api/px/bilibili': '/'
        }
      },
      '/emoji': {
        target: 'https://meme-api.asoulfan.cn/',
        changeOrigin: true,
        pathRewrite: {
          '^/emoji': '/'
        }
      },
      '/api/cfj': {
        target: 'http://ilovemiku.cn:7123',
        changeOrigin: true,
        pathRewrite: {
          '^/api/cfj': '/cfj'
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