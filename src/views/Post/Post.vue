<template>
  <div class="container">
    <div
      class="d-flex flex-column flex-md-row align-items-center justify-content-between mb-4"
      style="margin-top: 20px"
    >
      <BaseImage
        v-if="isMobile && image"
        :src="image"
        alt="Miniatura do post"
        formato="miniatura"
        largura="250px"
        class="me-3"
      />
      <BaseImage
        v-if="!isMobile && image"
        :src="image"
        alt="Imagem do Post"
        formato="banner"
        largura="100%"
        class="banner"
        style="margin-top: 20px"
      />
    </div>

    <BaseTitle v-if="title" :underlined="true" :text="title" class="my-4" />

    <div class="row">
      <div class="col">
        <div v-html="body"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { createClient } from "contentful";
import { ref, onMounted, onUnmounted } from "vue";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { useRoute } from "vue-router";
import BaseTitle from "@/components/base/BaseTitle.vue";
import BaseImage from "@/components/base/BaseImage.vue";

export default {
  name: "Post",
  components: {
    BaseTitle,
    BaseImage,
  },
  setup() {
    const title = ref("");
    const body = ref("");
    const image = ref("");
    const isMobile = ref(false);

    const checkMobile = () => {
      isMobile.value = window.innerWidth < 900;
    };

    const fetchData = async (postId) => {
      try {
        const client = createClient({
          space: import.meta.env.VITE_SPACE,
          accessToken: import.meta.env.VITE_ACCESS_TOKEN,
        });

        const response = await client.getEntries({
          content_type: "blogPage",
          "sys.id": postId,
        });

        if (response.items.length > 0) {
          const post = response.items[0].fields;
          title.value = post.title;
          body.value = documentToHtmlString(post.body);

          if (post.image?.fields?.file?.url) {
            image.value = post.image.fields.file.url;
          } else {
            console.warn("Imagem não encontrada no post");
          }
        } else {
          console.warn("Post não encontrado");
        }
      } catch (error) {
        console.error("Erro ao buscar dados do Contentful:", error);
      }
    };

    onMounted(() => {
      const route = useRoute();
      const postId = route.params.id;

      if (postId) {
        fetchData(postId);
      }

      checkMobile();
      window.addEventListener("resize", checkMobile);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", checkMobile);
    });

    return {
      title,
      body,
      image,
      isMobile,
    };
  },
};
</script>
