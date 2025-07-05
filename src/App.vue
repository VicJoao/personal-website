<script setup>
import { ref, onMounted } from "vue";
import HeaderSection from "./components/layout/Header/HeaderSection.vue";
import FooterSection from "./components/layout/Footer/FooterSection.vue";
import { createClient } from "contentful";
import backgroundImage from "@/assets/background.webp";
import { useImageOptimization } from "@/composables/useImageOptimization.js";

const client = createClient({
  space: import.meta.env.VITE_SPACE,
  accessToken: import.meta.env.VITE_ACCESS_TOKEN,
});

const logo = ref("");
const siteName = ref("");
const name = ref("");
const address = ref("");
const phone = ref("");
const email = ref("");

// Usar composable de otimização de imagens
const { preloadCriticalImages } = useImageOptimization();

const fetchData = async () => {
  try {
    const response = await client.getEntries({ content_type: "homePage" });

    if (response.items.length > 0) {
      const fields = response.items[0].fields;
      logo.value = fields.logo?.fields.file.url || "";
      siteName.value = fields.siteName || "";
      name.value = fields.name || "";
      address.value = fields.address || "";
      phone.value = fields.cellphone || "";
      email.value = fields.email || "";
    } else {
      console.error("Nenhum item encontrado.");
    }
  } catch (error) {
    console.error("Erro ao buscar dados do Contentful:", error);
  } finally {
    // Emite evento apenas no cliente
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        document.dispatchEvent(new Event('render-event'));
      }, 500);
    }
  }
};

onMounted(() => {
  fetchData();
  
  // Preload de imagens críticas
  if (typeof window !== 'undefined') {
    preloadCriticalImages([backgroundImage]);
  }
});
</script>

<template>
  <img 
    :src="backgroundImage" 
    alt="Background" 
    class="background" 
    loading="lazy"
    decoding="async"
    width="1920"
    height="1080"
  />
  <HeaderSection :logo="logo" :name="siteName" />
  <main>
    <router-view class="view-body" />
  </main>
  <FooterSection
    :name="siteName"
    :address="address"
    :phone="phone"
    :email="email"
  />
</template>

<style>
/* Removido @import para melhor performance - agora carregado via preload no index.html */

/* Estilos específicos do componente mantidos aqui */
.view-body {
  min-height: 60vh;
}
</style>
