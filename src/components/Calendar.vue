<template>
  <div class="calendar__container">
    <div class="calendar__header">
      <button
        class="calendar-arrow calendar-arrow--prev"
        @click="prevMonth"
        type="button"
      >
        <div class="calendar-arrow__icon calendar-arrow__icon--left"></div>
      </button>

      <span>{{ currentMonthName }} {{ currentYear }}</span>
      <button
        class="calendar-arrow calendar-arrow--next"
        @click="nextMonth"
        type="button"
      >
        <div class="calendar-arrow__icon calendar-arrow__icon--right"></div>
      </button>
    </div>
    <div class="calendar__weekdays">
      <div
        v-for="weekDay in weekDays"
        :key="weekDay"
      >
        {{ weekDay }}
      </div>
    </div>
    <div class="calendar__days">
      <div
        v-for="(day, i) in calendarDays"
        :key="i"
        :class="{
          'month-current': day.isCurrentMonth,
          selected: day.isSelected,
        }"
        @click="selectDate(day)"
      >
        {{ day.date.getDate() }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, watch } from 'vue'
  import { parseDate, formatDate, getToday } from '../utils/dateUtils'

  const props = withDefaults(
    defineProps<{
      modelValue?: string
      locale?: string
      initialDate?: string
    }>(),
    {
      locale: 'ru-RU',
    },
  )

  const emit = defineEmits<{
    (e: 'update:modelValue', modelValue: string): void
  }>()

  const initialDate = parseDate(props.initialDate || props.modelValue)

  const currentMonth = ref(initialDate.getMonth())
  const currentYear = ref(initialDate.getFullYear())

  const selectedDate = computed(() => {
    if (!props.modelValue) {
      const defaultDate = props.initialDate ? parseDate(props.initialDate) : getToday()
      const defaultDateStr = formatDate(defaultDate)
      emit('update:modelValue', defaultDateStr)
      return defaultDate
    }

    return parseDate(props.modelValue)
  })

  const weekDays = computed(() => {
    const baseDate = new Date(Date.UTC(2024, 0, 1))
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(baseDate)
      date.setUTCDate(baseDate.getUTCDate() + i)
      return date.toLocaleDateString(props.locale, { weekday: 'short' })
    })
  })

  const currentMonthName = computed(() => {
    return new Date(currentYear.value, currentMonth.value).toLocaleDateString(props.locale, { month: 'long' })
  })

  const calendarDays = computed(() => {
    const firstDay = new Date(currentYear.value, currentMonth.value, 1)
    const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0)

    let startDay = firstDay.getDay() - 1
    if (startDay < 0) startDay = 6

    const days = []

    for (let i = 0; i < startDay; i++) {
      const date = new Date(currentYear.value, currentMonth.value, -(startDay - i - 1))
      days.push(createDayObject(date, false))
    }

    for (let d = 1; d <= lastDay.getDate(); d++) {
      const date = new Date(currentYear.value, currentMonth.value, d)
      days.push(createDayObject(date, true))
    }

    const totalCells = 42
    while (days.length < totalCells) {
      const nextMonthDay: number = days.length - lastDay.getDate() - startDay + 1
      const date = new Date(currentYear.value, currentMonth.value + 1, nextMonthDay)
      days.push(createDayObject(date, false))
    }

    return days
  })

  const createDayObject = (date: Date, isCurrentMonth: boolean) => {
    date.setHours(0, 0, 0, 0)
    return {
      date,
      isCurrentMonth,
      isSelected: date.getTime() === selectedDate.value.getTime(),
    }
  }

  const prevMonth = () => {
    if (currentMonth.value === 0) {
      currentMonth.value = 11
      currentYear.value--
    } else {
      currentMonth.value--
    }
  }

  const nextMonth = () => {
    if (currentMonth.value === 11) {
      currentMonth.value = 0
      currentYear.value++
    } else {
      currentMonth.value++
    }
  }

  const selectDate = (day: { date: Date; isCurrentMonth: boolean }) => {
    if (!day.isCurrentMonth) {
      currentMonth.value = day.date.getMonth()
      currentYear.value = day.date.getFullYear()
    }

    emit('update:modelValue', formatDate(day.date))
  }

  watch(
    () => props.modelValue,
    (newValue) => {
      if (newValue) {
        const date = parseDate(newValue)
        currentMonth.value = date.getMonth()
        currentYear.value = date.getFullYear()
      }
    },
  )

  watch(
    () => props.initialDate,
    (newValue) => {
      if (newValue && !props.modelValue) {
        const date = parseDate(newValue)
        currentMonth.value = date.getMonth()
        currentYear.value = date.getFullYear()
        emit('update:modelValue', formatDate(date))
      }
    },
  )
</script>

<style lang="postcss">
  .calendar {
    &__container {
      min-width: 300px;
      margin: 0 auto;
      margin-bottom: 60px;
    }

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 8px;
      gap: 16px;

      & > span {
        text-transform: capitalize;
        flex: 1;
        text-align: center;
        font-weight: 500;
      }
    }

    &-arrow {
      background: none;
      border: none;
      padding: 8px 12px;
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 40px;
      min-height: 40px;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }

      &:active {
        background-color: rgba(255, 255, 255, 0.2);
      }

      &__icon {
        width: 0;
        height: 0;
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;

        &--left {
          border-right: 8px solid #fff;
          margin-left: -2px;
        }

        &--right {
          border-left: 8px solid #fff;
          margin-right: -2px;
        }
      }
    }

    &__weekdays {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      margin-bottom: 8px;
      border-bottom: 1px solid rgb(147 197 253 / 0.5);

      & > div {
        font-weight: bold;
        padding: 8px 0;
        text-align: center;
        font-size: 0.8em;
        color: #666;
        text-transform: capitalize;
      }
    }

    &__days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);

      & > div {
        text-align: center;
        cursor: pointer;
        transition: all 0.2s;
        min-height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #adb5bd;
        border-radius: 50%;

        &:hover {
          outline: 1px solid #007bff;
        }

        &.selected {
          background-color: #007bff;
          color: white;
        }

        &.month-current {
          color: white;
        }
      }
    }
  }
</style>
