import { inject, onActivated, onBeforeUnmount, onDeactivated } from 'vue';

export function useLayout(layout, layoutProps) {
  const setLayout = inject('layout:set');
  const resetLayout = inject('layout:reset');
  setLayout?.(layout, layoutProps);

  onBeforeUnmount(() => {
    resetLayout?.();
  });

  onActivated(() => {
    setLayout?.(layout, layoutProps);
  });

  onDeactivated(() => {
    resetLayout?.();
  });
}
