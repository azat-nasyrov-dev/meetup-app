import { createApp } from 'vue';
import App from './App.vue';
import { createHead } from '@vueuse/head';
import { router } from './router/index';
import { createToaster } from './plugins/toaster/index';

const app = createApp(App)
  .use(createHead())
  .use(router)
  .use(createToaster())
app.mount('#app');
