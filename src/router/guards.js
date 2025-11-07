import { useAuthStore } from 'src/stores/auth'

/**
 * Guard de navegación para proteger rutas que requieren autenticación
 * 
 * Uso en routes.js:
 * {
 *   path: '/profile',
 *   component: () => import('pages/ProfilePage.vue'),
 *   beforeEnter: requireAuth
 * }
 */
export const requireAuth = (to, from, next) => {
  const authStore = useAuthStore()
  
  // Intentar restaurar la sesión desde localStorage
  authStore.restoreSession()
  
  if (authStore.isLoggedIn) {
    next()
  } else {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }
}

/**
 * Guard para redirigir usuarios autenticados
 * Útil para páginas de login/registro
 * 
 * Uso en routes.js:
 * {
 *   path: '/login',
 *   component: () => import('pages/LoginPage.vue'),
 *   beforeEnter: redirectIfAuthenticated
 * }
 */
export const redirectIfAuthenticated = (to, from, next) => {
  const authStore = useAuthStore()
  
  authStore.restoreSession()
  
  if (authStore.isLoggedIn) {
    next('/')
  } else {
    next()
  }
}

/**
 * Guard para roles específicos
 * @param {Array<string>} allowedRoles - Roles permitidos
 * @returns {Function} Guard de navegación
 * 
 * Ejemplo:
 * {
 *   path: '/admin',
 *   component: () => import('pages/AdminPage.vue'),
 *   beforeEnter: requireRole(['admin'])
 * }
 */
export const requireRole = (allowedRoles) => {
  return (to, from, next) => {
    const authStore = useAuthStore()
    
    authStore.restoreSession()
    
    if (!authStore.isLoggedIn) {
      next('/login')
      return
    }
    
    const userType = authStore.user?.type
    
    if (allowedRoles.includes(userType)) {
      next()
    } else {
      next('/') // Redirigir a home si no tiene permisos
    }
  }
}
