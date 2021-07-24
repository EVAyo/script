import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
// Vue.prototype.$DeviceType = 

// 重置全局样式
import './assets/css/reset.css'
// import './assets/js/commin.js'
new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
