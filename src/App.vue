<script setup>
import { ref, onMounted } from 'vue'
import HeaderSection from './components/HeaderSection.vue'
import FooterSection from './components/FooterSection.vue'
import { createClient } from 'contentful'
console.log("SPACE:", import.meta.env.VITE_SPACE);
console.log("ACCESS_TOKEN:", import.meta.env.VITE_ACCESS_TOKEN);
// Configuração do cliente Contentful
const client = createClient({
  space: import.meta.env.VITE_SPACE,
  accessToken: import.meta.env.VITE_ACCESS_TOKEN
});

// Referências reativas para os dados
const logo = ref('')
const name = ref('')

// Função para obter os dados do Contentful
const fetchData = async () => {
  try {
    // Buscar os dados do Contentful usando o ID do tipo de conteúdo
    const response = await client.getEntries(
        { content_type: 'homePage' } // Usando o ID correto do tipo de conteúdo
    );

    console.log("RESPONSE:", response);

    // Atribuir os dados às referências reativas
    logo.value = response.items[0].fields.logo.fields.file.url;
    name.value = response.items[0].fields.siteName;
  } catch (error) {
    console.error('Erro ao buscar dados do Contentful:', error);
  }
};


// Executar a função quando o componente for montado
onMounted(() => {
  fetchData()
})
</script>

<template>
  <!-- Passando os dados como props para os componentes -->
  <HeaderSection :logo="logo" :name="name" />
  <main>
    <router-view />
  </main>
  <FooterSection />
</template>

<style scoped>
/* Estilos */
</style>
