import mutations from '@/store/mutations';
import { firebaseLogin, firebaseLogout } from '@/services/firebase/auth.service';

const {
  IS_LOGGED_IN,
  LOGIN_LOADER,
} = mutations;

const authStore = {
  namespaced: true,
  state: {
    isLoggedIn: false,
    loginInProgress: false,
  },
  getters: {
    isLoggedIn: ({ isLoggedIn }) => isLoggedIn,
    loginInProgress: ({ loginInProgress }) => loginInProgress,
  },
  mutations: {
    [IS_LOGGED_IN](state, bool) {
      state.isLoggedIn = bool;
    },
    [LOGIN_LOADER](state, bool) {
      state.loginInProgress = bool;
    },
  },
  actions: {
    setIsLoggedInState: {
      handler({ commit }, bool) {
        commit(IS_LOGGED_IN, bool);
      },
      root: true,
    },
    async login({ commit, dispatch }, { email, password }) {
      console.log(email, password);
      // context.commit -вызов мутации
      // context.dispatch  - диспатч вызывает экшн
      try {
        commit(LOGIN_LOADER, true);
        await firebaseLogin(email, password);
      } catch (error) {
        dispatch('loadMessage', {
          type: 'error',
          message: error.message,
          duration: 6000,
          showClose: true,
        }, { root: true });
      } finally {
        commit(LOGIN_LOADER, false);// выключаем буль прелодера
      }
    },
    async logout() {
      // context.commit -вызов мутации
      // context.dispatch  - диспатч вызывает экшн
      try {
        await firebaseLogout();
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default authStore;
