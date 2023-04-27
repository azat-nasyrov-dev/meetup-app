<template>
  <ul class="meetup-info">
    <li>
      <UiIcon icon="user" class="meetup-info__icon" />
      {{ organizer }}
    </li>
    <li>
      <UiIcon icon="map" class="meetup-info__icon" />
      {{ place }}
    </li>
    <li>
      <UiIcon icon="cal-lg" class="meetup-info__icon" />
      <time :datetime="isoDate">{{ localDate }}</time>
    </li>
  </ul>
</template>

<script>
import UiIcon from './UiIcon.vue';
import { formatAsIsoDate, formatAsLocalDate } from '../utils/dateUtils';

export default {
  name: 'MeetupInfo',

  components: {
    UiIcon,
  },

  props: {
    organizer: {
      type: String,
      required: true,
    },

    place: {
      type: String,
      required: true,
    },

    date: {
      type: Number,
      required: true,
    },
  },

  computed: {
    isoDate() {
      return formatAsIsoDate(this.date);
    },

    localDate() {
      return formatAsLocalDate(this.date);
    },
  },
};
</script>

<style scoped>
.meetup-info {
  margin: 0;
  padding: 0;
}

.meetup-info li {
  list-style: none;
  position: relative;
  padding-left: 36px;
  font-size: 18px;
  line-height: 28px;
  margin: 0 0 8px;
}

.meetup-info li:last-child {
  margin: 0;
}

.meetup-info__icon {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
