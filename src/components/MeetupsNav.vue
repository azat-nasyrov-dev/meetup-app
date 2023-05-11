<template>
  <nav class="nav">
    <RouterLink v-if="$route.meta.showReturnToMeetups" :to="{ name: 'meetups' }" class="nav__link">
      &larr; Вернуться к списку
    </RouterLink>
    <template v-if="!isAuthenticated">
      <RouterLink :to="{ name: 'login' }" class="nav__link">Вход</RouterLink>
      <RouterLink :to="{ name: 'register' }" class="nav__link">Регистрация</RouterLink>
    </template>
    <template v-else>
      <RouterLink :to="{ name: 'meetups', query: { participation: 'attending' } }" class="nav__link">
        Мои митапы
      </RouterLink>
      <RouterLink :to="{ name: 'meetups', query: { participation: 'organizing' } }" class="nav__link">
        Организуемые митапы
      </RouterLink>
      <RouterLink :to="{ name: 'meetup-create' }" class="nav__link">Создать митап</RouterLink>
      <a href="#" class="nav__link" @click.prevent="logout">{{ user.fullname }} (выйти)</a>
    </template>
    <RouterLink :to="{ name: 'demo' }" class="nav__link">🎨 Components Demo</RouterLink>
    <a href="/api" class="nav__link" target="_blank">📄 API Docs</a>
  </nav>
</template>

<script>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/useAuthStore.js';
import { logout } from '../services/authService.js';

export default {
  name: 'MeetupsNav',

  setup() {
    const { user, isAuthenticated } = storeToRefs(useAuthStore());

    return {
      user,
      isAuthenticated,
      logout,
    };
  },
};
</script>

<style scoped>
/* _nav.css */
.nav {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 24px;
}

.nav__link {
  font-size: 20px;
  line-height: 28px;
  color: var(--body-color);
  text-decoration: none;
  padding: 0 20px;
  position: relative;
  display: inline-flex;
}

.nav__link + .nav__link {
  margin-top: 8px;
}

.nav__link:hover {
  color: var(--blue);
}

.nav__link:before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(-2px, -50%);
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: var(--grey);
}

@media all and (min-width: 992px) {
  .nav {
    flex-direction: row;
    align-items: center;
    margin-left: 0;
  }

  .nav__link,
  .nav__link + .nav__link {
    margin-top: 0;
  }

  .nav__link:first-child:before {
    display: none;
  }
}
</style>
