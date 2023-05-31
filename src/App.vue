<template>
  <LayoutBase>
    <LayoutProvider>
      <RouterView>
        <template #default="{ Component }">
          <KeepAlive v-if="Component" :max="3">
            <component :is="Component" />
          </KeepAlive>
        </template>
        <template #fallback>
          <UiAlert>Загрузка...</UiAlert>
        </template>
      </RouterView>
    </LayoutProvider>
  </LayoutBase>
</template>

<script>
import { useHead } from '@vueuse/head';
import LayoutBase from './components/LayoutBase.vue';
import UiAlert from './components/UiAlert.vue';
import LayoutProvider from './components/LayoutProvider.vue';
import { useToaster } from './plugins/toaster/index.js';
import { useAuthStore } from './stores/useAuthStore.js';
import { httpClient } from './api/httpClient/httpClient.js';
import { forgotUser } from './services/authService.js';

export default {
  name: 'App',

  components: {
    LayoutProvider,
    UiAlert,
    LayoutBase,
  },

  setup() {
    // Title
    useHead({
      titleTemplate: (title) => (title ? `${title} | Meetups` : 'Meetups'),
    });

    const toaster = useToaster();
    const authStore = useAuthStore();

    // HttpClient Initialization
    httpClient.onUnauthenticated(() => {
      forgotUser();
      location.reload();
    });

    httpClient.onNetworkError(() => {
      toaster.error('Проблема с интернет соединением');
    });

    // Global error handling
    const globalErrorHandler = (err) => {
      console.error(err);
      toaster.error(err.message);
    };
    window.addEventListener('error', (err) => globalErrorHandler(err));
    window.addEventListener('unhandledrejection', ({ reason: err }) => globalErrorHandler(err));

    // User refresh
    if (authStore.isAuthenticated) {
      authStore.refreshUser();
    }
  },
};
</script>

<style>
@import url('./assets/styles/_variables.css');
@import url('./assets/styles/_fonts.css');
@import url('./assets/styles/_common.css');
</style>
