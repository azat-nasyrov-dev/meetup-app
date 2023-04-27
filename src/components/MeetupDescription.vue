<template>
  <p class="meetup-description">{{ description }}</p>
</template>

<script>
export default {
  name: 'MeetupDescription',

  props: {
    description: {
      type: String,
    },
  },
};
</script>

<style scoped>
/* _meetup-description.css */
.meetup-description {
  padding-top: 33px;
  margin-bottom: 24px;
  font-size: 18px;
  line-height: 28px;
  white-space: pre-wrap;
}
</style>
