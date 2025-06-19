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
  <footer class="text-dark py-4">
    <div class="container">
      <div class="row">
        <!-- Informações da empresa -->
        <div class="col-md-6">
          <p class="fw-bold">{{ props.name }}</p>
          <p>{{ props.address }}</p>
        </div>

        <!-- Contato - Alinhado à direita -->
        <div class="col-md-6 text-e">
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
  background-color:transparent; /* Cor de fundo clara */
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
.text-e {
  text-align: right;
  justify-content: right;
}
@media (max-width: 767px) {
  .col-md-6 {
    text-align: center;
  }
  .text-e {
    text-align: center;
    justify-content: center;
  }
}
</style>
