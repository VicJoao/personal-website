<script setup>
// Definir as props
const props = defineProps({
  logo: String,
  name: String
})
</script>

<template>
  <div class="container">
    <!-- Usando os props para exibir o logo e nome -->
    <div class="d-flex align-items-center my-4">
      <img :src="logo" alt="Logo" class="me-3" style="width: 50px;" />
      <h1 class="mb-0">{{ name }}</h1>
    </div>

    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/posts">Posts</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/projects">Portifolio</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/contact">Contato</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
/* Estilos adicionais */
.nav-link {
  font-weight: bold;
}

img {
  border-radius: 50%;
}
</style>
