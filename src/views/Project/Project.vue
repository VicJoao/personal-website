<template>
  <div class="container">
    <div
      class="d-flex flex-column flex-md-row align-items-center justify-content-between mb-4"
      style="margin-top: 20px"
    >
      <!-- Miniatura em MOBILE -->
      <BaseImage
        v-if="isMobile && banner"
        :src="banner"
        alt="Miniatura do Projeto"
        formato="miniatura"
        largura="250px"
        class="me-3"
      />

      <!-- Banner em DESKTOP -->
      <BaseImage
        v-if="!isMobile && banner"
        :src="banner"
        alt="Banner do Projeto"
        formato="banner"
        largura="100%"
        class="banner"
        style="margin-top: 20px"
      />
    </div>

    <h1 class="card-title underlined-cont my-4">{{ title }}</h1>

    <div class="row">
      <div class="col">
        <div class="description mb-3" v-html="description"></div>

        <img
          v-if="gif"
          :src="gif"
          alt="GIF do Projeto"
          class="img-fluid rounded gif"
        />

        <div class="d-flex justify-content-sm-around mt-4">
          <BaseButton v-if="githubLink" type="external" :to="githubLink">
            GitHub
          </BaseButton>

          <BaseButton v-if="liveLink" type="external" :to="liveLink">
            Live Demo
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createClient } from "contentful";
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import BaseImage from "@/components/base/BaseImage.vue";
import BaseButton from "@/components/base/BaseButton.vue";

export default {
  name: "Project",
  components: { BaseImage, BaseButton },
  setup() {
    const title = ref("");
    const description = ref("");
    const gif = ref("");
    const githubLink = ref("");
    const liveLink = ref("");
    const banner = ref("");
    const isMobile = ref(false);

    const checkMobile = () => {
      isMobile.value = window.innerWidth < 900;
    };

    const fetchData = async (projectId) => {
      try {
        const client = createClient({
          space: import.meta.env.VITE_SPACE,
          accessToken: import.meta.env.VITE_ACCESS_TOKEN,
        });

        const response = await client.getEntries({
          content_type: "projectPage",
          "sys.id": projectId,
        });

        if (response.items.length > 0) {
          const project = response.items[0].fields;
          title.value = project.title;
          description.value = documentToHtmlString(project.description);
          gif.value = project.gif?.fields?.file?.url || "";
          githubLink.value = project.githubLink || "";
          liveLink.value = project.liveLink || "";
          banner.value = project.banner?.fields?.file?.url || "";
        } else {
          console.warn("Projeto não encontrado");
        }
      } catch (error) {
        console.error("Erro ao buscar dados do Contentful:", error);
      }
    };

    const openLink = (link) => {
      if (link) {
        window.open(link, "_blank");
      } else {
        console.warn("Link não disponível");
      }
    };

    onMounted(() => {
      const route = useRoute();
      const projectId = route.params.id;
      if (projectId) fetchData(projectId);

      checkMobile();
      window.addEventListener("resize", checkMobile);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", checkMobile);
    });

    return {
      title,
      description,
      gif,
      githubLink,
      liveLink,
      banner,
      isMobile,
      openLink,
    };
  },
};
</script>

<style scoped>
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

.gif {
  width: 80%;
  height: auto;
  margin: 20px 10%;
}

/* Layout mobile */
@media (max-width: 900px) {
  .me-3 {
    margin-right: 0 !important;
    margin-bottom: 16px;
  }
}
</style>
