// Configurações centralizadas de SEO
export const seoConfig = {
  defaultTitle: "João Victor | Desenvolvedor Front-end Vue e Headless CMS (Contentful)",
  defaultDescription: "João Victor - Desenvolvedor Front-end especializado em Vue.js e Headless CMS (Contentful). Criação de sites modernos, rápidos e otimizados para SEO.",
  defaultKeywords: "desenvolvedor front-end, Vue.js, Contentful, headless CMS, desenvolvimento web, portfolio, João Victor",
  author: "João Victor",
  baseUrl: "https://joaovictor.dev", // Substitua pela URL real do site
  
  // Configurações das páginas
  pages: {
    home: {
      title: "João Victor | Desenvolvedor Front-end Vue e Headless CMS (Contentful)",
      description: "João Victor - Desenvolvedor Front-end especializado em Vue.js e Headless CMS (Contentful). Criação de sites modernos, rápidos e otimizados para SEO.",
      keywords: "desenvolvedor front-end, Vue.js, Contentful, headless CMS, desenvolvimento web, portfolio, João Victor"
    },
    contact: {
      title: "Contato - João Victor | Desenvolvedor Front-end Vue & Headless CMS",
      description: "Entre em contato com João Victor, desenvolvedor front-end especializado em Vue.js e Contentful. Pronto para dar vida ao seu próximo projeto web.",
      keywords: "contato desenvolvedor, João Victor contato, Vue.js developer, Contentful specialist, desenvolvimento web"
    },
    portfolio: {
      title: "Portfólio - João Victor | Projetos Vue.js & Headless CMS",
      description: "Conheça os projetos desenvolvidos por João Victor. Aplicações web modernas criadas com Vue.js, Vite, Contentful e outras tecnologias front-end.",
      keywords: "portfolio desenvolvedor, projetos Vue.js, aplicações web, Contentful projects, João Victor portfolio, desenvolvimento front-end"
    },
    blog: {
      title: "Blog - João Victor | Artigos sobre Vue.js e Desenvolvimento Web",
      description: "Artigos e tutoriais sobre Vue.js, Contentful, desenvolvimento front-end e as melhores práticas em programação web por João Victor.",
      keywords: "blog desenvolvimento, Vue.js tutoriais, Contentful articles, front-end blog, João Victor blog, programação web"
    }
  }
};

// Helper para truncar texto preservando palavras
export const truncateText = (text, maxLength = 160) => {
  if (!text) return "";
  
  // Remove tags HTML
  const cleanText = text.replace(/<[^>]*>/g, '');
  
  if (cleanText.length <= maxLength) return cleanText;
  
  // Trunca preservando palavras
  const truncated = cleanText.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > maxLength * 0.8 
    ? truncated.substring(0, lastSpace) + '...'
    : truncated + '...';
};
