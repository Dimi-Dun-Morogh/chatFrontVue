<template>
  <div class="first-setup-form-wrap">
    <ElCard class="first-setup-form">
      <div slot="header" class="clearfix">
        <h6 class="card-title">Welcome!</h6>
        <p class="card-description">You can update your info here</p>
      </div>
      <ElForm :model="formData" @submit.native.prevent="onSubmit" ref="updatePassForm"
      :rules="rules">
        <ElFormItem label="old password" prop="oldpassword" size="small">
          <ElInput type="password"
          v-model="formData.oldpassword"
           />
        </ElFormItem>
        <ElFormItem label="New Password" prop="password" size="small">
          <ElInput type="password" v-model="formData.password"
          :show-password="true"  />
        </ElFormItem>
        <ElFormItem label="Repeat New Password" prop="passwordRepeat" size="small">
          <ElInput type="password" v-model="formData.passwordRepeat"
          :show-password="true"  />
        </ElFormItem>
        <ElButton native-type="submit" type="primary" :loading="loginInProgress">Update</ElButton>
      </ElForm>
    </ElCard>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ChangePasswordForm',
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
        oldpassword: '',
        password: '',
        passwordRepeat: '',
      },
      rules: {
        oldpassword: [
          {
            // required: true,
            message: 'Please provide password',
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
    ...mapGetters('auth', ['loginInProgress']),
  },
  watch: {
  },
  methods: {
    ...mapActions('auth', ['oldPasswordCheck']),
    onSubmit() {
      this.$refs.updatePassForm.validate((isValid) => {
        if (!isValid) return;
        console.log(isValid);
        console.log(this.formData.oldpassword);
        this.oldPasswordCheck({
          oldPassword: this.formData.oldpassword,
          newPassword: this.formData.password,
        });
      });
    },
  },
};
</script>

<style scoped>
.first-setup-form-wrap {
  position: relative;
  /* max-width: 500px; */
  /* width: 500px; */
}

.card-title {
  font-size: 20px;
  text-transform: uppercase;
}
.card-description {
  margin-top: 10px;
  color: gray;
  letter-spacing: 0.7px;
}
</style>
