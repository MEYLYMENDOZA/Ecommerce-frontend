<template>
  <div class="register-container">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap" rel="stylesheet">
    
    <form @submit.prevent="handleRegister">
      <h3>Registro de Usuario</h3>
      
      <div class="form-row">
        <div class="form-group">
          <label for="firstName">Nombre</label>
          <input 
            type="text" 
            placeholder="Nombre" 
            id="firstName"
            v-model="formData.firstName"
            required
          >
        </div>
        
        <div class="form-group">
          <label for="lastName">Apellido</label>
          <input 
            type="text" 
            placeholder="Apellido" 
            id="lastName"
            v-model="formData.lastName"
            required
          >
        </div>
      </div>

      <label for="email">Correo Electrónico</label>
      <input 
        type="email" 
        placeholder="ejemplo@correo.com" 
        id="email"
        v-model="formData.email"
        required
      >

      <label for="password">Contraseña</label>
      <input 
        type="password" 
        placeholder="Contraseña" 
        id="password"
        v-model="formData.password"
        required
        minlength="6"
      >

      <label for="confirmPassword">Confirmar Contraseña</label>
      <input 
        type="password" 
        placeholder="Confirmar Contraseña" 
        id="confirmPassword"
        v-model="confirmPassword"
        required
      >

      <label for="dateOfBirth">Fecha de Nacimiento</label>
      <input 
        type="date" 
        id="dateOfBirth"
        v-model="formData.dateOfBirth"
      >

      <div class="form-row">
        <div class="form-group">
          <label for="country">País</label>
          <input 
            type="text" 
            placeholder="País" 
            id="country"
            v-model="formData.country"
          >
        </div>
        
        <div class="form-group">
          <label for="type">Tipo de Usuario</label>
          <select 
            id="type"
            v-model="formData.type"
          >
            <option value="">Seleccionar</option>
            <option 
              v-for="option in userTypeOptions" 
              :key="option.value" 
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>

      <label for="address">Dirección</label>
      <input 
        type="text" 
        placeholder="Dirección completa" 
        id="address"
        v-model="formData.address"
      >

      <button type="submit" :disabled="loading">
        <span v-if="loading">Registrando...</span>
        <span v-else>Registrarse</span>
      </button>

      <div class="login-link">
        ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
      </div>
    </form>
  </div>
</template>

<script>
import userService from 'src/services/userService'
import { validatePassword, validatePasswordMatch, isValidEmail, validateDateOfBirth } from 'src/utils/validation'
import { USER_TYPE_OPTIONS, SUCCESS_MESSAGES, ERROR_MESSAGES } from 'src/constants'

export default {
  name: 'RegisterForm',
  data() {
    return {
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        dateOfBirth: '',
        country: '',
        address: '',
        type: ''
      },
      confirmPassword: '',
      loading: false,
      userTypeOptions: USER_TYPE_OPTIONS
    }
  },
  methods: {
    /**
     * Valida el formulario antes de enviarlo
     */
    validateForm() {
      // Validar email
      if (!isValidEmail(this.formData.email)) {
        this.$q.notify({
          type: 'negative',
          message: 'Por favor ingresa un correo electrónico válido',
          position: 'top'
        })
        return false
      }

      // Validar contraseña
      const passwordValidation = validatePassword(this.formData.password)
      if (!passwordValidation.valid) {
        this.$q.notify({
          type: 'negative',
          message: passwordValidation.message,
          position: 'top'
        })
        return false
      }

      // Validar coincidencia de contraseñas
      const passwordMatchValidation = validatePasswordMatch(this.formData.password, this.confirmPassword)
      if (!passwordMatchValidation.valid) {
        this.$q.notify({
          type: 'negative',
          message: passwordMatchValidation.message,
          position: 'top'
        })
        return false
      }

      // Validar fecha de nacimiento si está presente
      if (this.formData.dateOfBirth) {
        const dateValidation = validateDateOfBirth(this.formData.dateOfBirth)
        if (!dateValidation.valid) {
          this.$q.notify({
            type: 'negative',
            message: dateValidation.message,
            position: 'top'
          })
          return false
        }
      }

      return true
    },

    /**
     * Maneja el registro del usuario
     */
    async handleRegister() {
      if (!this.validateForm()) {
        return
      }

      this.loading = true

      try {
        const response = await userService.signUp(this.formData)
        
        this.$q.notify({
          type: 'positive',
          message: SUCCESS_MESSAGES.REGISTER_SUCCESS,
          position: 'top'
        })

        console.log('Usuario registrado con ID:', response.id)

        // Redirigir al login inmediatamente
        this.$router.push('/login')

      } catch (error) {
        console.error('Error al registrar usuario:', error)
        
        this.$q.notify({
          type: 'negative',
          message: error.message || ERROR_MESSAGES.UNKNOWN_ERROR,
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

.register-container {
  background-color: #080710;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

form {
  min-height: 680px;
  width: 450px;
  background-color: rgba(255, 255, 255, 0.13);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 40px rgba(49, 131, 186, 0.6);
  padding: 40px 35px;
}

form * {
  font-family: 'Poppins', sans-serif;
  color: #030303;
  letter-spacing: 0.5px;
  outline: none;
  border: none;
}

form h3 {
  font-size: 28px;
  font-weight: 500;
  line-height: 42px;
  text-align: center;
  margin-bottom: 20px;
}

label {
  display: block;
  margin-top: 15px;
  font-size: 14px;
  font-weight: 500;
}

input,
select {
  display: block;
  height: 45px;
  width: 100%;
  background-color: rgba(10, 100, 118, 0.07);
  border-radius: 3px;
  padding: 0 10px;
  margin-top: 5px;
  font-size: 14px;
  font-weight: 300;
}

select {
  cursor: pointer;
}

::placeholder {
  color: #000000;
}

.form-row {
  display: flex;
  gap: 15px;
}

.form-group {
  flex: 1;
}

button {
  margin-top: 25px;
  width: 100%;
  background-color: #3f77a0;
  color: #fdfdfd;
  padding: 12px 0;
  font-size: 16px;
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

.login-link {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #fdfdfd;
}

.login-link a {
  color: #3f77a0;
  text-decoration: none;
  font-weight: 600;
}

.login-link a:hover {
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 500px) {
  form {
    width: 100%;
    padding: 30px 25px;
  }

  .form-row {
    flex-direction: column;
    gap: 0;
  }
}
</style>
