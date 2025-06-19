<template>
  <div class="container my-4">
    <div class="banner mb-4">
      <img :src="banner" alt="Banner do Projeto" class="img-fluid rounded" />
    </div>

    <div>
      <h1 class="card-title underlined-cont">{{ title }}</h1>
      <div class="description mb-3" v-html="description"></div>
      <div class="">
        <img :src="gif" alt="GIF do Projeto" class="img-fluid rounded gif" />
      </div>
      <div class="d-flex justify-content-sm-around">
        <a v-if="githubLink" :href="githubLink" target="_blank" class="btn"
          >GitHub</a
        >
        <a v-if="liveLink" :href="liveLink" target="_blank" class="btn"
          >Live Demo</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { createClient } from "contentful";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

export default {
  name: "Project",
  setup() {
    const title = ref("");
    const description = ref("");
    const gif = ref("");
    const githubLink = ref("");
    const liveLink = ref("");
    const banner = ref("");

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
        console.log(response);

        if (response.items.length > 0) {
          const project = response.items[0].fields;
          title.value = project.title;
          description.value = documentToHtmlString(project.description);
          gif.value = project.gif.fields.file.url;
          githubLink.value = project.githubLink;
          liveLink.value = project.liveLink;
          banner.value = project.banner.fields.file.url;
        } else {
          console.warn("Projeto não encontrado");
        }
      } catch (error) {
        console.error("Erro ao buscar dados do Contentful:", error);
      }
    };

    onMounted(() => {
      const route = useRoute();
      const projectId = route.params.id;
      fetchData(projectId);
    });

    return {
      title,
      description,
      gif,
      githubLink,
      liveLink,
      banner,
    };
  },
};
</script>

<style scoped>
.banner img {
  width: 80%;
  height: auto;
  margin: 20px 10%;
  border: 8px solid #111111;
}
.gif {
  width: 80%;
  height: auto;
  margin: 20px 10%;
}
</style>
