import mutations from '@/store/mutations';
import axios from '@/plugins/axios';
import router from '../../router';

const { USER } = mutations;

const userStore = {
  // namespaced: true,
  state: {
    user: null,
  },
  getters: {
    user: ({ user }) => user,
  },
  mutations: {
    [USER](state, obj) {
      state.user = obj;
    },
  },
  actions: {
    setUserState: {
      handler({ commit }, user) {
        commit(USER, user);
      },
      root: true,
    },
    async getUserByMail({ commit }) {
      try {
        const user = await axios.get('/users/userbymail');
        commit(USER, user.data);
        console.log('hi getUserByMail');
      } catch (error) {
        console.log(error);
      }
    },
    async createUserInfo({ dispatch }, data) {
      dispatch('setLoginLoader', true);
      try {
        const user = await axios.post('/users', data);
        dispatch('loadMessage', {
          type: 'success',
          message: 'thank you for sharing info, you will be redirected to homepage',
          duration: 6000,
          showClose: true,
        }, { root: true });
        setTimeout(() => {
          router.push({ name: 'Home' });
        }, 6000);
        console.log(user);
      } catch (error) {
        console.log(error);
      } finally {
        dispatch('setLoginLoader', false);
      }
    },
  },
};

export default userStore;
