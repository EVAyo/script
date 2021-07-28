import axios from 'axios';
import Vue from 'vue';

const request = axios.create({ 
  // 设置baseUr地址
  // baseURL: '/api',
  // 定义统一的请求头部
  // headers: {
  //     "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
  // },
  // 配置请求超时时间
  timeout: 10000, 
});

// 增加响应拦截
request.interceptors.response.use(
  function (response) {
    // console.log(response);

    const {data, code,message} = response.data

    // console.log(data, code,message);
    // debugger
    if (code == '0') {
      return data;
    } else {
      throw new Error(JSON.stringify({ code, message }));
    }
  },
  function (error) {
    return Promise.reject(error);
  },
);


// const  request = async ({url,method='get',param})=>{

//       axios({
//       url: '/'+ url,
//       method,
//       param
//     }
//     ).then
// }

Vue.prototype.$request = request;