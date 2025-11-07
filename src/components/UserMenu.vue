<template>
  <div class="user-menu">
    <!-- Si el usuario está autenticado -->
    <div v-if="authStore.isLoggedIn" class="user-info">
      <q-btn-dropdown 
        color="primary" 
        :label="authStore.fullName || 'Usuario'"
        icon="person"
      >
        <q-list>
          <q-item clickable v-close-popup>
            <q-item-section>
              <q-item-label>{{ authStore.user.email }}</q-item-label>
              <q-item-label caption>{{ authStore.user.firstName }} {{ authStore.user.lastName }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator />

          <q-item clickable v-close-popup @click="goToProfile">
            <q-item-section avatar>
              <q-icon name="account_circle" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Mi Perfil</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="goToOrders">
            <q-item-section avatar>
              <q-icon name="shopping_bag" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Mis Pedidos</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator />

          <q-item clickable v-close-popup @click="handleLogout">
            <q-item-section avatar>
              <q-icon name="logout" color="negative" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Cerrar Sesión</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>

    <!-- Si el usuario NO está autenticado -->
    <div v-else class="auth-buttons">
      <q-btn 
        flat 
        color="primary" 
        label="Iniciar Sesión" 
        to="/login"
        icon="login"
      />
      <q-btn 
        color="primary" 
        label="Registrarse" 
        to="/register"
        icon="person_add"
      />
    </div>
  </div>
</template>

<script>
import { useAuthStore } from 'src/stores/auth'
import { SUCCESS_MESSAGES } from 'src/constants'

export default {
  name: 'UserMenu',
  setup() {
    const authStore = useAuthStore()
    // Restaurar sesión una sola vez al crear el componente
    authStore.restoreSession()
    return { authStore }
  },
  methods: {
    goToProfile() {
      this.$router.push('/profile')
    },
    goToOrders() {
      this.$router.push('/orders')
    },
    handleLogout() {
      this.authStore.logout()
      this.$q.notify({
        type: 'positive',
        message: SUCCESS_MESSAGES.LOGOUT_SUCCESS,
        position: 'top'
      })
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.user-menu {
  display: flex;
  align-items: center;
  gap: 10px;
}

.auth-buttons {
  display: flex;
  gap: 10px;
}
</style>
