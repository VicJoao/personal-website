<script setup>
import { createClient } from "contentful";
import { ref, onMounted } from 'vue';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { useRouter } from 'vue-router';

const projects = ref([]);

// Função para buscar os dados do Contentful
const fetchData = async () => {
  try {
    const client = createClient({
      space: import.meta.env.VITE_SPACE,
      accessToken: import.meta.env.VITE_ACCESS_TOKEN
    });

    const response = await client.getEntries({
      content_type: 'projectPage'
    });
    for (let i = 0; i < response.items.length; i++) {
      console.log(response.items[i].fields);
    }

    projects.value = response.items;

  } catch (error) {
    console.error('Erro ao buscar dados do Contentful:', error);
  }
};

// Função para truncar a descrição
const truncate = (text, maxLength = 255) => {
  if (!text) return '';
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};

// Carrega os dados quando o componente é montado
onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="container">
    <h1 class="my-4">Portfólio</h1>
    <div class="row">
      <div class="col">
        <!-- Itera sobre os projetos -->
        <div v-for="project in projects" :key="project.sys.id" class="card mb-4">
          <div class="card-body">
            <!-- Verifica se há uma imagem antes de exibir -->
            <img v-if="project.fields.banner" :src="project.fields.banner.fields.file.url" alt="Imagem do Projeto" class="img-fluid mb-3" />

            <h2 class="card-title underlined-cont">{{ project.fields.title }}</h2>

            <!-- Renderiza a descrição truncada em HTML seguro -->
            <div v-html="truncate(documentToHtmlString(project.fields.description))"></div>

            <!-- Link para a página do projeto -->
            <router-link :to="{ name: 'Project', params: { id: project.sys.id } }" class="btn btn-primary mt-3">Ver Projeto</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

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
