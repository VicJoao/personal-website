<script setup>
import { createClient } from "contentful";
import { ref, onMounted } from 'vue';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

const posts = ref([]);

const fetchData = async () => {
  try {
    const client = createClient({
      space: import.meta.env.VITE_SPACE,
      accessToken: import.meta.env.VITE_ACCESS_TOKEN
    });
    const response = await client.getEntries({
      content_type: 'blogPage'
    });
    posts.value = response.items;
  } catch (error) {
    console.error('Erro ao buscar dados do Contentful:', error);
  }
};

const truncate = (text) => {
  return text.slice(0, 255) + '...';
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="container">
    <h1 class="my-4">Posts</h1>
    <div class="row">
      <div class="col-md-8">
        <div v-for="post in posts" :key="post.sys.id" class="card mb-4">
          <div class="card-body">
            <h2 class="card-title">{{ post.fields.title }}</h2>
            <div v-html="truncate(documentToHtmlString(post.fields.body))"></div>
            <router-link :to="{ name: 'Post', params: { id: post.sys.id } }" class="btn btn-primary mt-3">Leia mais</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>