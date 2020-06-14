<template>
  <aside class="aside">
    <AsideUserInfo />
    <Chatslist/>
  </aside>
  <!-- /.aside -->
</template>

<script>
import AsideUserInfo from './AsideUserInfo.vue';
import Chatslist from './ChatsList.vue';

export default {
  name: 'Aside',
  components: {
    AsideUserInfo,
    Chatslist,
  },
};
</script>

<style scoped>
.aside {
  background-color: #7e57c2;
  box-shadow: 40px 0 80px rgba(105, 50, 201, 0.4);
  position: relative;
  z-index: 1;
}
</style>
