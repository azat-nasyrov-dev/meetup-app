import { logoutUser } from '../api/authApi';

export const AUTH_STORAGE_KEY = 'user';

/**
 * Запоминает пользователя в LocalStorage
 * @param {User} user
 * @returns {void}
 */

export function persistUser(user) {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}

/**
 * Удаляет пользователя из LocalStorage
 * @returns {void}
 */

export function forgotUser() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

/**
 * Восстанавливает пользователя из LocalStorage при наличии
 * @returns {User|null}
 */

export function restoreUser() {
  const maybeUser = localStorage.getItem(AUTH_STORAGE_KEY);
  return maybeUser ? JSON.parse(maybeUser) : null;
}

export async function logout() {
  const { success } = await logoutUser();
  if (success) {
    forgotUser();
    location.reload();
  }
}
