<script setup>
import { createClient } from "contentful";
import { ref, onMounted } from "vue";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { useRouter } from "vue-router";

// Inicializa o cliente Contentful com espaço e token de acesso
const client = createClient({
  space: import.meta.env.VITE_SPACE,
  accessToken: import.meta.env.VITE_ACCESS_TOKEN,
});

// Inicializa o roteador Vue
const router = useRouter();

const aboutTitle = ref("");
const whatIDoTitle = ref("");
const projectOneTitle = ref("");
const truncatedProjectOneText = ref("");
const projectOneImage = ref("");
const projectTwoTitle = ref("");
const truncatedProjectTwoText = ref("");
const projectTwoImage = ref("");
const postOneTitle = ref("");
const truncatedPostOneText = ref("");
const postTwoTitle = ref("");
const truncatedPostTwoText = ref("");
const postTwoId = ref("");
const postOneId = ref("");
const projectOneId = ref("");
const projectTwoId = ref("");
const whatIDoText = ref("");
const aboutText = ref("");

// Função para buscar dados da página inicial
const fetchHomeData = async () => {
  try {
    const response = await client.getEntries({
      content_type: "homePage",
    });

    // Atribui os dados a variáveis reativas
    aboutTitle.value = response.items[0]?.fields?.aboutTitle || "";
    aboutText.value =
      documentToHtmlString(response.items[0]?.fields?.aboutText) || "";
    whatIDoTitle.value = response.items[0]?.fields?.whatIDoTitle || "";
    whatIDoText.value =
      documentToHtmlString(response.items[0]?.fields?.whatIDoText) || "";
    console.log(aboutText);
  } catch (error) {
    console.error(
      "Erro ao buscar dados da página inicial do Contentful:",
      error
    );
  }
};

const fetchPostsData = async () => {
  try {
    const response = await client.getEntries({
      content_type: "blogPage",
    });

    // Verifica se há entradas de post suficientes
    if (response.items.length >= 1) {
      // Dados do primeiro post
      postOneTitle.value = response.items[0].fields.title || "";
      const textOne = documentToHtmlString(response.items[0].fields.body) || "";
      truncatedPostOneText.value = textOne.substring(0, 255) + "..."; // Trunca o texto
      postOneId.value = response.items[0].sys.id || "";
    }

    if (response.items.length >= 2) {
      // Dados do segundo post
      postTwoTitle.value = response.items[1].fields.title || "";
      const textTwo = documentToHtmlString(response.items[1].fields.body) || "";
      truncatedPostTwoText.value = textTwo.substring(0, 255) + "..."; // Trunca o texto
      postTwoId.value = response.items[1].sys.id || "";
      console.log("Post Two ID:", postTwoId.value);
    } else {
      console.warn("Não foram encontradas entradas de post suficientes.");
    }
  } catch (error) {
    console.error("Erro ao buscar dados do post do Contentful:", error);
  }
};

// Função para buscar dados do projeto
const fetchProjectsData = async () => {
  try {
    const response = await client.getEntries({
      content_type: "projectPage",
    });

    if (response.items.length > 0) {
      projectOneTitle.value = response.items[0].fields.title || "";
      const textOne =
        documentToHtmlString(response.items[0].fields.description) || "";
      truncatedProjectOneText.value = textOne.substring(0, 255) + "..."; // Trunca o texto
      projectOneImage.value =
        response.items[0].fields.banner?.fields.file.url || "";
      projectOneId.value = response.items[0].sys.id || "";
    }

    if (response.items.length > 1) {
      projectTwoTitle.value = response.items[1].fields.title || "";
      const textTwo =
        documentToHtmlString(response.items[1].fields.description) || "";
      truncatedProjectTwoText.value = textTwo.substring(0, 255) + "..."; // Trunca o texto
      projectTwoImage.value =
        response.items[1].fields.banner?.fields.file.url || "";
      projectTwoId.value = response.items[1].sys.id || "";
      console.log("Project Two ID:", projectTwoId.value);
    } else {
      console.warn("Não foram encontradas entradas de projeto suficientes.");
    }
  } catch (error) {
    console.error("Erro ao buscar dados do projeto do Contentful:", error);
  }
};

