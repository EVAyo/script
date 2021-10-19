import Vue from 'vue';
import {
  Loading,
  Message,
  InfiniteScroll,
  CarouselItem,
  Carousel,
  Dialog
} from 'element-ui';

Vue.component(Message)
Vue.use(Dialog)
Vue.use(Loading);
Vue.use(InfiniteScroll)
Vue.use(CarouselItem)
Vue.use(Carousel)


Vue.prototype.$message = Message;
Vue.prototype.$loading = () => {
  window._loading = Loading.service({
    text: '加载中',
    background: 'rgba(0, 0, 0, 0.7)',
  });
};

Vue.prototype.$closeLoading = () => {
  window._loading.close();
};
