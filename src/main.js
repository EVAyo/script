import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入全局请求
import '@/assets/js/request.js'

import '@/plugins/element'
Vue.config.productionTip = false
// Vue.prototype.$DeviceType =

import waterfall from "vue-waterfall2";
//瀑布流插件

// 重置全局样式
import './assets/css/reset.css'
// import './assets/js/commin.js'

Vue.use(waterfall)


new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
// Vue.prototype.$request = axios;
