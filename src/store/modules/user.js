import mutations from '@/store/mutations';

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
      },
      root: true,
    },
  },
};

export default userStore;
