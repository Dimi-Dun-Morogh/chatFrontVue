import mutations from '@/store/mutations';
import axios from '@/plugins/axios';

const {
  PUBLIC_CHATS, SELECT_CHAT_ID, CURRENT_CHAT, CURRENT_CHAT_MSGS, NEW_MSG,
} = mutations;

const chatsStore = {
  namespaced: true,
  state: {
    publicChats: [],
    selectedChatId: '',
    currentChat: null,
    currentChatMessages: [],
  },
  mutations: {
    [PUBLIC_CHATS](state, arr) {
      state.publicChats = arr;
    },
    [SELECT_CHAT_ID](state, str) {
      state.selectedChatId = str;
    },
    [CURRENT_CHAT](state, obj) {
      state.currentChat = obj;
    },
    [CURRENT_CHAT_MSGS](state, arr) {
      state.currentChatMessages = arr;
    },
    [NEW_MSG](state, msg) {
      state.currentChatMessages.push(msg);
    },
  },
  getters: {
    publicChats: ({ publicChats }) => publicChats,
    selectedChatId: ({ selectedChatId }) => selectedChatId,
    currentChat: ({ currentChat }) => currentChat,
    currentChatMessages: ({ currentChatMessages }) => currentChatMessages,
  },
  actions: {
    async getPublicChats({ commit }) {
      try {
        const res = await axios.get('/chats/public');
        commit(PUBLIC_CHATS, res.data);
        // console.log('hi getUserByMail');
      } catch (error) {
        console.log(error);
      }
    },
    async getSelectedChat({ commit }, id) {
      try {
        const res = await axios.get(`/chats/${id}`);
        commit(CURRENT_CHAT, res.data);
      } catch (error) {
        console.log(error);
      }
    },
    async getSelectedChatMessages({ commit }, id) {
      try {
        const res = await axios.get(`/messages/chat/${id}`);
        commit(CURRENT_CHAT_MSGS, res.data);
      } catch (error) {
        console.log(error);
        commit(CURRENT_CHAT_MSGS, []);
      }
    },
    selectChat({ commit, dispatch }, id) {
      commit(SELECT_CHAT_ID, id);
      dispatch('getSelectedChatMessages', id);
      dispatch('getSelectedChat', id);
    },
    newMessage({ commit }, msg) {
      commit(NEW_MSG, msg);
    },
  },
};

export default chatsStore;
