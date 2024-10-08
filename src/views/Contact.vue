<script setup>
import { createClient } from "contentful";
import { ref, onMounted } from 'vue';

const emailBanner = ref('');
const email = ref('');
const phoneBanner = ref('');
const phone = ref('');

// Função para buscar dados do Contentful
const fetchData = async () => {
  try {
    const client = createClient({
      space: import.meta.env.VITE_SPACE,
      accessToken: import.meta.env.VITE_ACCESS_TOKEN
    });
    const response = await client.getEntries({
      content_type: 'contactPage'
    });

    // Supondo que o response tenha os dados nos campos certos
    const contactFields = response.items[0].fields;
    emailBanner.value = contactFields.emailBanner.fields.file.url;
    email.value = contactFields.email;
    phoneBanner.value = contactFields.phoneBanner.fields.file.url;
    phone.value = contactFields.phone;

  } catch (error) {
    console.error('Erro ao buscar dados do Contentful:', error);
  }
};

// Chamada ao buscar os dados quando o componente é montado
onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="container my-4">
    <!-- Exemplo de renderização de múltiplas imagens com layout do Bootstrap -->
    <div class="row text-center">
      <div v-for="n in 7" :key="n" class="col">
        <img :src="`/src/assets/contact/contato (${n}).png`" :alt="`Contato Image ${n}`" class="img-fluid lettering">
      </div>
    </div>

    <!-- Exibindo banner de contato e informações dinâmicas com Bootstrap -->
    <div class="row align-items-center text-center mb-4">
      <div class="col align-items-center text-center">
        <img :src="'/src/assets/whatsapp-logo.png'" alt="Phone Logo" class="img-fluid banner-logo">
      </div>
      <div class="col align-items-center text-center">
        <a :href="'tel:' + phone">
          <img :src="phoneBanner" alt="Phone Banner" class="img-fluid banner-logo">
        </a>
      </div>
    </div>

    <div class="row align-items-center text-center">
      <div class="col-md-6 mb-3">
        <a :href="'mailto:' + email">
          <img :src="emailBanner" alt="Email Banner" class="img-fluid banner-logo">
        </a>
      </div>
      <div class="col-md-6 mb-3">
        <img :src="'/src/assets/email-logo.png'" alt="Email Logo" class="img-fluid banner-logo">
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Definindo uma altura máxima para as imagens para que todas tenham o mesmo tamanho */
.lettering {
  max-height: 150px;
  object-fit: cover;
}
.lettering:hover {
  transform: scale(1.1);
  rotate: 10deg;
}

.banner-logo {
  max-height: 250px;
  object-fit: cover;
}
.banner-logo:hover {
  transform: scale(1.1);
  transition: 0.5s;
}
</style>
