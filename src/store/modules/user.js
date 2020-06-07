import mutations from '@/store/mutations';
import axios from '@/plugins/axios';

const { USER } = mutations;

const userStore = {
  namespaced: true,
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
        // dispatch getUser, user.email
      },
      root: true,
    },
    // async getUser({commit}, email) {
    //   try {
    //     // const user = await axios.get('/users/${email}');
    //     // commit(user,user)
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    async createUserInfo(context, data) {
      try {
        const user = await axios.post('/users', data);
        console.log(user);
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default userStore;
