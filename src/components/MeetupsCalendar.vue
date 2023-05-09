<template>
  <UiCalendarView v-slot="{ timestamp }">
    <UiCalendarEvent
      v-for="meetup in meetupsByDate[timestamp]"
      :key="meetup.id"
      tag="RouterLink"
      :to="{ name: 'meetup', param: { meetupId: meetup.id } }"
    >
      {{ meetup.title }}
    </UiCalendarEvent>
  </UiCalendarView>
</template>

<script>
import UiCalendarEvent from './UiCalendarEvent.vue';
import UiCalendarView from './UiCalendarView.vue';
export default {
  name: 'MeetupsCalendar',

  components: {
    UiCalendarEvent,
    UiCalendarView,
  },

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  computed: {
    meetupsByDate() {
      const result = {};
      for (const meetup of this.meetups) {
        if (!result[meetup.date]) {
          result[meetup.date] = [meetup];
        } else {
          result[meetup.date].push(meetup);
        }
      }
      return result;
    },
  },
};
</script>

<style scoped></style>
