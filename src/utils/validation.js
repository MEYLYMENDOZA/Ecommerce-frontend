/**
 * Utilidades de validación para formularios
 */

/**
 * Valida un correo electrónico
 * @param {string} email - Correo a validar
 * @returns {boolean} True si es válido
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Valida una contraseña
 * @param {string} password - Contraseña a validar
 * @param {number} minLength - Longitud mínima
 * @returns {Object} Objeto con resultado y mensaje
 */
export const validatePassword = (password, minLength = 6) => {
  if (!password || password.length < minLength) {
    return {
      valid: false,
      message: `La contraseña debe tener al menos ${minLength} caracteres`
    }
  }
  return { valid: true, message: '' }
}

/**
 * Valida que las contraseñas coincidan
 * @param {string} password - Contraseña
 * @param {string} confirmPassword - Confirmación de contraseña
 * @returns {Object} Objeto con resultado y mensaje
 */
export const validatePasswordMatch = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return {
      valid: false,
      message: 'Las contraseñas no coinciden'
    }
  }
  return { valid: true, message: '' }
}

/**
 * Valida una fecha de nacimiento
 * @param {string} dateOfBirth - Fecha en formato YYYY-MM-DD
 * @returns {Object} Objeto con resultado y mensaje
 */
export const validateDateOfBirth = (dateOfBirth) => {
  if (!dateOfBirth) {
    return { valid: true, message: '' } // Campo opcional
  }

  const date = new Date(dateOfBirth)
  const today = new Date()
  const age = today.getFullYear() - date.getFullYear()

  if (age < 13) {
    return {
      valid: false,
      message: 'Debes tener al menos 13 años para registrarte'
    }
  }

  if (age > 120) {
    return {
      valid: false,
      message: 'Por favor ingresa una fecha de nacimiento válida'
    }
  }

  return { valid: true, message: '' }
}

/**
 * Valida campos requeridos
 * @param {Object} fields - Objeto con los campos a validar
 * @param {Array<string>} requiredFields - Array con nombres de campos requeridos
 * @returns {Object} Objeto con resultado y mensaje
 */
export const validateRequiredFields = (fields, requiredFields) => {
  for (const field of requiredFields) {
    if (!fields[field] || fields[field].trim() === '') {
      return {
        valid: false,
        message: `El campo ${field} es requerido`
      }
    }
  }
  return { valid: true, message: '' }
}
