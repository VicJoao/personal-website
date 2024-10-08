<script setup>
// Definir as props
const props = defineProps({
  name: String,
  address: String,
  phone: String,
  email: String
})
</script>

<template>
  <footer class="bg-light text-dark py-4">
    <div class="container">
      <div class="row">
        <!-- Informações da empresa -->
        <div class="col-md-6">
          <p class="fw-bold">{{ name }}</p>
          <p>{{ address }}</p>
        </div>

        <!-- Contato -->
        <div class="col-md-6">
          <h3>Contato</h3>
          <p><strong>Telefone:</strong> {{ phone }}</p>
          <p><strong>Email:</strong> {{ email }}</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Estilos personalizados */
footer {
  background-color: #f8f9fa; /* Cor de fundo clara */
}

p {
  margin-bottom: 0.5rem;
}

h3 {
  margin-bottom: 1rem;
}
</style>
