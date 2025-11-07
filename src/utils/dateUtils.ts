/**
 * Returns today's date with time set to 00:00:00.000
 *
 * @returns {Date} Today's date with time reset to midnight
 */
export const getToday = (): Date => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today
}

/**
 * Parses a date string in "YYYY-MM-DD" format to a Date object
 */
export const parseDate = (dateString: string | undefined): Date => {
  if (!dateString) {
    return getToday()
  }

  const [year, month, day] = dateString.split('-').map(Number)
  const date = new Date(year!, month! - 1, day)

  // Если дата невалидна - возвращаем сегодняшнюю
  return isNaN(date.getTime()) ? getToday() : date
}

/**
 * Formats a Date object to "YYYY-MM-DD" string format
 *
 * @param {Date} date - Date object to format
 * @returns {string} Date string in "YYYY-MM-DD" format
 */
export const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
