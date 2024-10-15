<template>
  <div class="container">
    <img :src="image" alt="Imagem do Post" class="img-fluid banner" />
    <h1 class="my-4 underlined-cont">{{ title }}</h1>
    <div class="row">
      <div class="col">
        <div v-html="body"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { createClient } from "contentful";
import { ref, onMounted } from 'vue';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { useRoute } from 'vue-router';

export default {
  name: 'Post', // Nome do componente
  setup() {
    const title = ref('');
    const body = ref('');
    const image = ref('');

    const fetchData = async (postId) => {
      try {
        const client = createClient({
          space: import.meta.env.VITE_SPACE,
          accessToken: import.meta.env.VITE_ACCESS_TOKEN
        });

        // Busca um único post pelo ID
        const response = await client.getEntries({
          content_type: 'blogPage',
          'sys.id': postId // Filtra pelo ID do post
        });

        if (response.items.length > 0) {
          const post = response.items[0].fields; // Acessa o primeiro post encontrado
          title.value = post.title;
          body.value = documentToHtmlString(post.body);
          image.value = post.image.fields.file.url;
        } else {
          console.warn('Post não encontrado');
        }
      } catch (error) {
        console.error('Erro ao buscar dados do Contentful:', error);
      }
    };

    // Obtém o ID da URL e chama a função de busca
    onMounted(() => {
      const route = useRoute(); // Acessa os parâmetros da rota
      const postId = route.params.id; // Obtém o ID da URL
      fetchData(postId); // Chama a função com o ID do post
    });

    return {
      title,
      body,
      image,
    };
  }
}
</script>

<style scoped>
/* Adicione estilos personalizados aqui, se necessário */
</style>
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

.banner{
  width: 60%;
  height: auto;
  margin: 20px 20%;
  border: 8px solid #111111;
}
*{
  font-size: 1.1em;
  text-align: justify;
}
@media (max-width: 767px) {
  .banner{
    width: 100%;
    margin: 20px 0;
  }
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