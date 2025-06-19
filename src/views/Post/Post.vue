<script>
import { createClient } from "contentful";
import { ref, onMounted } from "vue";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { useRoute } from "vue-router";
import BaseTitle from "@/components/base/BaseTitle.vue";

export default {
  name: "Post",
  setup() {
    const title = ref("");
    const body = ref("");
    const image = ref("");

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
          image.value = post.image.fields.file.url;
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
      fetchData(postId);
    });

    return {
      title,
      body,
      image,
    };
  },
};
</script>

<template>
  <div class="container">
    <img :src="image" alt="Imagem do Post" class="img-fluid banner" />
    <BaseTitle :underlined="true" :text="title" class="my-4" />
    <div class="row">
      <div class="col">
        <div v-html="body"></div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
