import Vue from 'vue';
import Vuex from 'vuex';
import firebase from '@/plugins/firebase';
import router from '@/router';
import auth from './modules/auth';
import notify from './modules/notify';
// import authGuard from '../guards/auth.guard';

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
  },
});


firebase.auth().onAuthStateChanged((user) => {
  console.log('onAuthStateChanged', user);
  store.dispatch('setIsLoggedInState', Boolean(user));
  if (user) {
    router.push({ name: 'Home' });
  }
});

// authGuard();

export default store;
