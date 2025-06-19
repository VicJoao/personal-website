<script setup>
import { createClient } from "contentful";
import { ref, onMounted } from "vue";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import BaseButton from "@/components/base/BaseButton.vue";

const posts = ref([]);

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

const truncate = (text) => {
  return text.slice(0, 255) + "...";
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="container">
    <h1 class="my-4">Posts</h1>
    <div class="row">
      <div class="col">
        <div v-for="post in posts" :key="post.sys.id" class="container">
          <div class="col mb-5">
            <h2 class="underlined-cont">{{ post.fields.title }}</h2>
            <div
              v-html="truncate(documentToHtmlString(post.fields.body))"
            ></div>
            <div class="text-end">
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
</template>

<style scoped></style>
