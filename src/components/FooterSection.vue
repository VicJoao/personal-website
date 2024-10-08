<script setup>
// Definir as props
const props = defineProps({
  name: String,
  address: String,
  phone: String,
  email: String
});
</script>

<template>
  <footer class="bg-light text-dark py-4">
    <div class="container">
      <div class="row">
        <!-- Informações da empresa -->
        <div class="col-md-6">
          <p class="fw-bold">{{ props.name }}</p>
          <p>{{ props.address }}</p>
        </div>

        <!-- Contato - Alinhado à direita -->
        <div class="col-md-6 text-end">
          <p><strong>Contato</strong></p>
          <p><strong>Telefone:</strong> {{ props.phone }}</p>
          <p><strong>Email:</strong> {{ props.email }}</p>
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

.container {
  border-top: 4px solid black;
}
</style>
