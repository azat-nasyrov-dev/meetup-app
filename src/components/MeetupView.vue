<template>
  <div>
    <MeetupCover :title="meetup.title" :image="meetup.image" />

    <UiContainer>
      <div class="meetup">
        <div class="meetup__content">
          <slot />
        </div>
        <div class="meetup__aside">
          <MeetupInfo :organizer="meetup.organizer" :place="meetup.place" :date="meetup.date" />
          <div v-if="isAuthenticated" class="meetup__aside-buttons">
            <template v-if="meetup.organizing">
              <UiButton
                tag="RouterLink"
                variant="primary"
                :to="{ name: 'meetup-edit', params: { meetupId: meetup.id } }"
                class="meetup__aside-button"
              >
                Редактировать
              </UiButton>
              <UiButton
                variant="danger"
                class="meetup__aside-button"
                :disabled="deleteIsLoading"
                @click="handleDeleteMeetup"
              >Удалить</UiButton
              >
            </template>
            <template v-else>
              <UiButton
                v-if="attending"
                variant="secondary"
                :disabled="toggleAttendIsLoading"
                class="meetup__aside-button"
                @click="handleAttendToggle"
              >Отменить участие</UiButton
              >
              <UiButton
                v-else
                variant="primary"
                :disabled="toggleAttendIsLoading"
                class="meetup__aside-button"
                @click="handleAttendToggle"
              >
                Участвовать
              </UiButton>
            </template>
          </div>
        </div>
      </div>
    </UiContainer>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import MeetupCover from './MeetupCover.vue';
import MeetupInfo from './MeetupInfo.vue';
import UiContainer from './UiContainer.vue';
import UiButton from './UiButton.vue';
import { useAuthStore } from '../stores/useAuthStore.js';
import { useApi } from '../composables/useApi.js';
import { attendMeetup, deleteMeetup, leaveMeetup } from '../api/meetupsApi.js';

export default {
  name: 'MeetupView',

  components: {
    UiButton,
    MeetupCover,
    MeetupInfo,
    UiContainer,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const router = useRouter();
    const { isAuthenticated } = storeToRefs(useAuthStore());
    const { isLoading: deleteIsLoading, request: deleteMeetupRequest } = useApi(deleteMeetup, {
      showProgress: true,
      successToast: 'Митап удалён',
      errorToast: true,
    });
    const { isLoading: attendIsLoading, request: attendMeetupRequest } = useApi(attendMeetup, {
      showProgress: true,
      successToast: 'Сохранено',
      errorToast: true,
    });
    const { isLoading: leaveIsLoading, request: leaveMeetupRequest } = useApi(leaveMeetup, {
      showProgress: true,
      successToast: 'Сохранено',
      errorToast: true,
    });
    const attending = ref(props.meetup.attending);

    const toggleAttendIsLoading = computed(() => attendIsLoading.value || leaveIsLoading.value);

    const handleDeleteMeetup = async () => {
      if (confirm('Удалить митап?')) {
        const result = await deleteMeetupRequest(props.meetup.id);
        if (result.success) {
          router.push({ name: 'meetups' });
        }
      }
    };

    const handleAttendToggle = async () => {
      if (attending.value) {
        const { success } = await leaveMeetupRequest(props.meetup.id);
        if (success) {
          attending.value = false;
        }
      } else {
        const { success } = await attendMeetupRequest(props.meetup.id);
        if (success) {
          attending.value = true;
        }
      }
    };

    return {
      isAuthenticated,
      deleteIsLoading,
      handleDeleteMeetup,
      handleAttendToggle,
      toggleAttendIsLoading,
      attending,
    };
  },
};
</script>

<style scoped>
.meetup {
  display: flex;
  flex-direction: column;
  margin: 48px 0 0;
}

.meetup__content {
}

.meetup__aside {
  margin: 40px 0;
}

.meetup__aside-buttons {
  padding: 0 0 0 34px;
  margin-top: 16px;
}

.meetup__aside-button {
  margin: 0 10px 10px 0;
}

@media all and (min-width: 992px) {
  .meetup {
    flex-direction: row;
  }

  .meetup__content {
    flex: 1 0 calc(100% - 350px);
  }

  .meetup__aside {
    flex: 1 0 350px;
    padding: 50px 0 0 44px;
    margin: 0;
  }
}
</style>
