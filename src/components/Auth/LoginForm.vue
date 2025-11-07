<template>
  <div class="login-container">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap" rel="stylesheet">
    
    <form @submit.prevent="handleLogin">
      <h3>Ecommerce App</h3>

      <label for="email">Usuario</label>
      <input 
        type="email" 
        placeholder="Email" 
        id="email"
        v-model="email"
        required
      >

      <label for="password">Contraseña</label>
      <input 
        type="password" 
        placeholder="Password" 
        id="password"
        v-model="password"
        required
        minlength="6"
      >

      <button type="submit" :disabled="loading">
        <span v-if="loading">Iniciando sesión...</span>
        <span v-else>Log In</span>
      </button>

      <div class="register-link">
        ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
      </div>

      <!-- Opcional: Redes sociales -->
      <!-- <div class="social">
        <div class="go"><i class="fab fa-google"></i>  Google</div>
        <div class="fb"><i class="fab fa-facebook"></i>  Facebook</div>
      </div> -->
    </form>
  </div>
</template>

<script>
import userService from 'src/services/userService'
import { useAuthStore } from 'src/stores/auth'
import { isValidEmail } from 'src/utils/validation'
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from 'src/constants'

export default {
  name: "LoginForm",
  data() {
    return {
      email: '',
      password: '',
      loading: false
    }
  },
  setup() {
    const authStore = useAuthStore()
    return { authStore }
  },
  methods: {
    /**
     * Valida el formulario antes de enviarlo
     */
    validateForm() {
      if (!isValidEmail(this.email)) {
        this.$q.notify({
          type: 'negative',
          message: 'Por favor ingresa un correo electrónico válido',
          position: 'top'
        })
        return false
      }

      if (this.password.length < 6) {
        this.$q.notify({
          type: 'negative',
          message: 'La contraseña debe tener al menos 6 caracteres',
          position: 'top'
        })
        return false
      }

      return true
    },

    /**
     * Maneja el inicio de sesión
     */
    async handleLogin() {
      if (!this.validateForm()) {
        return
      }

      this.loading = true

      try {
        console.log('Intentando iniciar sesión con:', this.email)
        
        const response = await userService.signIn(this.email, this.password)
        
        console.log('Respuesta del servidor:', response)

        // Guardar el usuario y token en el store
        this.authStore.setUser(response)

        this.$q.notify({
          type: 'positive',
          message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
          position: 'top'
        })

        console.log('Usuario autenticado:', this.authStore.user)
        console.log('Token:', this.authStore.token)

        // Redirigir inmediatamente
        this.$router.push('/')

      } catch (error) {
        console.error('Error al iniciar sesión:', error)

        let errorMessage = ERROR_MESSAGES.UNKNOWN_ERROR

        // Manejo específico de errores
        if (error.status === 401) {
          errorMessage = 'Credenciales incorrectas. Verifica tu email y contraseña.'
        } else if (error.status === 400) {
          errorMessage = 'Datos de inicio de sesión inválidos.'
        } else if (error.status === 0) {
          errorMessage = ERROR_MESSAGES.NETWORK_ERROR
        } else if (error.message) {
          errorMessage = error.message
        }
        
        this.$q.notify({
          type: 'negative',
          message: errorMessage,
          position: 'top',
          timeout: 3000
        })
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
*:before,
*:after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.login-container {
  background-color: #080710;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

form {
  height: 520px;
  width: 400px;
  background-color: rgba(255, 255, 255, 0.13);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 40px rgba(49, 131, 186, 0.6);
  padding: 50px 35px;
}

form * {
  font-family: 'Poppins', sans-serif;
  color: #030303;
  letter-spacing: 0.5px;
  outline: none;
  border: none;
}

form h3 {
  font-size: 32px;
  font-weight: 500;
  line-height: 42px;
  text-align: center;
}

label {
  display: block;
  margin-top: 30px;
  font-size: 16px;
  font-weight: 500;
}

input {
  display: block;
  height: 50px;
  width: 100%;
  background-color: rgba(10, 100, 118, 0.07);
  border-radius: 3px;
  padding: 0 10px;
  margin-top: 8px;
  font-size: 14px;
  font-weight: 300;
}

::placeholder {
  color: #000000;
}

button {
  margin-top: 50px;
  width: 100%;
  background-color: #3f77a0;
  color: #fdfdfd;
  padding: 15px 0;
  font-size: 18px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover:not(:disabled) {
  background-color: #2e5a7a;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.register-link {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #fdfdfd;
}

.register-link a {
  color: #3f77a0;
  text-decoration: none;
  font-weight: 600;
}

.register-link a:hover {
  text-decoration: underline;
}

.social {
  margin-top: 30px;
  display: flex;
}

.social div {
  background: rgb(194, 110, 180);
  width: 150px;
  border-radius: 3px;
  padding: 5px 10px 10px 5px;
  background-color: rgba(46, 123, 153, 0.27);
  color: #000000;
  text-align: center;
  cursor: pointer;
}

.social div:hover {
  background-color: rgba(255, 255, 255, 0.47);
}

.social .fb {
  margin-left: 25px;
}

.social i {
  margin-right: 4px;
}

/* Responsive */
@media (max-width: 500px) {
  form {
    width: 100%;
    margin: 20px;
  }
}
</style>
