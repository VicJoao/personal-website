/**
 * Composable para otimizar o carregamento de imagens
 * Implementa lazy loading e otimizações de performance
 */

import { ref, onMounted, nextTick } from 'vue'

export function useImageOptimization() {
  const loadedImages = ref(new Set())
  const imageObserver = ref(null)

  // Função para lazy loading de imagens
  const setupLazyLoading = () => {
    if (typeof window === 'undefined') return
    
    // Usar Intersection Observer para lazy loading
    if ('IntersectionObserver' in window) {
      imageObserver.value = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target
            if (img.dataset.src) {
              img.src = img.dataset.src
              img.classList.add('loaded')
              loadedImages.value.add(img.src)
              imageObserver.value.unobserve(img)
            }
          }
        })
      }, {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
      })
    }
  }

  // Função para preload de imagens críticas
  const preloadCriticalImages = (urls) => {
    if (typeof window === 'undefined') return
    
    urls.forEach(url => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = url
      link.type = 'image/webp'
      document.head.appendChild(link)
    })
  }

  // Função para otimizar imagens de fundo
  const optimizeBackgroundImage = (element, imageUrl) => {
    if (typeof window === 'undefined') return
    
    // Aplicar lazy loading para imagens de fundo
    if ('IntersectionObserver' in window) {
      const backgroundObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = new Image()
            img.onload = () => {
              entry.target.style.backgroundImage = `url(${imageUrl})`
              entry.target.classList.add('background-loaded')
            }
            img.src = imageUrl
            backgroundObserver.unobserve(entry.target)
          }
        })
      }, {
        root: null,
        rootMargin: '100px',
        threshold: 0.1
      })
      
      backgroundObserver.observe(element)
    } else {
      // Fallback para navegadores sem suporte
      element.style.backgroundImage = `url(${imageUrl})`
    }
  }

  // Função para criar versões responsivas das imagens
  const createResponsiveImageUrl = (baseUrl, width) => {
    // Se usando Contentful, adicionar parâmetros de otimização
    if (baseUrl.includes('contentful.com')) {
      return `${baseUrl}?w=${width}&fm=webp&q=80`
    }
    return baseUrl
  }

  // Detectar WebP support
  const supportsWebP = ref(false)
  
  const checkWebPSupport = () => {
    if (typeof window === 'undefined') return
    
    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = 1
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = 'rgba(0,0,0,0.5)'
    ctx.fillRect(0, 0, 1, 1)
    
    supportsWebP.value = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0
  }

  onMounted(() => {
    nextTick(() => {
      setupLazyLoading()
      checkWebPSupport()
    })
  })

  return {
    loadedImages,
    imageObserver,
    setupLazyLoading,
    preloadCriticalImages,
    optimizeBackgroundImage,
    createResponsiveImageUrl,
    supportsWebP,
    checkWebPSupport
  }
}
