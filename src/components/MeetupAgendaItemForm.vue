<template>
  <fieldset class="agenda-item-form">
    <button type="button" class="agenda-item-form__remove-button" @click="$emit('remove')">
      <UiIcon icon="trash" />
    </button>

    <UiFormGroup>
      <UiDropdown v-model="localAgendaItem.type" title="Тип" :options="$options.agendaItemOptions" name="type" />
    </UiFormGroup>

    <div class="agenda-item-form__row">
      <div class="agenda-item-form__col">
        <UiFormGroup label="Начало">
          <UiInput v-model="localAgendaItem.startsAt" type="time" placeholder="00:00" name="startsAt" />
        </UiFormGroup>
      </div>
      <div class="agenda-item-form__col">
        <UiFormGroup label="Окончание">
          <UiInput v-model="localAgendaItem.endsAt" type="time" placeholder="00:00" name="endsAt" />
        </UiFormGroup>
      </div>
    </div>

    <UiFormGroup v-for="(spec, field) in schema" :key="field" :label="spec.label">
      <component :is="spec.component" v-model="localAgendaItem[field]" v-bind="spec.props" />
    </UiFormGroup>
  </fieldset>
</template>

<script>
import UiIcon from './UiIcon.vue';
import UiFormGroup from './UiFormGroup.vue';
import UiInput from './UiInput.vue';
import UiDropdown from './UiDropdown.vue';
import { agendaItemOptions, talkLanguageOptions } from '../services/meetupService.js';

/**
 * @typedef FormItemSchema
 * @property {string} label
 * @property {string|object} component
 * @property {object} props
 */
/** @typedef {string} AgendaItemField */
/** @typedef {string} AgendaItemType */
/** @typedef {Object.<AgendaItemType, FormItemSchema>} FormSchema */

/** @type FormSchema */

const commonAgendaItemFormSchema = {
  title: {
    label: 'Нестандартный текст (необязательно)',
    component: 'ui-input',
    props: {
      name: 'title',
    },
  },
};

/** @type {Object.<AgendaItemField, FormSchema>} */

const agendaItemFormSchemas = {
  registration: commonAgendaItemFormSchema,
  opening: commonAgendaItemFormSchema,
  talk: {
    title: {
      label: 'Тема',
      component: 'ui-input',
      props: {
        name: 'title',
      },
    },
    speaker: {
      label: 'Докладчик',
      component: 'ui-input',
      props: {
        name: 'speaker',
      },
    },
    description: {
      label: 'Описание',
      component: 'ui-input',
      props: {
        multiline: true,
        name: 'description',
      },
    },
    language: {
      label: 'Язык',
      component: 'ui-dropdown',
      props: {
        options: talkLanguageOptions,
        title: 'Язык',
        name: 'language',
      },
    },
  },
  break: commonAgendaItemFormSchema,
  coffee: commonAgendaItemFormSchema,
  closing: commonAgendaItemFormSchema,
  afterparty: commonAgendaItemFormSchema,
  other: {
    title: {
      label: 'Заголовок',
      component: 'ui-input',
      props: {
        name: 'title',
      },
    },
    description: {
      label: 'Описание',
      component: 'ui-input',
      props: {
        multiline: true,
        name: 'description',
      },
    },
  },
};

export default {
  name: 'MeetupAgendaItemForm',

  components: { UiIcon, UiFormGroup, UiInput, UiDropdown },

  agendaItemOptions,
  agendaItemFormSchemas,

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  emits: ['update:agendaItem', 'remove'],

  data() {
    return {
      localAgendaItem: { ...this.agendaItem },
    };
  },

  computed: {
    startsAt() {
      return this.localAgendaItem.startsAt;
    },

    schema() {
      return agendaItemFormSchemas[this.localAgendaItem.type];
    },
  },

  watch: {
    localAgendaItem: {
      deep: true,
      handler() {
        this.$emit('update:agendaItem', { ...this.localAgendaItem });
      },
    },

    startsAt(newValue, oldValue) {
      // Если время не введено или введено не до конца, браузер вернёт пустую строку (при поддержке time)
      // Но Safari не поддерживает input[type=time] :(
      // Придётся проверять
      if (!/([0-1]\d|2[0-3]):[0-5]\d/.test(newValue)) {
        return;
      }
      // Разделяем время на часы и минуты и переводим в минуты
      const timeToMinutes = (time) => {
        const [h, m] = time.split(':').map((x) => parseInt(x, 10));
        return h * 60 + m;
      };
      const newMinutes = timeToMinutes(newValue);
      const oldMinutes = timeToMinutes(oldValue);
      const oldEndsAtMinutes = timeToMinutes(this.localAgendaItem.endsAt);
      // Считаем изменение времени в минутах
      const deltaMinutes = newMinutes - oldMinutes;
      // Считаем новое значение
      const newEndsAtMinutes = (oldEndsAtMinutes + deltaMinutes + 24 * 60) % (24 * 60);
      // Пересчитываем обратно в часы и минуты
      const hours = Math.floor(newEndsAtMinutes / 60)
        .toString()
        .padStart(2, '0');
      const minutes = Math.floor(newEndsAtMinutes % 60)
        .toString()
        .padStart(2, '0');
      this.localAgendaItem.endsAt = `${hours}:${minutes}`;
    },
  },
};
</script>

<style scoped>
/* _agenda-item-form.css */
.agenda-item-form {
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  position: relative;
  padding: 20px 10% 0 16px;
}

.agenda-item-form__remove-button {
  position: absolute;
  top: 4px;
  right: 0;
  box-shadow: none;
  border: none;
  background-color: transparent;
  outline: none;
  padding: 4px;
  cursor: pointer;
  transition: 0.2s opacity;
}

.agenda-item-form__remove-button:hover {
  opacity: 0.6;
}

.agenda-item-form__row {
  display: flex;
  flex-direction: column;
}

.agenda-item-form__col + .agenda-item-form__col {
  margin-top: 16px;
}

.agenda-item-form__col:first-child {
  margin-left: 0;
}

@media all and (min-width: 992px) {
  .agenda-item-form {
    padding: 28px 25% 4px 24px;
  }

  .agenda-item-form__remove-button {
    top: 20px;
    right: 20px;
  }

  .agenda-item-form__row {
    flex-direction: row;
    justify-content: space-between;
    margin: 0 -12px;
  }

  .agenda-item-form__col {
    flex: 1 1 auto;
    padding: 0 12px;
  }

  .agenda-item-form__col + .agenda-item-form__col {
    margin-top: 0;
  }

  .agenda-item-form__col:first-child {
    margin-left: 0;
  }
}
</style>
