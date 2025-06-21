<script setup>
import { createClient } from "contentful";
import { ref, onMounted, onUnmounted } from "vue";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { useRouter } from "vue-router";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseTitle from "@/components/base/BaseTitle.vue";
import BaseImage from "@/components/base/BaseImage.vue";

const router = useRouter();
const isMobile = ref(false);
const checkMobile = () => {
  isMobile.value = window.innerWidth < 900;
};

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
  fetchData();
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
});

const client = createClient({
  space: import.meta.env.VITE_SPACE,
  accessToken: import.meta.env.VITE_ACCESS_TOKEN,
});

// Todos os refs...
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

// Funções fetch iguais...
const fetchHomeData = async () => {
  const response = await client.getEntries({ content_type: "homePage" });
  const data = response.items[0]?.fields || {};
  aboutTitle.value = data.aboutTitle || "";
  aboutText.value = documentToHtmlString(data.aboutText) || "";
  whatIDoTitle.value = data.whatIDoTitle || "";
  whatIDoText.value = documentToHtmlString(data.whatIDoText) || "";
};

const fetchPostsData = async () => {
  const response = await client.getEntries({ content_type: "blogPage" });
  const items = response.items;
  if (items[0]) {
    postOneTitle.value = items[0].fields.title;
    truncatedPostOneText.value =
      documentToHtmlString(items[0].fields.body).substring(0, 255) + "...";
    postOneId.value = items[0].sys.id;
  }
  if (items[1]) {
    postTwoTitle.value = items[1].fields.title;
    truncatedPostTwoText.value =
      documentToHtmlString(items[1].fields.body).substring(0, 255) + "...";
    postTwoId.value = items[1].sys.id;
  }
};

const fetchProjectsData = async () => {
  const response = await client.getEntries({ content_type: "projectPage" });
  const items = response.items;
  if (items[0]) {
    const p = items[0];
    projectOneTitle.value = p.fields.title;
    truncatedProjectOneText.value =
      documentToHtmlString(p.fields.description).substring(0, 255) + "...";
    projectOneImage.value = p.fields.banner?.fields.file.url;
    projectOneId.value = p.sys.id;
  }
  if (items[1]) {
    const p = items[1];
    projectTwoTitle.value = p.fields.title;
    truncatedProjectTwoText.value =
      documentToHtmlString(p.fields.description).substring(0, 255) + "...";
    projectTwoImage.value = p.fields.banner?.fields.file.url;
    projectTwoId.value = p.sys.id;
  }
};

const fetchData = async () => {
  await fetchHomeData();
  await fetchProjectsData();
  await fetchPostsData();
};
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
        <!-- Projeto 1 -->
        <div class="row mb-4 project" v-if="projectOneTitle">
          <div class="col-auto">
            <BaseImage
              v-if="projectOneImage"
              :src="projectOneImage"
              :formato="isMobile ? 'banner' : 'miniatura'"
              :largura="isMobile ? '100%' : '250px'"
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

        <!-- Projeto 2 -->
        <div class="row project" v-if="projectTwoTitle">
          <div class="col-auto">
            <BaseImage
              v-if="projectTwoImage"
              :src="projectTwoImage"
              :formato="isMobile ? 'banner' : 'miniatura'"
              :largura="isMobile ? '100%' : '250px'"
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
        Acessar Portfólio Completo
      </BaseButton>
    </section>

    <section v-if="postOneTitle || postTwoTitle">
      <BaseTitle text="Posts" :underlined="true" class="mb-4" />
      <div class="row">
        <!-- Post 1 -->
        <div
          class="row align-content-end justify-content-end"
          v-if="postOneTitle"
        >
          <BaseTitle :text="postOneTitle" />
          <div v-html="truncatedPostOneText" class="mb-3"></div>
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

        <!-- Post 2 -->
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
