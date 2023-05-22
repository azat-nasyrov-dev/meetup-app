<template>
  <UiInput :model-value="value" :type="type" @input="handleInput">
    <template v-for="slot in Object.keys($slots)" #[slot]>
      <slot :name="slot" />
    </template>
  </UiInput>
</template>

<script>
import UiInput from './UiInput.vue';

export default {
  name: 'UiInputDate',

  components: { UiInput },

  props: {
    modelValue: Number,

    type: {
      type: String,
      default: 'date',
      validator: (type) => ['date', 'datetime-local', 'time'].includes(type),
    },

    step: {
      type: [Number, String],
    },
  },

  emits: ['update:modelValue'],

  computed: {
    value() {
      // No value - empty string
      if (typeof this.modelValue === 'undefined' || this.modelValue === null) {
        return '';
      }

      // YYYY-MM-DDTHH:MM:SS.mssZ
      const date = new Date(this.modelValue).toISOString();

      if (this.type === 'date') {
        return date.substring(0, 10); // YYYY-MM-DD
      } else if (this.type === 'datetime-local') {
        return date.substring(0, 16); // YYYY-MM-DDTHH:MM
      } else if (this.type === 'time') {
        return this.step && this.step % 60 !== 0
          ? date.substring(11, 19) // HH:MM:SS
          : date.substring(11, 16); // HH:MM
      }

      return '';
    },
  },

  methods: {
    handleInput($event) {
      this.$emit('update:modelValue', $event.target.value !== '' ? $event.target.valueAsNumber : null);
    },
  },
};
</script>
