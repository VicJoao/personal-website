<script setup>
import { ref, onMounted } from "vue";
import HeaderSection from "./components/layout/Header/HeaderSection.vue";
import FooterSection from "./components/layout/Footer/FooterSection.vue";
import { createClient } from "contentful";
import backgroundImage from "@/assets/background.png";

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
});
</script>

<template>
  <img :src="backgroundImage" alt="Background" class="background" />
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
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap");

html {
  font-size: 16px;
}

body,
#app {
  font-family: "IBM Plex Serif", serif;
  font-size: 1.5rem;
  line-height: 1.6;
  color: #111;
  text-align: justify;
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

h1 {
  text-align: center;
  font-weight: bolder;
  font-size: 3em;
}

h2 {
  font-size: 2.5em;
}

p {
  margin-bottom: 1rem;
}
.underlined-cont {
  padding-bottom: 4px;
  margin-bottom: 4px;
  border-bottom: 4px solid #111111;
}
a,
a:visited {
  color: #000 !important;
  text-decoration: underline;
}
@media (max-width: 900px) {
  body,
  #app {
    font-size: 1.2rem;
  }

  h1 {
    font-size: 2.5em;
  }

  h2 {
    font-size: 2em;
  }
}
</style>
