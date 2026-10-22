import cv from '~/data/cv'

const LOCALE_KEYS = ['nl', 'en']

function isTranslation(value) {
  return value !== null
    && typeof value === 'object'
    && !Array.isArray(value)
    && Object.keys(value).every(key => LOCALE_KEYS.includes(key))
}

function localize(value, locale) {
  if (Array.isArray(value)) return value.map(item => localize(item, locale))
  if (isTranslation(value)) return value[locale] ?? value.nl
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, localize(item, locale)]))
  }
  return value
}

/**
 * CV content resolved for the active locale.
 */
export function useCv() {
  const { locale } = useI18n()
  return computed(() => localize(cv, locale.value))
}
