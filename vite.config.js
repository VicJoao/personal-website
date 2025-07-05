import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: '/',
  build: {
    // Otimizações para melhor performance
    rollupOptions: {
      output: {
        // Chunking automático otimizado
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    },
    // Minificação e otimização
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // Otimização de imagens
    assetsInlineLimit: 4096,
    cssCodeSplit: true
  },
  ssgOptions: {
    script: 'async',
    formatting: 'minify'
  },
  // Otimização de assets
  assetsInclude: ['**/*.webp', '**/*.avif']
})
