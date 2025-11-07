import { api } from 'boot/axios'

/**
 * Servicio para manejar las operaciones relacionadas con usuarios
 */
class UserService {
  /**
   * Registrar un nuevo usuario
   * @param {Object} userData - Datos del usuario
   * @param {string} userData.firstName - Nombre del usuario
   * @param {string} userData.lastName - Apellido del usuario
   * @param {string} userData.dateOfBirth - Fecha de nacimiento (formato: YYYY-MM-DD)
   * @param {string} userData.country - País
   * @param {string} userData.address - Dirección
   * @param {string} userData.email - Correo electrónico
   * @param {string} userData.password - Contraseña
   * @param {string} userData.type - Tipo de usuario
   * @returns {Promise<Object>} Respuesta del servidor con el ID del usuario creado
   */
  async signUp(userData) {
    try {
      const response = await api.post('/api/user/signup', {
        firstName: userData.firstName || null,
        lastName: userData.lastName || null,
        dateOfBirth: userData.dateOfBirth || null,
        country: userData.country || null,
        address: userData.address || null,
        email: userData.email || null,
        password: userData.password || null,
        type: userData.type || null
      })
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  /**
   * Iniciar sesión
   * @param {string} email - Correo electrónico
   * @param {string} password - Contraseña
   * @returns {Promise<Object>} Respuesta del servidor con datos del usuario y token
   */
  async signIn(email, password) {
    try {
      const response = await api.post('/api/user/signin', {
        email: email,
        password: password
      })
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  /**
   * Maneja los errores de las peticiones
   * @param {Error} error - Error de axios
   * @returns {Object} Objeto de error normalizado
   */
  handleError(error) {
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      return {
        message: error.response.data.message || 'Error en el servidor',
        status: error.response.status,
        data: error.response.data
      }
    } else if (error.request) {
      // La petición fue hecha pero no se recibió respuesta
      return {
        message: 'No se pudo conectar con el servidor',
        status: 0
      }
    } else {
      // Algo pasó al configurar la petición
      return {
        message: error.message || 'Error desconocido',
        status: -1
      }
    }
  }
}

export default new UserService()
