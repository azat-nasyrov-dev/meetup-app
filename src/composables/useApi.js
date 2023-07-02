import { ref } from 'vue';
import { useToaster } from '../plugins/toaster/index.js';
import { useProgress } from '../plugins/progress/index.js';

export function useApi(apiFunc, { showProgress = false, successToast = false, errorToast = false } = {}) {
  const toaster = useToaster();
  const progress = useProgress();

  /**
   * @typedef {Function} DecoratedCallBack
   */

  /**
   * Запустить асинхронную функцию с отображением прогресса
   * @param {T} func
   * @returns {T}
   * @template {Function} T
   */

  function withProgress(func) {
    return async (...args) => {
      progress.start(func);
      try {
        const result = await func(...args);
        progress.finish(func);
        return result;
      } catch (error) {
        progress.fail();
        throw error;
      }
    };
  }

  /**
   * Показать тост по результату в ResultContainer
   * @param {ResultContainer} result
   * @returns {ResultContainer}
   */

  function toastResult(result) {
    if (result.success && successToast) {
      toaster.success(successToast === true ? result.data.message || result.data : successToast);
    } else if (!result.success && errorToast) {
      toaster.error(errorToast === true ? result.error.message : errorToast);
    }
  }

  const result = ref(null);
  const isLoading = ref(false);

  const request = async (...args) => {
    isLoading.value = true;
    const requester = showProgress ? withProgress(apiFunc) : apiFunc;
    result.value = await requester(...args);
    isLoading.value = false;
    toastResult(result.value);
    return result.value;
  };

  return {
    request,
    result,
    isLoading,
  };
}
