const MONTHS = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
]

const MONTHS_SHORT = [
  'янв.', 'фев.', 'мар.', 'апр.', 'мая', 'июн.',
  'июл.', 'авг.', 'сен.', 'окт.', 'ноя.', 'дек.',
]

/**
 * Детерминированное форматирование даты в UTC.
 * Не зависит от таймзоны/локали окружения — одинаковый результат
 * на сервере (Docker UTC) и клиенте, что исключает hydration mismatch.
 */
export function formatDate(iso: string, short = false): string {
  const d = new Date(iso)
  const day = d.getUTCDate()
  const month = (short ? MONTHS_SHORT : MONTHS)[d.getUTCMonth()]
  const year = d.getUTCFullYear()
  return `${day} ${month} ${year}`
}
