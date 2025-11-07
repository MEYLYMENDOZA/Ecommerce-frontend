/**
 * Constantes de la aplicación
 */

/**
 * Tipos de usuario disponibles
 */
export const USER_TYPES = {
  CUSTOMER: 'customer',
  SELLER: 'seller',
  ADMIN: 'admin'
}

/**
 * Opciones para el selector de tipo de usuario
 */
export const USER_TYPE_OPTIONS = [
  { label: 'Cliente', value: USER_TYPES.CUSTOMER },
  { label: 'Vendedor', value: USER_TYPES.SELLER },
  { label: 'Administrador', value: USER_TYPES.ADMIN }
]

/**
 * Mensajes de error comunes
 */
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'No se pudo conectar con el servidor',
  SERVER_ERROR: 'Error en el servidor',
  VALIDATION_ERROR: 'Por favor verifica los datos ingresados',
  UNKNOWN_ERROR: 'Ocurrió un error inesperado'
}

/**
 * Mensajes de éxito comunes
 */
export const SUCCESS_MESSAGES = {
  REGISTER_SUCCESS: 'Usuario registrado exitosamente',
  LOGIN_SUCCESS: '¡Bienvenido! Inicio de sesión exitoso',
  UPDATE_SUCCESS: 'Datos actualizados exitosamente',
  LOGOUT_SUCCESS: 'Sesión cerrada correctamente'
}