const fetchData = async () => {
  try {
    await fetchHomeData();
    await fetchProjectsData();
    await fetchPostsData();
  } catch (error) {
    console.error("Erro ao buscar dados do Contentful:", error);
  }
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="container my-5">
    <section>
      <h2 class="mb-4 underlined-cont">{{ aboutTitle }}</h2>
      <div v-html="aboutText" class="mb-5"></div>
    </section>

    <section>
      <h2 class="mb-4 underlined-cont">{{ whatIDoTitle }}</h2>
      <div v-html="whatIDoText" class="mb-3"></div>
    </section>

    <section>
      <h2 class="mb-4 underlined-cont">Portfólio</h2>

      <div class="row small-row">
        <div class="row mb-4 project">
          <div class="col-auto">
            <img
              v-if="projectOneImage"
              :src="projectOneImage"
              alt="Project One"
              class="img-fluid rounded square-img"
            />
          </div>

          <div class="col">
            <h2 v-if="projectOneTitle">{{ projectOneTitle }}</h2>
            <div v-html="truncatedProjectOneText" class="mb-3"></div>
            <router-link
              v-if="projectOneId"
              :to="{ name: 'Project', params: { id: projectOneId } }"
              class="btn btn-primary mt-3"
            >
              Leia mais
            </router-link>
            <span v-else>Projeto não disponível</span>
          </div>
        </div>

        <div class="row project">
          <div class="col-auto">
            <img
              v-if="projectTwoImage"
              :src="projectTwoImage"
              alt="Project Two"
              class="img-fluid rounded square-img"
            />
          </div>

          <div class="col">
            <h2 v-if="projectTwoTitle">{{ projectTwoTitle }}</h2>
            <div v-html="truncatedProjectTwoText" class="mb-3"></div>
            <router-link
              v-if="projectTwoId"
              :to="{ name: 'Project', params: { id: projectTwoId } }"
              class="btn btn-primary mt-3"
            >
              Leia mais
            </router-link>
            <span v-else></span>
          </div>
        </div>
      </div>
      <router-link to="/projects" class="main-btn"
        >Acessar Portfolio</router-link
      >
    </section>

    <section>
      <h2 class="mb-4 underlined-cont">Posts</h2>

      <div class="row">
        <div class="row align-content-end justify-content-end">
          <h2 v-if="postOneTitle">{{ postOneTitle }}</h2>
          <div v-html="truncatedPostOneText" class="mb-3"></div>
          <router-link
            v-if="postOneId"
            :to="{ name: 'Post', params: { id: postOneId } }"
            class="btn btn-primary mt-3"
          >
            Leia mais
          </router-link>
          <span v-else>Post não disponível</span>
        </div>

        <div class="row align-content-end justify-content-end">
          <h2 v-if="postTwoTitle">{{ postTwoTitle }}</h2>
          <div v-html="truncatedPostTwoText" class="mb-3"></div>
          <router-link
            v-if="postTwoId"
            :to="{ name: 'Post', params: { id: postTwoId } }"
            class="btn btn-primary mt-3"
          >
            Leia mais
          </router-link>
          <span v-else>Post não disponível</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.underlined-cont {
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
.btn {
  background-color: #666666;
  border: 0px !important;
  font-size: 1.2em;
  color: #111111 !important;
  font-weight: bold;
  margin: 0 auto 0 0;
  width: auto;
  margin-bottom: 50px;
}
.main-btn {
  text-align: center;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  background-color: #111111;
  border: 0px !important;
  font-size: 1.2em;
  color: white;
  font-weight: bold;
  margin: 0 auto;
  width: 70%;
  display: block;
  border-radius: 0 30px 30px 0;
  padding: 10px 20px;
  cursor: pointer;
  margin-bottom: 50px;
}

/*.main-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background-color: white ;
  border: 2px solid #111111;
  border-radius: 0 30px 30px 0;
  transition: left 5s ease;
}*/

.main-btn:hover::before {
  left: 0;
}

.btn:hover {
  font-weight: bolder;
  color: #808080 !important;
}

.square-img {
  width: 11em;
  height: auto;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border: 8px solid #111111;
}
.small-row {
  max-width: 90%;
  margin: 0 auto;
}

@media (max-width: 767px) {
  .small-row {
    max-width: 100%;
  }
  .project {
    padding-bottom: 1em;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
}
</style>
