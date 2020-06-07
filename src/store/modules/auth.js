import mutations from '@/store/mutations';
import {
  firebaseLogin, firebaseLogout, firebaseReset, firebaseSignUp,
} from '@/services/firebase/auth.service';

const {
  IS_LOGGED_IN,
  LOGIN_LOADER,
  IS_FIRST_LOGIN,
} = mutations;

const authStore = {
  namespaced: true,
  state: {
    isLoggedIn: Boolean(localStorage.getItem('vue_app_token')),
    loginInProgress: false,
    isFirstLogin: false,
  },
  getters: {
    isLoggedIn: ({ isLoggedIn }) => isLoggedIn,
    loginInProgress: ({ loginInProgress }) => loginInProgress,
    isFirstLogin: ({ isFirstLogin }) => isFirstLogin,
  },
  mutations: {
    [IS_LOGGED_IN](state, bool) {
      state.isLoggedIn = bool;
    },
    [LOGIN_LOADER](state, bool) {
      state.loginInProgress = bool;
    },
    [IS_FIRST_LOGIN](state, bool) {
      state.isFirstLogin = bool;
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
    async reset({ commit, dispatch }, email) {
      commit(LOGIN_LOADER, true);
      console.log(`email is ${email}`);
      try {
        await firebaseReset(email);
        dispatch('loadMessage', {
          type: 'success',
          message: 'password reset link sent to your email',
          duration: 6000,
          showClose: true,
        }, { root: true });
      } catch (error) {
        dispatch('loadMessage', {
          type: 'error',
          message: error.message,
          duration: 6000,
          showClose: true,
        }, { root: true });
        console.log(error);
      } finally {
        commit(LOGIN_LOADER, false);// выключаем буль прелодера
      }
    },
    async signUp({ commit, dispatch }, { email, password }) {
      commit(LOGIN_LOADER, true);
      try {
        const data = await firebaseSignUp(email, password);
        commit(IS_FIRST_LOGIN, data.additionalUserInfo.isNewUser);
        console.log(`first login is ${data.additionalUserInfo.isNewUser}`);
        dispatch('loadMessage', {
          type: 'success',
          message: 'user registration success',
          duration: 6000,
          showClose: true,
        }, { root: true });
      } catch (error) {
        dispatch('loadMessage', {
          type: 'error',
          message: error.message,
          duration: 6000,
          showClose: true,
        }, { root: true });
        console.log(error);
      } finally {
        commit(LOGIN_LOADER, false);// выключаем буль прелодера
      }
    },
  },
};

export default authStore;
