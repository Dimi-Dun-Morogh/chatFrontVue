<template>
  <div>
    <h1 class="login-form-title">Reset password</h1>
    <p class="login-form-description"> Enter the email adress you used for registration</p>
    <ElForm :rules="rules"
      @submit.native.prevent="onSubmit"
      ref="resetForm"
      :model="formData"
    >
      <ElFormItem label="Email" prop="email" size="small">
        <ElInput v-model="formData.email" />
               <ElButton
        type="success"
        plain
        size="small"
        native-type="submit"
        id="btn"
        :loading="loginInProgress"
        >
        Reset Password
      </ElButton>
      </ElFormItem>
      <router-link :to="{name: 'Login'}">
         <el-button
         type="info"
         size="small"
         icon="el-icon-back"
         >to Login</el-button>
        <!-- <ElLink type="info">Back to login page</ElLink> -->
         </router-link>
    </ElForm>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ResetPwForm',
  data: () => ({
    formData: {
      email: '',
    },
    rules: {
      email: [
        {
          required: true,
          message: 'Please provide email address',
          trigger: 'blur',
        },
        {
          type: 'email',
          message: 'Please provide valid email address',
          trigger: 'blur',
        },
      ],
    },
  }),
  computed: {
    ...mapGetters('auth', ['loginInProgress']),
  },
  methods: {
    ...mapActions('auth', ['reset']),
    onSubmit() {
      this.$refs.resetForm.validate((isValid) => {
        console.log(isValid);
        console.log(this.formData.email);
        if (!isValid) return;
        this.reset(this.formData.email);
      });
    },
  },
};
</script>
<style scoped>
#btn {
  margin-top: 10px;
}
.login-form-description {
  margin-bottom: 30px;
  color: rgba(0,0,0,0.5 );
  font-size: 14px;
}
</style>
