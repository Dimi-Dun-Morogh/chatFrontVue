<template>
  <div class="first-setup-form-wrap">
    <ElCard class="first-setup-form">
      <div slot="header" class="clearfix">
        <h6 class="card-title">Welcome!</h6>
        <p class="card-description">You can update your info here</p>
      </div>
      <ElForm :model="formData" @submit.native.prevent="onSubmit" ref="settingsForm">
        <ElFormItem label="First Name" prop="firstName" size="small">
          <ElInput type="text"
          v-model="formData.firstName"
           />
        </ElFormItem>
        <ElFormItem label="Last Name" prop="lastName" size="small">
          <ElInput type="text" v-model="formData.lastName" />
        </ElFormItem>
        <ElFormItem label="Country" prop="country" size="small">
          <ElInput type="text" v-model="formData.country" />
        </ElFormItem>
        <ElFormItem label="City" prop="city" size="small">
          <ElInput type="text" v-model="formData.city" />
        </ElFormItem>
        <ElButton native-type="submit" type="primary" :loading="loginInProgress">Update</ElButton>
        <!-- {{ user.firstName }} -->
      </ElForm>
    </ElCard>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'UpdateInfoForm',
  data: () => ({
    formData: {
      firstName: '',
      lastName: '',
      country: '',
      city: '',
    },
  }),
  computed: {
    ...mapGetters('auth', ['loginInProgress']),
    ...mapGetters(['user']),
  },
  watch: {
    user: 'placeHolders',
  },
  methods: {
    ...mapActions(['updateUserInfo']),
    placeHolders() {
      this.formData.firstName = this.user.firstName;
      this.formData.lastName = this.user.lastName;
      this.formData.country = this.user.country;
      this.formData.city = this.user.city;
    },
    onSubmit() {
      this.updateUserInfo({ ...this.formData, email: this.user.email });
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
