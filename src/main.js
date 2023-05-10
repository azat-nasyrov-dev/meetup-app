import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createHead } from '@vueuse/head';
import App from './App.vue';
import { router } from './router/index.js';
import { createToaster } from './plugins/toaster/index.js';
import { createProgress } from './plugins/progress/index.js';

const app = createApp(App)
  .use(createHead())
  .use(router)
  .use(createPinia())
  .use(createProgress({ router }))
  .use(createToaster())
app.mount('#app');
