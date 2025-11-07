<template>
  <div class="register-page">
    <RegisterForm />
  </div>
</template>

<script>
import RegisterForm from 'src/components/Auth/RegisterForm.vue'

export default {
  name: 'RegisterPage',
  components: {
    RegisterForm
  }
}
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  background-color: #080710;
}
</style>
