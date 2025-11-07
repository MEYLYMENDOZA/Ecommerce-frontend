import { defineStore } from 'pinia'

/**
 * Store para manejar el estado de autenticación del usuario
 */
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false
  }),

  getters: {
    /**
     * Obtiene el nombre completo del usuario
     */
    fullName: (state) => {
      if (!state.user) return ''
      return `${state.user.firstName} ${state.user.lastName}`.trim()
    },

    /**
     * Verifica si hay un usuario autenticado
     */
    isLoggedIn: (state) => state.isAuthenticated && state.token !== null
  },

  actions: {
    /**
     * Guarda los datos del usuario después del login
     * @param {Object} userData - Datos del usuario y token
     */
    setUser(userData) {
      this.user = {
        id: userData.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email
      }
      this.token = userData.token
      this.isAuthenticated = true

      // Guardar en localStorage para persistencia
      localStorage.setItem('auth_token', userData.token)
      localStorage.setItem('auth_user', JSON.stringify(this.user))
    },

    /**
     * Limpia los datos de autenticación (logout)
     */
    clearAuth() {
      this.user = null
      this.token = null
      this.isAuthenticated = false

      // Limpiar localStorage
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
    },

    /**
     * Restaura la sesión desde localStorage
     */
    restoreSession() {
      const token = localStorage.getItem('auth_token')
      const userStr = localStorage.getItem('auth_user')

      if (token && userStr) {
        try {
          this.token = token
          this.user = JSON.parse(userStr)
          this.isAuthenticated = true
          return true
        } catch (error) {
          console.error('Error al restaurar sesión:', error)
          this.clearAuth()
          return false
        }
      }
      return false
    },

    /**
     * Cierra la sesión del usuario
     */
    logout() {
      this.clearAuth()
    }
  }
})
