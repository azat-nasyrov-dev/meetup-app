<template>
  <component :is="layout" v-bind="layoutProps">
    <slot />
  </component>
</template>

<script>
import { markRaw, provide, ref, computed } from 'vue';

export default {
  name: 'LayoutProvider',

  setup() {
    const layout = ref(null);
    const layoutProps = ref(null);

    provide('layout:set', (newLayout, newLayoutProps = null) => {
      layout.value = markRaw(newLayout);
      layoutProps.value = newLayoutProps;
    });

    provide('layout:reset', () => {
      layout.value = null;
      layoutProps.value = null;
    });

    return {
      layout: computed(() => layout.value ?? 'div'),
      layoutProps,
    };
  },
};
</script>

<style scoped></style>
