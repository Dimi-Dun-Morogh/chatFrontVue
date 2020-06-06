<template>
 <div class="wrapper">
   <div class="reset-pw-container">
     <div class="img-wrap">
       <img src="@/assets/login-page-bg.png" alt="logo">
       </div>

     <div class="form-wrap">
     <ResetPwForm  />
     </div>
   </div>

 </div>
</template>

<script>
import ResetPwForm from '@/components/ResetPwForm.vue';

export default {
  name: 'ForgotPassword',
  components: {
    ResetPwForm,
  },
};

</script>
<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  min-height: 780px;
  background-color: #D5E4E4;
}
.reset-pw-container {
   width: 100%;
  max-width: 1000px;
  display:flex;
  height: 600px;
  border-radius: 20px;
  background-color: #fff;
  overflow: hidden;
}
.img-wrap{
  height: 100%;
  overflow: hidden;
}
.img-wrap img {
    display: block;
    height: 100%;
  transform: scale(1.2);
}
.form-wrap {
  align-self: center;
  padding: 0px 80px;
  width:350px;
}
</style>
