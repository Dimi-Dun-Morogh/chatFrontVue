<template>
<div class="chats-list">
  <template v-for="(chat, index) in publicChats">
    <ChatListItem :chat="chat"
     :key="index"
     :is-selected="selectedChatId === chat._id"
      @selectChat="onChatSelect"
      />
     </template>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ChatListItem from './ChatListItem.vue';

export default {
  name: 'Chatslist',
  components: {
    ChatListItem,
  },
  computed: {
    ...mapGetters('chats', ['publicChats', 'selectedChatId']),
  },
  methods: {
    ...mapActions('chats', ['getPublicChats', 'selectChat']),
    onChatSelect(id) {
      this.selectChat(id);
    },
  },
  mounted() {
    this.getPublicChats();
  },

};

</script>

<style scoped>

</style>
