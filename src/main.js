import Vue from 'vue';
// import authGuard from '@/guards/auth.guard';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/plugins/elements-ui';
import SocketPlugin from './plugins/socket';

Vue.config.productionTip = false;
Vue.use(new SocketPlugin({
  url: process.env.VUE_APP_SOCKET_URL,
}));

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
