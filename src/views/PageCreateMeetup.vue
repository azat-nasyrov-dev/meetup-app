<template>
  <MeetupForm :meetup="meetup" submit-text="Создать" @submit="handleSubmit" @cancel="$router.push({ name: 'index' })" />
</template>

<script>
import { ref } from 'vue';
import { useHead } from '@vueuse/head';
import LayoutMeetupForm from '../components/LayoutMeetupForm.vue';
import MeetupForm from '../components/MeetupForm.vue';
import { createMeetup } from '../services/meetupService.js';
import { useLayout } from '../composables/useLayout.js';
import { useMeetupFormSubmit } from '../composables/useMeetupFormSubmit.js';

export default {
  name: 'PageCreateMeetup',

  components: {
    MeetupForm,
  },

  setup() {
    useLayout(LayoutMeetupForm, { title: 'Создание митапа' });
    useHead({ title: 'Создание митапа' });

    const meetup = ref(createMeetup());

    const handleSubmit = useMeetupFormSubmit('create');

    return {
      meetup,
      handleSubmit,
    };
  },
};
</script>

<style scoped></style>
