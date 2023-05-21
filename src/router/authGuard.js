import { useAuthStore } from '../stores/useAuthStore.js';

/** @implements {import('vue-router').NavigationGuard} */

export function authGuard(to) {
  if (to.meta.requireAuth && !useAuthStore().isAuthenticated) {
    return { name: 'login', query: { from: to.fullPath } };
  }

  if (to.meta.requireGuest && useAuthStore().isAuthenticated) {
    return { name: 'index' };
  }

  return true;
}
