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
      <div class="col">
        <div v-for="post in posts" :key="post.sys.id" class="container">
          <div class="col">
            <h2 class="underlined-cont">{{ post.fields.title }}</h2>
            <div v-html="truncate(documentToHtmlString(post.fields.body))"></div>
            <router-link :to="{ name: 'Post', params: { id: post.sys.id } }" class="btn btn-primary mt-3">Leia mais</router-link>
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
  background-color: #666666;
  border: 0px!important;
  font-size: 1.2em;
  color: #111111 !important;
  font-weight: bold;
  margin: 0 auto 0 0;
  width: auto;
  margin-bottom: 60px;
}
.btn:hover{
  font-weight: bolder;
  color: #808080 !important;
}
*{
  font-size: 1.1em;
}
p{
  text-align: justify !important;
}
@media (max-width: 767px) {
  h1 {
    font-size: 2em;
  }
  h2 {
    font-size: 1.5em;
  }
  *{
    font-size: 1em;
  }
}
</style>