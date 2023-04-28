<template>
  <div class="button-group" role="group">
    <slot />
  </div>
</template>

<script>
import { computed, provide } from 'vue';

export default {
  name: 'UiButtonGroup',

  props: {
    modelValue: {
      required: true,
    },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const activeValue = computed(() => props.modelValue);
    const updateActiveValue = (value) => {
      emit('update:modelValue', value);
    };

    provide('UiButtonGroup', {
      activeValue,
      updateActiveValue,
    });
  },
};
</script>

<style scoped>
/* _button-group.css */
.button-group {
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  white-space: nowrap;
}
</style>
