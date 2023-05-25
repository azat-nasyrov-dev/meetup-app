<template>
  <MeetupForm
    v-if="meetup"
    :meetup="meetup"
    submit-text="Сохранить"
    @submit="handleSubmit"
    @cancel="$router.push({ name: 'meetup', params: { meetupId: meetupId } })"
  />
  <UiContainer v-else>
    <UiAlert>Загрузка...</UiAlert>
  </UiContainer>
</template>

<script>
import { useHead } from '@vueuse/head';
import LayoutMeetupForm from '../components/LayoutMeetupForm.vue';
import MeetupForm from '../components/MeetupForm.vue';
import UiAlert from '../components/UiAlert.vue';
import UiContainer from '../components/UiContainer.vue';
import { useLayout } from '../composables/useLayout.js';
import { useMeetupFormSubmit } from '../composables/useMeetupFormSubmit.js';
import { useMeetupFetch } from '../composables/useMeetupFetch.js';

export default {
  name: 'PageEditMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupForm,
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  setup(props) {
    useLayout(LayoutMeetupForm, { title: 'Редактирование митапа' });
    useHead({ title: 'Редактирование митапа' });

    const { meetup } = useMeetupFetch(props.meetupId);

    const handleSubmit = useMeetupFormSubmit('edit');

    return {
      meetup,
      handleSubmit,
    };
  },
};
</script>

<style scoped></style>
