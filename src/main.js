import Vue from 'vue';
// import authGuard from '@/guards/auth.guard';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/plugins/elements-ui';
import SocketPlugin from './plugins/socket';
import passedTime from './filters/passedTime';

Vue.config.productionTip = false;
Vue.use(new SocketPlugin({
  url: process.env.VUE_APP_SOCKET_URL,
}));

Vue.filter('passedTime', passedTime);


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
