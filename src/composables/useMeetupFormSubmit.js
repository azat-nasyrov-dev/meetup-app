import { useRouter } from 'vue-router';
import { useApi } from './useApi.js';
import { postMeetup, putMeetup } from '../api/meetupsApi.js';
import { postImage } from '../api/imageApi.js';

/**
 * @param {('create'|'edit')} action
 * @return {function(newMeetup: Meetup): void}
 */

export function useMeetupFormSubmit(action) {
  const router = useRouter();

  const { request: meetupRequest } = useApi(action === 'create' ? postMeetup : putMeetup, {
    showProgress: true,
    successToast: 'Сохранено',
    errorToast: true,
  });

  const { request: imageRequest } = useApi(postImage, {
    showProgress: true,
    errorToast: true,
  });

  return async (newMeetup) => {
    if (newMeetup.imageToUpload) {
      const result = await imageRequest(newMeetup.imageToUpload);
      if (!result.success) {
        return;
      }
      newMeetup.imageId = result.data.id;
      delete newMeetup.imageToUpload;
    }
    const result = await meetupRequest(newMeetup);
    if (result.success) {
      router.push({ name: 'meetup', params: { meetupId: result.data.id } });
    }
  };
}
