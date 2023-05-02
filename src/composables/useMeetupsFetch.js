import { onMounted, ref } from 'vue';
import { useApi } from './useApi';
import { getMeetups } from '../api/meetupsApi';

export function useMeetupsFetch() {
  const meetups = ref(null);
  const { request, result } = useApi(getMeetups);

  onMounted(async () => {
    await request();
    meetups.value = result.value.data;
  });

  return {
    meetups,
  };
}
