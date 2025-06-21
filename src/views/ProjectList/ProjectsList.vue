<script setup>
import { createClient } from "contentful";
import { ref, onMounted, onUnmounted } from "vue";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseImage from "@/components/base/BaseImage.vue";

const projects = ref([]);
const isMobile = ref(false);

const fetchData = async () => {
  try {
    const client = createClient({
      space: import.meta.env.VITE_SPACE,
      accessToken: import.meta.env.VITE_ACCESS_TOKEN,
    });

    const response = await client.getEntries({
      content_type: "projectPage",
    });

    projects.value = response.items;
  } catch (error) {
    console.error("Erro ao buscar dados do Contentful:", error);
  }
};

const truncate = (text, maxLength = 255) => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const checkMobile = () => {
  isMobile.value = window.innerWidth < 900 && window.innerWidth > 500;
};

onMounted(() => {
  fetchData();
  checkMobile();
  window.addEventListener("resize", checkMobile);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
});
</script>

<template>
  <div class="container">
    <h1 class="my-4">Portfólio</h1>
    <div class="row">
      <div class="col">
        <div
          v-for="project in projects"
          :key="project.sys.id"
          class="container mb-5"
        >
          <!-- Banner em mobile -->
          <BaseImage
            v-if="isMobile && project.fields.banner?.fields?.file?.url"
            :src="project.fields.banner.fields.file.url"
            alt="Imagem do Projeto"
            formato="banner"
            largura="100%"
            class="banner"
            style="margin-top: 20px"
          />

          <!-- Corpo do projeto -->
          <div
            class="project-item d-flex flex-column flex-md-row align-items-center justify-content-between"
          >
            <!-- Miniatura em desktop -->
            <BaseImage
              v-if="!isMobile && project.fields.banner?.fields?.file?.url"
              :src="project.fields.banner.fields.file.url"
              alt="Miniatura do Projeto"
              formato="miniatura"
              largura="250px"
              class="me-3"
            />

            <div class="flex-grow-1 d-flex flex-column">
              <h2 class="underlined-cont">{{ project.fields.title }}</h2>
              <div
                v-html="
                  truncate(documentToHtmlString(project.fields.description))
                "
              />
              <div class="text-end mt-auto">
                <BaseButton
                  type="link"
                  :to="{ name: 'Project', params: { id: project.sys.id } }"
                >
                  Ver Projeto
                </BaseButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-item {
  min-height: 160px;
}

.underlined-cont {
  border-bottom: 2px solid #000;
  padding-bottom: 4px;
  margin-bottom: 8px;
}

.banner {
  max-width: 100%;
  height: auto;
  display: block;
}

/* Layout responsivo para mobile */
@media (max-width: 900px) {
  .project-item {
    flex-direction: column;
  }

  .me-3 {
    margin-right: 0 !important;
    margin-bottom: 16px;
  }
}
</style>
