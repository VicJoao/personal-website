import { ref } from 'vue';
import { useHead } from '@unhead/vue';
import { generateMetaTags, truncateText } from '@/utils/seo.js';

/**
 * Composable para gerenciar SEO dinâmico
 * @param {Object} initialConfig - Configuração inicial de SEO
 * @returns {Object} - Métodos para atualizar SEO
 */
export function useSEO(initialConfig = {}) {
  const seoData = ref(generateMetaTags(initialConfig));
  
  useHead(seoData);

  /**
   * Atualiza as meta tags dinamicamente
   * @param {Object} config - Nova configuração de SEO
   */
  const updateSEO = (config) => {
    seoData.value = generateMetaTags(config);
  };

  /**
   * Atualiza SEO para posts
   * @param {string} title - Título do post
   * @param {string} content - Conteúdo do post
   * @param {string} image - URL da imagem
   */
  const updatePostSEO = (title, content, image = '') => {
    const description = truncateText(content, 155);
    updateSEO({
      title: `${title} - João Victor | Blog sobre Vue.js e Desenvolvimento Web`,
      description,
      keywords: `${title}, blog desenvolvimento, Vue.js, front-end, João Victor`,
      image,
      type: 'article'
    });
  };

  /**
   * Atualiza SEO para projetos
   * @param {string} title - Título do projeto
   * @param {string} description - Descrição do projeto
   * @param {string} image - URL da imagem
   */
  const updateProjectSEO = (title, description, image = '') => {
    const truncatedDesc = truncateText(description, 155);
    updateSEO({
      title: `${title} - João Victor | Portfolio Vue.js e Desenvolvimento Web`,
      description: truncatedDesc,
      keywords: `${title}, projeto Vue.js, portfolio desenvolvedor, João Victor projeto, desenvolvimento web`,
      image,
      type: 'website'
    });
  };

  return {
    updateSEO,
    updatePostSEO,
    updateProjectSEO
  };
}
