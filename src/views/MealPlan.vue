<template>
  <div class="container mt-5">
    <h1 class="mb-4 text-center">Cardápio do Dia</h1>

    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Carregando...</span>
      </div>
    </div>

    <div v-else-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>

    <div v-else class="text-center">
      <div class="mb-4" v-if="meals['Café da Manhã'] && meals['Café da Manhã'].length > 1">
        <h2>Café da Manhã</h2>
        <ul>
          <li
              v-for="(item, index) in filteredItems(meals['Café da Manhã'].slice(1))"
              :key="index"
              class="-item"
          >
            {{ Array.isArray(item) ? item.join(', ') : item }}
          </li>
        </ul>
      </div>

      <div class="mb-4" v-if="meals['Almoço'] && meals['Almoço'].length > 1">
        <h2>Almoço</h2>
        <ul>
          <li
              v-for="(item, index) in filteredItems(meals['Almoço'].slice(1))"
              :key="index"
              class="-item"
          >
            {{ Array.isArray(item) ? item.join(', ') : item }}
          </li>
        </ul>
      </div>

      <div class="mb-4" v-if="meals['Jantar'] && meals['Jantar'].length > 1">
        <h2>Jantar</h2>
        <ul>
          <li
              v-for="(item, index) in filteredItems(meals['Jantar'].slice(1))"
              :key="index"
              class="-item"
          >
            {{ Array.isArray(item) ? item.join(', ') : item }}
          </li>
        </ul>
      </div>

      <div v-if="(!meals['Café da Manhã'] || meals['Café da Manhã'].length <= 1) &&
                  (!meals['Almoço'] || meals['Almoço'].length <= 1) &&
                  (!meals['Jantar'] || meals['Jantar'].length <= 1)">
        <p class="text-center">Nenhum item disponível para exibição.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      meals: {
        'Café da Manhã': [],
        'Almoço': [],
        'Jantar': []
      },
      loading: true,
      error: null
    };
  },
  created() {
    this.fetchMeals();
  },
  methods: {
    async fetchMeals() {
      try {
        const response = await axios.get('https://cardapioru.onrender.com/api/meals');
        this.meals['Café da Manhã'] = response.data['Café da Manhã'][0];
        this.meals['Almoço'] = response.data['Almoço'][0];
        this.meals['Jantar'] = response.data['Jantar'][0];

      } catch (err) {
        this.error = 'Erro ao carregar os dados: ' + err.message;
      } finally {
        this.loading = false;
      }
    },
    filteredItems(items) {
      // Filtra itens que sejam 'N/A' ou arrays que só contêm 'N/A'
      return items.filter(item => {
        if (Array.isArray(item)) {
          return item.join(', ') !== 'N/A';
        }
        return item !== 'N/A';
      });
    }
  }
};
</script>

<style scoped>
* {
  color: black;
  background-color: transparent;
  border: 0px;
}
li{
  list-style-type: none;
}
</style>
