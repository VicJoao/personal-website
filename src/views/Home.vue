<script setup>
import { createClient } from "contentful";
import { ref, onMounted } from 'vue';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { useRouter } from 'vue-router';

// Inicializa o cliente Contentful com espaço e token de acesso
const client = createClient({
  space: import.meta.env.VITE_SPACE,
  accessToken: import.meta.env.VITE_ACCESS_TOKEN
});

// Inicializa o roteador Vue
const router = useRouter();

// Variáveis reativas para armazenar dados
const aboutTitle = ref('');
const aboutText = ref('');
const whatIDoTitle = ref('');
const whatIDoText = ref('');
const projectOneTitle = ref('');
const truncatedProjectOneText = ref('');
const projectOneImage = ref('');
const projectTwoTitle = ref('');
const truncatedProjectTwoText = ref('');
const projectTwoImage = ref('');
const postOneTitle = ref('');
const truncatedPostOneText = ref('');
const postTwoTitle = ref('');
const truncatedPostTwoText = ref('');

// Função para buscar dados da página inicial
const fetchHomeData = async () => {
  try {
    const response = await client.getEntries({
      content_type: 'homePage'
    });

    // Atribui os dados a variáveis reativas
    aboutTitle.value = response.items[0].fields.aboutTitle || '';
    aboutText.value = response.items[0].fields.aboutText || '';
    whatIDoTitle.value = response.items[0].fields.whatIDoTitle || '';
    whatIDoText.value = response.items[0].fields.whatIDoText || '';
  } catch (error) {
    console.error('Erro ao buscar dados da página inicial do Contentful:', error);
  }
};

const fetchPostsData = async () => {
  try {
    const response = await client.getEntries({
      content_type: 'blogPage'
    });
    console.log(response.items);

    // Verifica se há entradas de post suficientes
    if (response.items.length >= 1) {
      // Dados do primeiro post
      postOneTitle.value = response.items[0].fields.title || '';
      const textOne = documentToHtmlString(response.items[0].fields.body) || '';
      truncatedPostOneText.value = textOne.substring(0, 255) + '...'; // Trunca o texto

      // Dados do segundo post
      postTwoTitle.value = response.items[1].fields.title || '';
      const textTwo = documentToHtmlString(response.items[1].fields.body) || '';
      truncatedPostTwoText.value = textTwo.substring(0, 255) + '...'; // Trunca o texto
    } else {
      console.warn('Não foram encontradas entradas de post suficientes.');
    }
  } catch (error) {
    console.error('Erro ao buscar dados do post do Contentful:', error);
  }
};

// Função para buscar dados do projeto
const fetchProjectsData = async () => {
  try {
    const response = await client.getEntries({
      content_type: 'projectPage'
    });

    // Verifica se há entradas de projeto suficientes
    if (response.items.length >= 1) {
      // Dados do primeiro projeto
      projectOneTitle.value = response.items[0].fields.title || '';
      const textOne = documentToHtmlString(response.items[0].fields.description) || '';
      truncatedProjectOneText.value = textOne.substring(0, 255) + '...'; // Trunca o texto
      projectOneImage.value = response.items[0].fields.banner?.fields.file.url || '';

      // Dados do segundo projeto
      projectTwoTitle.value = response.items[1].fields.title || '';
      const textTwo = documentToHtmlString(response.items[1].fields.description) || '';
      truncatedProjectTwoText.value = textTwo.substring(0, 255) + '...'; // Trunca o texto
      projectTwoImage.value = response.items[1].fields.image?.fields.file.url || '';
    } else {
      console.warn('Não foram encontradas entradas de projeto suficientes.');
    }
  } catch (error) {
    console.error('Erro ao buscar dados do projeto do Contentful:', error);
  }
};

// Função para redirecionar para a página de um projeto específico
const goToProject = (projectId) => {
  router.push({ name: 'project', params: { id: projectId } });
};

// Função para buscar todos os dados
const fetchData = async () => {
  try {
    await fetchHomeData();
    await fetchProjectsData();
    await fetchPostsData();
  } catch (error) {
    console.error('Erro ao buscar dados do Contentful:', error);
  }
};

// Busca os dados quando o componente é montado
onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="container my-5">
    <!-- Seção "Sobre" -->
    <section>
      <h2 class="mb-4">{{ aboutTitle }}</h2>
      <div v-html="aboutText" class="mb-5"></div> <!-- Renderiza HTML para o conteúdo -->
    </section>

    <!-- Seção "O que eu faço" -->
    <section>
      <h2 class="mb-4">{{ whatIDoTitle }}</h2>
      <div v-html="whatIDoText" class="mb-5"></div> <!-- Renderiza HTML para o conteúdo -->
    </section>

    <!-- Seção "Portfólio" -->
    <section>
      <h2 class="mb-4">Portfólio</h2>

      <!-- Projetos -->
      <div class="row">
        <!-- Primeiro projeto -->
        <div class="col-md-6 mb-4">
          <h3>{{ projectOneTitle }}</h3>
          <div v-html="truncatedProjectOneText" class="mb-3"></div> <!-- Renderiza o texto truncado -->
          <router-link to="/project" class="btn btn-primary mb-3" v-if="projectOneImage">Ver mais</router-link>
          <img v-if="projectOneImage" :src="projectOneImage" alt="Project One" class="img-fluid rounded" />
        </div>

        <!-- Segundo projeto -->
        <div class="col-md-6 mb-4">
          <h3>{{ projectTwoTitle }}</h3>
          <div v-html="truncatedProjectTwoText" class="mb-3"></div> <!-- Renderiza o texto truncado -->
          <router-link to="/project" class="btn btn-primary mb-3" v-if="projectTwoImage">Ver mais</router-link>
          <img v-if="projectTwoImage" :src="projectTwoImage" alt="Project Two" class="img-fluid rounded" />
        </div>
      </div>
    </section>
    <!-- Seção "Posts" -->
    <section>
      <h2 class="mb-4">Posts</h2>

      <!-- Posts -->
      <div class="row">
        <!-- Primeiro post -->
        <div class="col-md-6 mb-4">
          <h3>{{ postOneTitle }}</h3>
          <div v-html="truncatedPostOneText" class="mb-3"></div> <!-- Renderiza o texto truncado -->
          <router-link v-if="postOneTitle" to="/posts" class="btn btn-primary mb-3">Ver mais</router-link>
        </div>

        <!-- Segundo post -->
        <div class="col-md-6 mb-4">
          <h3>{{ postTwoTitle }}</h3>
          <div v-html="truncatedPostTwoText" class="mb-3"></div> <!-- Renderiza o texto truncado -->
          <router-link v-if="postTwoTitle" to="/posts" class="btn btn-primary mb-3">Ver mais</router-link>
        </div>
      </div>
    </section>
  </div>
</template>
