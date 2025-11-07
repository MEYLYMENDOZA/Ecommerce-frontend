<template>
  <q-page class="flex flex-center">
    <div class="column items-center q-gutter-md">
      <img
        alt="Quasar logo"
        src="~assets/quasar-logo-vertical.svg"
        style="width: 200px; height: 200px"
      />
      <div class="row q-gutter-md">
        <q-btn 
          color="primary" 
          label="Iniciar Sesión" 
          to="/login"
          size="lg"
        />
        <q-btn 
          color="secondary" 
          label="Registrarse" 
          to="/register"
          size="lg"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
//
</script>
