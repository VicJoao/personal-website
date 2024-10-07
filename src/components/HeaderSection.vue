<script setup>

// Definir as props
const props = defineProps({
  logo: String,
  name: String
})
</script>

<template>
  <div>
    <!-- Usando os props para exibir o logo e nome -->
    <img :src="logo" alt="Logo" />
    <h1>{{ name }}</h1>
  </div>

  <nav>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/posts">Posts</router-link></li>
      <li><router-link to="/projects">Portifolio</router-link></li>
      <li><router-link to="/contact">Contato</router-link></li>
    </ul>
  </nav>
</template>

<style scoped>
/* Estilos */
</style>
