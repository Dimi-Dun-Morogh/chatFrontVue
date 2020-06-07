import Vue from 'vue';
import Vuex from 'vuex';
import firebase from '@/plugins/firebase';
import auth from './modules/auth';
import { getUserIdToken } from '../services/firebase/auth.service';
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


firebase.auth().onAuthStateChanged(async (userData) => {
  console.log('onAuthStateChanged', userData);
  store.dispatch('setUserState', userData);
  store.dispatch('setIsLoggedInState', Boolean(userData));
  if (userData) {
    const token = await getUserIdToken();
    localStorage.setItem(process.env.VUE_APP_LS_TOKEN_KEY, token);
  } else {
    localStorage.removeItem(process.env.VUE_APP_LS_TOKEN_KEY);
  }
});

authGuard(store);

export default store;
