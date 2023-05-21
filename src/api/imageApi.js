import { httpClient } from './httpClient/httpClient.js';

/**
 * Загрузить изображение
 * @param {File} file - HTML File с изображением
 * @returns {Promise<ResultContainer<ImageDto>>}
 */

export function postImage(file) {
  const formData = new FormData();
  formData.append('file', file);
  return httpClient.post('/images/upload', formData);
}
