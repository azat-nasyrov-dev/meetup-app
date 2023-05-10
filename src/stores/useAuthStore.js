import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { getUser } from '../api/authApi.js';
import { persistUser, restoreUser } from '../services/authService.js';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(restoreUser());
  const isAuthenticated = computed(() => !!user.value);

  const setUser = (value) => {
    user.value = value;
    persistUser(user.value);
  };

  const refreshUser = async () => {
    const result = await getUser();
    if (result.success) {
      setUser(result.data);
    }
  };

  return {
    user,
    isAuthenticated,
    setUser,
    refreshUser,
  };
});
