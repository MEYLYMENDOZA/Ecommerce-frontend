<template>
  <div class="login-page">
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from 'src/components/Auth/LoginForm.vue'

export default {
  name: 'LoginPage',
  components: {
    LoginForm
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background-color: #080710;
}
</style>
