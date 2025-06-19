<script setup>
import { createClient } from "contentful";
import { ref, onMounted } from "vue";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { useRouter } from "vue-router";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseTitle from "@/components/base/BaseTitle.vue";

const client = createClient({
  space: import.meta.env.VITE_SPACE,
  accessToken: import.meta.env.VITE_ACCESS_TOKEN,
});

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

const fetchHomeData = async () => {
  try {
    const response = await client.getEntries({
      content_type: "homePage",
    });
    aboutTitle.value = response.items[0]?.fields?.aboutTitle || "";
    aboutText.value =
      documentToHtmlString(response.items[0]?.fields?.aboutText) || "";
    whatIDoTitle.value = response.items[0]?.fields?.whatIDoTitle || "";
    whatIDoText.value =
      documentToHtmlString(response.items[0]?.fields?.whatIDoText) || "";
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
    if (response.items.length >= 1) {
      postOneTitle.value = response.items[0].fields.title || "";
      const textOne = documentToHtmlString(response.items[0].fields.body) || "";
      truncatedPostOneText.value = textOne.substring(0, 255) + "...";
      postOneId.value = response.items[0].sys.id || "";
    }
    if (response.items.length >= 2) {
      postTwoTitle.value = response.items[1].fields.title || "";
      const textTwo = documentToHtmlString(response.items[1].fields.body) || "";
      truncatedPostTwoText.value = textTwo.substring(0, 255) + "...";
      postTwoId.value = response.items[1].sys.id || "";
    }
  } catch (error) {
    console.error("Erro ao buscar dados do post do Contentful:", error);
  }
};

const fetchProjectsData = async () => {
  try {
    const response = await client.getEntries({
      content_type: "projectPage",
    });
    if (response.items.length > 0) {
      projectOneTitle.value = response.items[0].fields.title || "";
      const textOne =
        documentToHtmlString(response.items[0].fields.description) || "";
      truncatedProjectOneText.value = textOne.substring(0, 255) + "...";
      projectOneImage.value =
        response.items[0].fields.banner?.fields.file.url || "";
      projectOneId.value = response.items[0].sys.id || "";
    }
    if (response.items.length > 1) {
      projectTwoTitle.value = response.items[1].fields.title || "";
      const textTwo =
        documentToHtmlString(response.items[1].fields.description) || "";
      truncatedProjectTwoText.value = textTwo.substring(0, 255) + "...";
      projectTwoImage.value =
        response.items[1].fields.banner?.fields.file.url || "";
      projectTwoId.value = response.items[1].sys.id || "";
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
    <section v-if="aboutTitle && aboutText">
      <BaseTitle :text="aboutTitle" :underlined="true" class="mb-4" />
      <div v-html="aboutText" class="mb-5"></div>
    </section>

    <section v-if="whatIDoTitle && whatIDoText">
      <BaseTitle :text="whatIDoTitle" :underlined="true" class="mb-4" />
      <div v-html="whatIDoText" class="mb-3"></div>
    </section>

    <section v-if="projectOneTitle || projectTwoTitle">
      <BaseTitle text="Portfólio" :underlined="true" class="mb-4" />
      <div class="row small-row">
        <div class="row mb-4 project" v-if="projectOneTitle">
          <div class="col-auto">
            <img
              v-if="projectOneImage"
              :src="projectOneImage"
              alt="Project One"
              class="img-fluid rounded square-img"
            />
          </div>
          <div class="col">
            <BaseTitle :text="projectOneTitle" />
            <div v-html="truncatedProjectOneText" class="mb-3"></div>
            <BaseButton
              v-if="projectOneId"
              @click="
                router.push({ name: 'Project', params: { id: projectOneId } })
              "
              class="mt-3"
            >
              Leia mais
            </BaseButton>
          </div>
        </div>
        <div class="row project" v-if="projectTwoTitle">
          <div class="col-auto">
            <img
              v-if="projectTwoImage"
              :src="projectTwoImage"
              alt="Project Two"
              class="img-fluid rounded square-img"
            />
          </div>
          <div class="col">
            <BaseTitle :text="projectTwoTitle" />
            <div v-html="truncatedProjectTwoText" class="mb-3"></div>
            <div class="text-end">
              <BaseButton
                v-if="projectTwoId"
                @click="
                  router.push({ name: 'Project', params: { id: projectTwoId } })
                "
                class="mt-3"
              >
                Leia mais
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
      <BaseButton
        class="mb-4"
        style="width: 100%"
        @click="router.push('/projects')"
      >
        Acessar Portfólio
      </BaseButton>
    </section>

    <section v-if="postOneTitle || postTwoTitle">
      <BaseTitle text="Posts" :underlined="true" class="mb-4" />
      <div class="row">
        <div
          class="row align-content-end justify-content-end"
          v-if="postOneTitle"
        >
          <BaseTitle :text="postOneTitle" />
          <div v-html="truncatedPostOneText" class="mb-3"></div>
          <!-- Posts -->
          <div class="text-end">
            <BaseButton
              v-if="postOneId"
              @click="router.push({ name: 'Post', params: { id: postOneId } })"
              class="mt-3"
            >
              Leia mais
            </BaseButton>
          </div>
        </div>
        <div
          class="row align-content-end justify-content-end"
          v-if="postTwoTitle"
        >
          <BaseTitle :text="postTwoTitle" />
          <div v-html="truncatedPostTwoText" class="mb-3"></div>
          <div class="text-end">
            <BaseButton
              v-if="postTwoId"
              @click="router.push({ name: 'Post', params: { id: postTwoId } })"
              class="mt-3"
            >
              Leia mais
            </BaseButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
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
