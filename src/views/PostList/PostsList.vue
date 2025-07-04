<script setup>
import { createClient } from "contentful";
import { ref, onMounted, onUnmounted } from "vue";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { useHead } from "@unhead/vue";
import { seoConfig } from "@/utils/seo.js";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseImage from "@/components/base/BaseImage.vue";

// Meta tags otimizadas para página do Blog
useHead({
  title: seoConfig.pages.blog.title,
  meta: [
    {
      name: "description",
      content: seoConfig.pages.blog.description
    },
    {
      name: "keywords",
      content: seoConfig.pages.blog.keywords
    },
    {
      name: "author",
      content: seoConfig.author
    },
    {
      property: "og:title",
      content: seoConfig.pages.blog.title
    },
    {
      property: "og:description",
      content: seoConfig.pages.blog.description
    },
    {
      property: "og:type",
      content: "website"
    },
    {
      name: "twitter:card",
      content: "summary_large_image"
    },
    {
      name: "twitter:title",
      content: seoConfig.pages.blog.title
    },
    {
      name: "twitter:description",
      content: seoConfig.pages.blog.description
    }
  ]
});

const posts = ref([]);
const isMobile = ref(false);

const fetchData = async () => {
  try {
    const client = createClient({
      space: import.meta.env.VITE_SPACE,
      accessToken: import.meta.env.VITE_ACCESS_TOKEN,
    });

    const response = await client.getEntries({
      content_type: "blogPage",
    });

    posts.value = response.items;
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
    <h1 class="my-4">Posts</h1>
    <div class="row">
      <div class="col">
        <div v-for="post in posts" :key="post.sys.id" class="container mb-5">
          <!-- Banner apenas em mobile -->
          <BaseImage
            v-if="isMobile && post.fields.image.fields.file.url"
            :src="post.fields.image.fields.file.url"
            alt="Imagem do Post"
            formato="banner"
            largura="100%"
            class="banner"
            style="margin-top: 20px"
          />

          <!-- Corpo do post -->
          <div
            class="post-item d-flex flex-column flex-md-row align-items-center justify-content-between"
          >
            <!-- Miniatura apenas em desktop -->
            <BaseImage
              v-if="!isMobile && post.fields.image?.fields?.file"
              :src="post.fields.image.fields.file.url"
              alt="Miniatura do post"
              formato="miniatura"
              largura="250px"
              class="me-3"
            />

            <div class="flex-grow-1 d-flex flex-column">
              <h2 class="underlined-cont">{{ post.fields.title }}</h2>
              <div v-html="truncate(documentToHtmlString(post.fields.body))" />
              <div class="text-end mt-auto">
                <BaseButton
                  type="link"
                  :to="{ name: 'Post', params: { id: post.sys.id } }"
                >
                  Leia mais
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
.post-item {
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

/* Mobile Layout */
@media (max-width: 900px) {
  .post-item {
    flex-direction: column;
  }

  .me-3 {
    margin-right: 0 !important;
    margin-bottom: 16px;
  }
}
</style>
