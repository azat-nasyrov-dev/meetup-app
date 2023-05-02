import { createApp, inject } from 'vue';
import TheTopProgressBar from './TheTopProgressBar.vue';

export const PROGRESS_KEY = Symbol('PROGRESS_KEY');

export const PROGRESS_ROUTER_ID = Symbol('PROGRESS_ROUTER_ID');

export function useProgress() {
  return inject(PROGRESS_KEY);
}

export function createProgress({ container, router } = {}) {
  const addDefaultContainer = () => document.body.appendChild(document.createElement('div'));
  const instance = createApp(TheTopProgressBar).mount(container ?? addDefaultContainer());

  const progress = {
    start: instance.start,
    finish: instance.finish,
    fail: instance.fail,
    /** @implements {import('@vue/runtime-core').PluginInstallFunction} */
    install(app) {
      progress.isInstalled = true;
      app.provide(PROGRESS_KEY, progress);
      if (router) {
        router.beforeEach(() => {
          progress.start(PROGRESS_ROUTER_ID);
        });
        router.afterEach(() => {
          progress.finish(PROGRESS_ROUTER_ID);
        });
        router.onError(() => {
          progress.fail();
        });
      }
    },
  };

  return progress;
}
