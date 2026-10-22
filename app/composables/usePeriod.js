/**
 * Formatting and positioning helpers for `{ y, m? }` dates.
 */
export function usePeriod() {
  const { t, localeProperties } = useI18n()

  // Frozen at render time and serialized into the payload, so the prerendered
  // HTML and the hydrated client agree on "now".
  const now = useState('period-now', () => {
    const date = new Date()
    return { y: date.getUTCFullYear(), m: date.getUTCMonth() + 1 }
  })

  const monthFormatter = computed(() => new Intl.DateTimeFormat(localeProperties.value.language, {
    month: 'short',
    timeZone: 'UTC',
  }))

  function formatPoint(point) {
    if (!point.m) return String(point.y)
    const month = monthFormatter.value.format(new Date(Date.UTC(point.y, point.m - 1, 1))).replace(/\.$/, '')
    return `${month} ${point.y}`
  }

  function format(start, end) {
    return `${formatPoint(start)} – ${end ? formatPoint(end) : t('date.present')}`
  }

  function toIso(point) {
    return point.m ? `${point.y}-${String(point.m).padStart(2, '0')}` : String(point.y)
  }

  /**
   * Decimal year for plotting. Year-only end dates are placed mid-year, since
   * the source does not say when in that year a position ended.
   */
  function toDecimal(point, { isEnd = false } = {}) {
    if (!point) return now.value.y + (now.value.m - 1) / 12
    if (point.m) return point.y + (point.m - (isEnd ? 0 : 1)) / 12
    return point.y + (isEnd ? 0.5 : 0)
  }

  return { now, format, formatPoint, toIso, toDecimal }
}
