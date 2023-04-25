import { fileURLToPath, URL } from 'node:url';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue(), splitVendorChunkPlugin()],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  define: {
    __VUE_PROD_DEVTOOLS__: true,
  },

  server: {
    proxy: {
      '/api': {
        target: 'https://course-vue.javascript.ru',
        // target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});

