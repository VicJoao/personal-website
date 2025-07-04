<script setup>
import { ref } from 'vue';

const date = new Date();
const year = date.getFullYear();
const day = date.getDate();
const month = date.toLocaleString("default", { month: "short" }).slice(0, -1);

const volume = Math.ceil(
  (new Date() - new Date("10/07/2024")) / (1000 * 60 * 60 * 24 * 7)
);

const props = defineProps({
  logo: String,
  name: String,
});

const showMobileMenu = ref(false);

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
};
</script>

<template>
  <div class="container text-center py-3">
    <!-- Logo and Name -->
    <div class="d-flex justify-content-center align-items-end my-4">
      <!-- Display the first part of the name (before the space) -->
      <h2 class="site-name mb-20 fw-bold">{{ name.split(" ")[0] }}</h2>

      <!-- Display the logo -->
      <img :src="logo" alt="Logo" class="mx-3" style="width: 250px" />

      <!-- Display the second part of the name (after the space) -->
      <h2 class="site-name mb-20 fw-bold">
        {{ name.split(" ").slice(1).join(" ") }}
      </h2>
    </div>

    <!-- Volume and Date for Small Screens -->
    <div
      class="d-flex d-lg-none mb-2 align-items-center justify-content-between"
    >
      <h1>Vol {{ volume }}</h1>
      <h1>{{ day }} {{ month }}. {{ year }}</h1>
    </div>

    <!-- Navbar -->
    <nav
      class="navbar navbar-expand-lg navbar-light border-top border-bottom py-2"
    >
      <div class="container-fluid d-flex justify-content-center">
        <!-- Volume for Large Screens -->
        <div class="navbar-brand d-none d-lg-block">
          <h1>Vol {{ volume }}</h1>
        </div>

        <!-- Navbar Links -->
        <button
          class="navbar-toggler"
          type="button"
          @click="toggleMobileMenu"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Modal menu customizado para mobile -->
        <div
          v-if="showMobileMenu"
          class="mobile-menu-modal"
        >
          <div class="mobile-menu-content animate-slide-down">
            <button 
              class="close-btn"
              @click="toggleMobileMenu"
              aria-label="Fechar menu"
            >
              ×
            </button>
            <ul class="list-unstyled text-center">
              <li><router-link class="nav-link" @click="toggleMobileMenu" to="/">Sobre</router-link></li>
              <li><router-link class="nav-link" @click="toggleMobileMenu" to="/projects">Portfólio</router-link></li>
              <li><router-link class="nav-link" @click="toggleMobileMenu" to="/posts">Posts</router-link></li>
              <li><router-link class="nav-link" @click="toggleMobileMenu" to="/contact">Contato</router-link></li>
            </ul>
          </div>
        </div>

        <!-- Desktop menu -->
        <div
          class="d-none d-lg-flex justify-content-center"
          id="navbarNav"
        >
          <ul class="navbar-nav">
            <li class="nav-item">
              <h1>
                <router-link class="nav-link" to="/">Sobre</router-link>
              </h1>
            </li>
            <li class="nav-item"><h1>.</h1></li>
            <li class="nav-item">
              <h1>
                <router-link class="nav-link" to="/projects"
                  >Portfólio</router-link
                >
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
                <router-link class="nav-link" to="/contact"
                  >Contato</router-link
                >
              </h1>
            </li>
          </ul>
        </div>

        <!-- Date for Large Screens -->
        <div class="navbar-brand d-none d-lg-block">
          <h1>{{ day }} {{ month }}. {{ year }}</h1>
        </div>
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

.site-name {
  font-weight: normal !important;
}

/* Black thick line at the bottom */
.container {
  border-bottom: 4px solid black; /* Adjust the thickness here */
}

.navbar {
  background-color: transparent !important;
  border: 0 !important;
}

@media (max-width: 768px) {
  .site-name {
    display: none;
  }
  .navbar-brand {
    display: none;
  }
  .navbar-nav {
    width: 100%;
    justify-content: space-evenly;
  }
  .nav-link {
    padding: 0 5px;
  }
  .collapse:not(.show) {
    display: none; /* Ensures that the navbar remains collapsed by default */
  }
  .navbar-collapse.show {
    display: flex !important; /* Makes sure the navbar expands when toggled */
    justify-content: center;
  }
}

/* Mobile Menu Modal Styles */
@keyframes slideDownFade {
  0% {
    opacity: 0;
    transform: translateY(-30%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.mobile-menu-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.221);
  background-size: cover;
  z-index: 1050;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-menu-content {
  background: white url('/src/assets/menu-background.webp') no-repeat center center;
  background-size: cover;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 400px;
  position: relative;
}

.animate-slide-down {
  animation: slideDownFade 0.4s ease-out;
}

.mobile-menu-content .nav-link {
  display: block;
  padding: 1rem 0;
  font-size: 1.5rem;
  font-weight: bold;
  color: #000;
  text-decoration: none;
  transition: all 0.3s ease;
}

.mobile-menu-content .nav-link:hover {
  color: rgb(39, 39, 39);
  background-color: rgba(0, 123, 255, 0.1);
}

.navbar-toggler {
  color:#000;
  border: none;
  background: transparent;
}

.navbar-toggler:focus {
  box-shadow: none !important;
  outline: none !important;
}

.navbar-toggler:active {
  box-shadow: none !important;
  outline: none !important;
}

.navbar-toggler-icon {
  padding: 0;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%280, 0, 0, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e") !important;
}

.mobile-menu-content .nav-link:last-child {
  border-bottom: none;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 2rem;
  font-weight: bold;
  color: #000;
  cursor: pointer;
  line-height: 1;
  transition: color 0.3s ease;
}

.close-btn:hover {
  color: rgb(39, 39, 39);
}
</style>
