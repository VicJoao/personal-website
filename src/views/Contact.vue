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
      <div class="col">
        <img src="../assets/contato (1).png" alt="Contato Image 1" class="img-fluid lettering">
      </div>
      <div class="col">
        <img src="../assets/contato (2).png" alt="Contato Image 2" class="img-fluid lettering">
      </div>
      <div class="col">
        <img src="../assets/contato (3).png" alt="Contato Image 3" class="img-fluid lettering">
      </div>
      <div class="col">
        <img src="../assets/contato (4).png" alt="Contato Image 4" class="img-fluid lettering">
      </div>
      <div class="col">
        <img src="../assets/contato (5).png" alt="Contato Image 5" class="img-fluid lettering">
      </div>
      <div class="col">
        <img src="../assets/contato (6).png" alt="Contato Image 6" class="img-fluid lettering">
      </div>
      <div class="col">
        <img src="../assets/contato (7).png" alt="Contato Image 7" class="img-fluid lettering">
      </div>
    </div>

    <!-- Exibindo banner de contato e informações dinâmicas com Bootstrap -->
    <div class="row align-items-center text-center mb-4">
      <div class="col d-flex justify-content-center">
        <img src="../assets/whatsapp-logo.png" alt="Phone Logo" class="logo img-fluid ">
        <a :href="phone">
          <img :src="phoneBanner" alt="Phone Banner" class="img-fluid banner-logo">
        </a>
      </div>
    </div>

    <div class="row align-items-center text-center">
      <div class="col d-flex justify-content-center mb-3">
        <a :href="'mailto:' + email">
          <img :src="emailBanner" alt="Email Banner" class="img-fluid banner-logo">
        </a>
        <img src="../assets/email-logo.png" alt="Email Logo" class="logo img-fluid">
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

.logo{
  max-height: 250px;
  object-fit: cover;
}

.logo:hover{
  transform: scale(1.1);
  rotate: -10deg;
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
<style scoped>
.underlined-cont{
  padding-bottom: 4px;
  margin-bottom: 4px;
  border-bottom: 4px solid #111111;
}
h1 {
  text-align: center;
  font-weight: bolder;
  font-size: 3em;
}
h2 {
  font-size: 2.5em;
}
.btn{
  background-color: transparent !important;
  border: 0px!important;
  color: #111111 !important;
  font-weight: bold;
}
.btn:hover{
  font-weight: bolder;
  color: #808080 !important;
}
*{
  font-size: 1.1em;
}
</style>