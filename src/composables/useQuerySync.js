import { watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export function useQuerySync(query, defaults = {}) {
  const router = useRouter();
  const route = useRoute();

  watch(
    route,
    () => {
      for (const key of Object.keys(query)) {
        query[key].value = route.query[key] ?? defaults[key];
      }
    },
    { immediate: true, deep: true },
  );

  watch(
    () => Object.values(query),
    () => {
      const newQuery = {};
      for (const key of Object.keys(query)) {
        newQuery[key] = query[key].value !== defaults[key] ? query[key].value : undefined;
      }
      router.replace({ query: newQuery });
    },
    { deep: true },
  );

  return query;
}
