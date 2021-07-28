import Vue from 'vue';
import {
  Loading,
  Message,
} from 'element-ui';

Vue.component(Message)
Vue.use(Loading);

Vue.prototype.$message = Message;
Vue.prototype.$loading = () => {
  window._loading = Loading.service({
    lock: true,
    text: '加载中',
    background: 'rgba(0, 0, 0, 0.7)',
  });
};

Vue.prototype.$closeLoading = () => {
  window._loading.close();
};
