import Vue from 'vue';
// import authGuard from '@/guards/auth.guard';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/plugins/elements-ui';

Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
