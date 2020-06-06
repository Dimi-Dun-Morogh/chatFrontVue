import Vue from 'vue';
import Vuex from 'vuex';
import firebase from '@/plugins/firebase';
import router from '@/router';
import auth from './modules/auth';
import notify from './modules/notify';
import user from './modules/user';
import authGuard from '../guards/auth.guard';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    notify,
    user,
  },
});


firebase.auth().onAuthStateChanged((userData) => {
  console.log('onAuthStateChanged', userData);
  store.dispatch('setUserState', userData);
  store.dispatch('setIsLoggedInState', Boolean(userData));
  if (userData) {
    router.push({ name: 'Home' });
  }
});

authGuard(store);

export default store;
