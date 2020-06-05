<template>
  <div class="home">
    home
    <ElButton type="danger" @click="onClick"> Logout </ElButton>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions } from 'vuex';

export default {
  name: 'Home',
  components: {
  },
  methods: {
    ...mapActions('auth', ['logout']),
    async  onClick() {
      await this.logout();
      this.$router.push({ name: 'Login' });
    },
  },
};
</script>
