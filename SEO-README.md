# Sistema de SEO Otimizado

Este projeto implementa um sistema de SEO completo e otimizado para melhorar a visibilidade nos motores de busca.

## Melhorias Implementadas

### 1. Títulos Otimizados
- **Home**: "João Victor | Desenvolvedor Front-end Vue e Headless CMS (Contentful)"
- **Contato**: "Contato - João Victor | Desenvolvedor Front-end Vue & Headless CMS"
- **Portfólio**: "Portfólio - João Victor | Projetos Vue.js & Headless CMS"
- **Blog**: "Blog - João Victor | Artigos sobre Vue.js e Desenvolvimento Web"
- **Posts dinâmicos**: "{Título do Post} - João Victor | Blog sobre Vue.js e Desenvolvimento Web"
- **Projetos dinâmicos**: "{Título do Projeto} - João Victor | Portfolio Vue.js e Desenvolvimento Web"

### 2. Meta Descriptions (150-160 caracteres)
Cada página possui meta descriptions únicas e otimizadas:
- Incluem palavras-chave estratégicas
- Respeitam o limite ideal de caracteres
- São descritivas e atrativas para cliques

### 3. Meta Keywords
Palavras-chave relevantes para cada página:
- Desenvolvedor front-end
- Vue.js
- Contentful
- Headless CMS
- Desenvolvimento web
- Portfolio
- Blog

### 4. Open Graph e Twitter Cards
Implementação completa de meta tags para redes sociais:
- og:title, og:description, og:type, og:image
- twitter:card, twitter:title, twitter:description, twitter:image

### 5. Sistema Centralizado
- **`src/utils/seo.js`**: Configurações centralizadas e helpers
- **`src/composables/useSEO.js`**: Composable para SEO dinâmico
- Fácil manutenção e consistência

## Estrutura dos Arquivos

```
src/
├── utils/
│   └── seo.js              # Configurações centralizadas de SEO
├── composables/
│   └── useSEO.js           # Composable para SEO dinâmico
└── views/
    ├── Home/Home.vue       # SEO estático otimizado
    ├── Contact/Contact.vue # SEO estático otimizado
    ├── ProjectList/        # SEO estático otimizado
    ├── PostList/           # SEO estático otimizado
    ├── Project/Project.vue # SEO dinâmico baseado no conteúdo
    └── Post/Post.vue       # SEO dinâmico baseado no conteúdo
```

## Como Usar

### Para páginas estáticas:
```javascript
import { useHead } from '@unhead/vue';
import { seoConfig, generateMetaTags } from '@/utils/seo.js';

// Em setup()
useHead(generateMetaTags(seoConfig.pages.home));
```

### Para páginas dinâmicas:
```javascript
import { useSEO } from '@/composables/useSEO.js';

// Em setup()
const { updatePostSEO } = useSEO({
  title: "Post padrão - João Victor",
  description: "Descrição padrão..."
});

// Quando os dados carregarem
updatePostSEO(postTitle, postContent, postImage);
```

## Benefícios de SEO

1. **Títulos descritivos** com palavras-chave relevantes
2. **Meta descriptions** otimizadas para CTR
3. **Estrutura semântica** clara
4. **Open Graph** para compartilhamento social
5. **Twitter Cards** para melhor apresentação no Twitter
6. **Sistema modular** para fácil manutenção
7. **SEO dinâmico** para conteúdo do CMS

## Palavras-chave Estratégicas

- Desenvolvedor front-end
- Vue.js
- Contentful
- Headless CMS
- Desenvolvimento web
- Portfolio
- Blog
- JavaScript
- Vite
- SSG (Static Site Generation)

## Monitoramento

Para monitorar o desempenho do SEO:
1. Google Search Console
2. Google Analytics (já configurado)
3. Ferramentas de auditoria SEO
4. Lighthouse para Core Web Vitals
