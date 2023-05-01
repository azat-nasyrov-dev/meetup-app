<template>
  <div class="toasts">
    <UiTransitionGroupFade>
      <slot />
    </UiTransitionGroupFade>
  </div>
</template>

<script>
import UiTransitionGroupFade from '../../components/UiTransitionGroupFade.vue';

export default {
  name: 'UiToaster',

  components: { UiTransitionGroupFade },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
