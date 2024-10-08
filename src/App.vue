<script setup>
import { ref, onMounted } from 'vue'
import HeaderSection from './components/HeaderSection.vue'
import FooterSection from './components/FooterSection.vue'
import { createClient } from 'contentful'
import backgroundImage from '@/assets/background.png'  // Importando a imagem

// Configuração do cliente Contentful
const client = createClient({
  space: import.meta.env.VITE_SPACE,
  accessToken: import.meta.env.VITE_ACCESS_TOKEN
});

// Referências reativas para os dados
const logo = ref('')
const siteName = ref('')
const name = ref('')
const address = ref('')
const phone = ref('')
const email = ref('')

// Função para obter os dados do Contentful
const fetchData = async () => {
  try {
    // Buscar os dados do Contentful usando o ID do tipo de conteúdo
    const response = await client.getEntries(
        { content_type: 'homePage' } // Usando o ID correto do tipo de conteúdo
    );

    // Verificação se existem itens
    if (response.items.length > 0) {
      const fields = response.items[0].fields;
      logo.value = fields.logo?.fields.file.url || '';
      siteName.value = fields.siteName || '';
      name.value = fields.name || '';
      address.value = fields.address || '';
      phone.value = fields.cellphone || '';
      email.value = fields.email || '';
    } else {
      console.error('Nenhum item encontrado.');
    }
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
  <img :src="backgroundImage" alt="Background" class="background"/>
  <HeaderSection :logo="logo" :name="siteName" />
  <main>
    <router-view class="view-body" />
  </main>
  <FooterSection :name="siteName" :address="address" :phone="phone" :email="email" />
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');

body, html, #app {
  font-family: "IBM Plex Serif", serif;
  font-size: 1.6rem;
  line-height: 1.6;
  color: #111; /* Ajuste da cor */
}

:deep h1 {
  font-size: 2em; /* Dobro do tamanho normal */
  font-weight: bold; /* Deixa a fonte em negrito */
}

.my-4 {
  margin-top: 4rem !important;
  margin-bottom: 4rem !important;
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  object-fit: cover;
  object-position: center;
}
</style>
