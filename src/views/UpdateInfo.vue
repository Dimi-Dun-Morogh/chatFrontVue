<template>
  <div class="update-info-wrap">
      <el-tabs v-model="activeName" type="border-card" class="tab-cont" >
    <el-tab-pane label="Edit Info" name="first"  class="tab-cont">
      <UpdateInfoForm />
    </el-tab-pane>
    <el-tab-pane label="Update Password" name="second">
      <ChangePasswordForm />
    </el-tab-pane>
  </el-tabs>
          <router-link :to="{name: 'Home'}">
         <el-button
         id="btn"
         type="info"
         size="small"
         icon="el-icon-back"
         >to Home</el-button>
        <!-- <ElLink type="info">Back to login page</ElLink> -->
         </router-link>
  </div>
</template>

<script>
import UpdateInfoForm from '@/components/UpdateInfoForm.vue';
import ChangePasswordForm from '@/components/ChangePasswordForm.vue';

export default {
  name: 'UpdateInfo',
  components: {
    UpdateInfoForm,
    ChangePasswordForm,
  },
  data: () => ({
    activeName: 'first',
  }),
  methods: {
    // handleClick(tab, event) {
    //   console.log(tab, event);
    // },
  },
};
</script>
<style scoped>
.update-info-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
}

.tab-cont >>> .el-tabs__content{
  padding: 0px !important;
}

#btn {
  align-self: center;
  margin-top: 10px;
}
</style>
