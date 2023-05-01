import { createApp } from 'vue';
import App from './App.vue';
import { createHead } from '@vueuse/head';
import { router } from './router/index';

const app = createApp(App)
  .use(createHead())
  .use(router)
app.mount('#app');
