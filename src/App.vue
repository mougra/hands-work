<template>
  <Calendar
    v-model="selectedDate"
    :locale="currentLocale"
    :initial-date="initialDate"
  />
  <div class="calendar__additional">
    <span v-if="selectedDate">Дата: {{ selectedDate }}</span>
    <select
      v-model="currentLocale"
      class="locale-select"
      name="locale"
    >
      <option value="ru-RU">Русский</option>
      <option value="en-US">English</option>
    </select>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import Calendar from './components/Calendar.vue'

  const selectedDate = ref()
  const currentLocale = ref('ru-RU')
  // const initialDate = '1994-01-22'
  const initialDate = ''
</script>

<style lang="postcss" scoped>
  .calendar__additional {
    display: flex;
    justify-content: space-around;

    & select {
      width: 100px;
      padding: 4px;
    }

    & option {
      padding: 4px;
    }
  }
</style>
