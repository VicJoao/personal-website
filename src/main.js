import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './router'

// Configuração do vite-ssg
export const createApp = ViteSSG(
  App,
  { 
    routes,
    base: import.meta.env.VITE_BASE_URL || '/'
  },
  ({ app, router, routes, isClient, initialState }) => {
    // Importar Bootstrap apenas no cliente
    if (isClient) {
      import("bootstrap/dist/css/bootstrap.min.css");
      import("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }
)
