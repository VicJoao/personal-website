<script setup>
// Define props
const date = new Date();
const year = date.getFullYear();
const day = date.getDate();
const month = date.toLocaleString('default', {month: 'short'}).slice(0, -1);

const volume = Math.ceil((new Date() - new Date('10/07/2024')) / (1000 * 60 * 60 * 24 * 7));

const props = defineProps({
  logo: String,
  name: String,
});
</script>

<template>
  <div class="container text-center py-3">
    <!-- Logo and Name -->
    <div class="d-flex justify-content-center align-items-end my-4">
      <!-- Display the first part of the name (before the space) -->
      <h2 class="site-name mb-20 fw-bold">{{ name.split(' ')[0] }}</h2>

      <!-- Display the logo -->
      <img :src="logo" alt="Logo" class="mx-3" style="width: 250px;"/>

      <!-- Display the second part of the name (after the space) -->
      <h2 class="site-name mb-20 fw-bold">{{ name.split(' ').slice(1).join(' ') }}</h2>
    </div>

    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light border-top border-bottom py-2">
      <div class="container-fluid">
        <!-- Volume -->
        <div class="navbar-brand"><h1>Vol {{ volume }}</h1></div>

        <!-- Navbar Links -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <h1>
                <router-link class="nav-link" to="/">Sobre</router-link>
              </h1>
            </li>
            <li class="nav-item"><h1>.</h1></li>
            <li class="nav-item">
              <h1>
                <router-link class="nav-link" to="/projects">Portfólio</router-link>
              </h1>
            </li>
            <li class="nav-item"><h1>.</h1></li>
            <li class="nav-item">
              <h1>
                <router-link class="nav-link" to="/posts">Posts</router-link>
              </h1>
            </li>
            <li class="nav-item"><h1>.</h1></li>
            <li class="nav-item">
              <h1>
                <router-link class="nav-link" to="/contact">Contato</router-link>
              </h1>
            </li>
          </ul>
        </div>

        <!-- Date -->
        <div class="navbar-brand"><h1>{{ day }} {{ month }}. {{ year }}</h1></div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
/* Additional styles */
.nav-link {
  font-weight: bold;
  padding: 0 15px;
}

.navbar {
  background-color: #f8f9fa;
}

.navbar-brand {
  font-style: italic;
  font-weight: bold;
}

.navbar-text {
  font-weight: bold;
}
.site-name{
  font-weight: normal !important;
}

/* Black thick line at the bottom */
.container {
  border-bottom: 4px solid black; /* Adjust the thickness here */
}

.navbar{
  background-color: white !important;
  border: 0 !important;
}
</style>
