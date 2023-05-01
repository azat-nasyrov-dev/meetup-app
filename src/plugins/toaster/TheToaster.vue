<template>
  <UiToaster>
    <UiToast v-for="toast in toasts" :key="toast.id" :type="toast.type">
      {{ toast.message }}
    </UiToast>
  </UiToaster>
</template>

<script>
import UiToaster from './UiToaster.vue';
import UiToast from './UiToast.vue';
import { onBeforeUnmount, ref } from 'vue';

const DELAY = 5000;

let lastToastId = 1;

export default {
  name: 'TheToaster',

  components: {
    UiToaster,
    UiToast,
  },

  expose: ['success', 'error'],

  setup() {
    const toasts = ref(new Set());

    const success = (message) => {
      addToast('success', message);
    };

    const error = (message) => {
      addToast('error', message);
    };

    const addToast = (type, message, delay = DELAY) => {
      const id = lastToastId++;
      const toast = { id, type, message };
      toast.timeoutId = setTimeout(() => {
        toasts.value.delete(toast);
      }, delay);
      toasts.value.add(toast);
    };

    onBeforeUnmount(() => {
      for (const toast of toasts.value) {
        clearTimeout(toast.timeoutId);
      }
    });

    return {
      toasts,
      success,
      error,
    };
  },
};
</script>

<style scoped>
/* _toaster.css */
</style>
