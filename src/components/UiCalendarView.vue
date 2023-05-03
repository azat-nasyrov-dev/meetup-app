<template>
  <div class="calendar-view">
    <div class="calendar-view__controls">
      <div class="calendar-view__controls-inner">
        <button
          class="calendar-view__control-left"
          type="button"
          aria-label="Previous month"
          @click.stop="setPreviousMonth"
        ></button>
        <div class="calendar-view__date">{{ localDate }}</div>
        <button
          class="calendar-view__control-right"
          type="button"
          aria-label="Next month"
          @click.stop="setNextMonth"
        ></button>
      </div>
    </div>

    <div class="calendar-view__grid">
      <div
        v-for="cell in calendarCells"
        :key="cell.timestamp"
        class="calendar-view__cell"
        :class="{ 'calendar-view__cell_inactive': !cell.isCurrentMonth }"
        :aria-label="cell.localDateString"
        tabindex="0"
      >
        <div class="calendar-view__cell-day">{{ cell.date }}</div>
        <div class="calendar-view__cell-content">
          <slot
            :timestamp="cell.timestamp"
            :year="cell.year"
            :month="cell.month"
            :date="cell.date"
            :inactive="!cell.isCurrentMonth"
          ></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addDays, addMonths, getFirstDateOfMonth, getLastDateOfMonth, getWeekday } from '../utils/dateUtils.js';

export default {
  name: 'UiCalendarView',

  data() {
    return {
      currentDate: getFirstDateOfMonth(new Date()),
    };
  },

  computed: {
    localDate() {
      return this.currentDate.toLocaleDateString(navigator.language, {
        month: 'long',
        year: 'numeric',
      });
    },

    calendarCells() {
      const lastDateOfMonth = getLastDateOfMonth(this.currentDate);
      const startDate = addDays(this.currentDate, -(getWeekday(this.currentDate) - 1));
      const finishDate = addDays(lastDateOfMonth, 7 - getWeekday(lastDateOfMonth));

      const cells = [];

      for (let dayOfCalendar = startDate; dayOfCalendar <= finishDate; dayOfCalendar = addDays(dayOfCalendar, 1)) {
        cells.push({
          timestamp: +dayOfCalendar,
          year: dayOfCalendar.getUTCFullYear(),
          month: dayOfCalendar.getUTCMonth(),
          date: dayOfCalendar.getUTCDate(),
          isCurrentMonth: dayOfCalendar.getUTCMonth() === this.currentDate.getUTCMonth(),
          localDateString: dayOfCalendar.toLocaleDateString(navigator.language, { dateStyle: 'long' }),
        });
      }

      return cells;
    },
  },

  methods: {
    setPreviousMonth() {
      this.currentDate = addMonths(this.currentDate, -1);
    },

    setNextMonth() {
      this.currentDate = addMonths(this.currentDate, 1);
    },
  },
};
</script>

<style scoped>
/* _calendar-view.css */
.calendar-view {
}

.calendar-view__controls {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.calendar-view__controls-inner {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}

.calendar-view__controls-inner button {
  border: none;
  padding: 0;
}

.calendar-view__control-left,
.calendar-view__control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('../assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.calendar-view__control-left:hover,
.calendar-view__control-right:hover {
  opacity: 0.8;
}

.calendar-view__control-right {
  transform: rotate(180deg);
}

.calendar-view__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

.calendar-view__grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

.calendar-view__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.calendar-view__cell.calendar-view__cell_inactive {
  background-color: var(--grey-light);
}

@media all and (max-width: 767px) {
  .calendar-view__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .calendar-view__grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .calendar-view__cell {
    height: 144px;
  }

  .calendar-view__cell:nth-child(7n + 1) {
    border-left: none;
  }
}
</style>
