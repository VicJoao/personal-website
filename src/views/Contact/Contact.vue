<script setup>
import { createClient } from "contentful";
import { ref, onMounted } from "vue";

const emailBanner = ref("");
const email = ref("");
const phoneBanner = ref("");
const phone = ref("");

const fetchData = async () => {
  try {
    const client = createClient({
      space: import.meta.env.VITE_SPACE,
      accessToken: import.meta.env.VITE_ACCESS_TOKEN,
    });
    const response = await client.getEntries({
      content_type: "contactPage",
    });

    const contactFields = response.items[0].fields;
    emailBanner.value = contactFields.emailBanner.fields.file.url;
    email.value = contactFields.email;
    phoneBanner.value = contactFields.phoneBanner.fields.file.url;
    phone.value = contactFields.phoneNumber;
    console.log("Dados do Contentful:", contactFields);
  } catch (error) {
    console.error("Erro ao buscar dados do Contentful:", error);
  }
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="container my-4">
    <div class="row text-center">
      <div class="col">
        <img
          src="../../assets/contato (1).webp"
          alt="Contato Image 1"
          class="img-fluid lettering"
        />
      </div>
      <div class="col">
        <img
          src="../../assets/contato (2).webp"
          alt="Contato Image 2"
          class="img-fluid lettering"
        />
      </div>
      <div class="col">
        <img
          src="../../assets/contato (3).webp"
          alt="Contato Image 3"
          class="img-fluid lettering"
        />
      </div>
      <div class="col">
        <img
          src="../../assets/contato (4).webp"
          alt="Contato Image 4"
          class="img-fluid lettering"
        />
      </div>
      <div class="col">
        <img
          src="../../assets/contato (5).webp"
          alt="Contato Image 5"
          class="img-fluid lettering"
        />
      </div>
      <div class="col">
        <img
          src="../../assets/contato (6).wepb"
          alt="Contato Image 6"
          class="img-fluid lettering"
        />
      </div>
      <div class="col">
        <img
          src="../../assets/contato (7).webp"
          alt="Contato Image 7"
          class="img-fluid lettering"
        />
      </div>
    </div>

    <div class="row align-items-center text-center mb-4">
      <img
        src="../../assets/whatsapp-logo.webp"
        alt="Phone Logo"
        class="logo-mobile img-fluid"
      />
      <div class="col d-flex justify-content-center">
        <img
          src="../../assets/whatsapp-logo.webp"
          alt="Phone Logo"
          class="logo img-fluid"
        />
        <a :href="phone">
          <img
            :src="phoneBanner"
            alt="Phone Banner"
            class="img-fluid banner-logo"
          />
        </a>
      </div>
    </div>

    <div class="row align-items-center text-center">
      <img
        src="../../assets/email-logo.webp"
        alt="Email Logo"
        class="logo-mobile img-fluid"
      />
      <div class="col d-flex justify-content-center mb-3">
        <a :href="'mailto:' + email">
          <img
            :src="emailBanner"
            alt="Email Banner"
            class="img-fluid banner-logo"
          />
        </a>
        <img
          src="../../assets/email-logo.webp"
          alt="Email Logo"
          class="logo img-fluid"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.lettering {
  max-height: 150px;
  object-fit: cover;
}
.lettering:hover {
  transform: scale(1.1);
  rotate: 10deg;
}

.logo {
  max-height: 250px;
  object-fit: cover;
}

.logo:hover {
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
.logo-mobile {
  display: none;
}
@media (max-width: 768px) {
  .logo {
    display: none;
  }
  .logo-mobile {
    display: block;
    max-height: 250px;
    object-fit: contain;
  }
  .logo-mobile:hover {
    transform: scale(0.9);
    rotate: -10deg;
  }
  .banner-logo {
    max-height: 250px;
    object-fit: contain;
  }
  .banner-logo:hover {
    transform: scale(0.9);
    transition: 0.5s;
  }
}
</style>
