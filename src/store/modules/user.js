import mutations from '@/store/mutations';
import axios from '@/plugins/axios';
import router from '../../router';

const { USER } = mutations;

const userStore = {
  // namespaced: true,
  state: {
    user: {},
  },
  getters: {
    user: ({ user }) => user,
    fullName: ({ user }) => `${user.firstName || ''} ${user.lastName || ''}`,
  },
  mutations: {
    [USER](state, obj) {
      state.user = obj;
    },
  },
  actions: {
    setUserState: {
      handler({ dispatch }) {
        dispatch('getUserByMail');
      },
      root: true,
    },
    async getUserByMail({ commit }) {
      try {
        const res = await axios.get('/users/userbymail');
        commit(USER, res.data);
        // console.log('hi getUserByMail');
      } catch (error) {
        console.log(error);
      }
    },
    async createUserInfo({ dispatch }, data) {
      dispatch('setLoginLoader', true);
      try {
        const user = await axios.post('/users', data);
        dispatch(
          'loadMessage',
          {
            type: 'success',
            message: 'thank you for sharing info, you will be redirected to homepage',
            duration: 6000,
            showClose: true,
          },
          { root: true },
        );
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
    async updateUserInfo({ dispatch }, data) {
      dispatch('setLoginLoader', true);
      try {
        const user = await axios.post('/users/update-user', data);
        dispatch(
          'loadMessage',
          {
            type: 'success',
            message: 'Information updated succesfully',
            duration: 6000,
            showClose: true,
          },
          { root: true },
        );
        // setTimeout(() => {
        //   router.push({ name: 'Home' });
        // }, 6000);
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
