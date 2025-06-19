<script setup>
import { createClient } from "contentful";
import { ref, onMounted } from "vue";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { useRouter } from "vue-router";
import BaseButton from "@/components/base/BaseButton.vue";

const projects = ref([]);

const fetchData = async () => {
  try {
    const client = createClient({
      space: import.meta.env.VITE_SPACE,
      accessToken: import.meta.env.VITE_ACCESS_TOKEN,
    });

    const response = await client.getEntries({
      content_type: "projectPage",
    });
    for (let i = 0; i < response.items.length; i++) {
      console.log(response.items[i].fields);
    }

    projects.value = response.items;
  } catch (error) {
    console.error("Erro ao buscar dados do Contentful:", error);
  }
};

const truncate = (text, maxLength = 255) => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="container">
    <h1 class="my-4">Portfólio</h1>
    <div class="row">
      <div class="col">
        <div v-for="project in projects" :key="project.sys.id">
          <div class="row">
            <div class="col-auto">
              <img
                v-if="project.fields.banner"
                :src="project.fields.banner.fields.file.url"
                alt="Imagem do Projeto"
                class="img-fluid mb-3 square-img"
              />
            </div>
            <div class="col">
              <h2 class="underlined-cont">{{ project.fields.title }}</h2>
              <div
                v-html="
                  truncate(documentToHtmlString(project.fields.description))
                "
              ></div>
              <BaseButton
                :to="{ name: 'Project', params: { id: project.sys.id } }"
                >Ver Projeto</BaseButton
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
