<template>
  <div class="login-form">
    <h1 class="login-form-title">Sign up</h1>
    <p class="login-form-description">Welcome to the live chat. Please sign up to join</p>
    <ElForm :model="formData" :rules="rules" @submit.native.prevent="onSubmit" ref="signUpForm">
      <ElFormItem label="Email" prop="email" size="small">
        <ElInput v-model="formData.email" />
      </ElFormItem>
      <ElFormItem label="Password" prop="password" size="small">
        <ElInput v-model="formData.password" type="password" :show-password="true" />
      </ElFormItem>
      <ElFormItem label="Password repeat" prop="passwordRepeat" size="small">
        <ElInput v-model="formData.passwordRepeat" type="password" :show-password="true" />
      </ElFormItem>
      <div class="form-action">
        <ElButton
          type="success"
          plain
          size="small"
          native-type="submit"
          :loading="loginInProgress"
        >Submit</ElButton>
      </div>
      <router-link :to="{name: 'Login'}">
        <el-button type="info" size="small" icon="el-icon-back">to Login</el-button>
        <!-- <ElLink type="info">Back to login page</ElLink> -->
      </router-link>
    </ElForm>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'SignUpForm',
  data() {
    const validatePassRep = (rule, value, callback) => {
      if (value !== this.formData.password) {
        callback(new Error("Two inputs don't match!"));
      } else {
        callback();
      }
    };
    return {
      formData: {
        email: '',
        password: '',
        passwordRepeat: '',
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
        password: [
          {
            required: true,
            message: 'Please provide password',
            trigger: 'blur',
          },
        ],
        passwordRepeat: [
          {
            validator: validatePassRep,
            trigger: 'blur',
            required: true,
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters('auth', ['loginInProgress', 'isLoggedIn', 'isFirstLogin']),
  },
  watch: {
    isFirstLogin: 'redirectToFirstLoginSetup',
  },
  methods: {
    ...mapActions('auth', ['signUp']),
    onSubmit() {
      this.$refs.signUpForm.validate((isValid) => {
        console.log(isValid);
        if (!isValid) return;
        this.signUp(this.formData);
        // if (!this.isLoggedIn) {
        //   this.$router.push({ name: 'Login' });
        // }
      });
    },
    redirectToFirstLoginSetup(val) {
      if (val) {
        console.log('firstlogin');
        this.$router.push({ name: 'FirstLoginSettings' });
      }
    },
  },
};
</script>
<style scoped>
.login-form-description {
  margin-bottom: 30px;
  color: rgba(0, 0, 0, 0.5);
  font-size: 14px;
}

.login-form {
  padding: 20px 80px;
  width: 350px;
}

.form-action {
  margin-top: 10px;
  margin-bottom: 30px;
}
</style>
