<script setup>
const { t, locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const colorMode = useColorMode()

const otherLocale = computed(() => locales.value.find(item => item.code !== locale.value))
const isDark = computed(() => colorMode.value === 'dark')

function toggleTheme() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}

function print() {
  window.print()
}
</script>

<template>
  <nav class="toolbar" :aria-label="t('toolbar.label')">
    <NuxtLink
      v-if="otherLocale"
      class="toolbar__item"
      :to="switchLocalePath(otherLocale.code)"
      :lang="otherLocale.language"
      :hreflang="otherLocale.language"
      :aria-label="t('toolbar.languageLabel')"
    >
      {{ t('toolbar.language') }}
    </NuxtLink>

    <ClientOnly>
      <button type="button" class="toolbar__item" @click="toggleTheme">
        <svg v-if="isDark" class="toolbar__icon" viewBox="0 0 20 20" aria-hidden="true">
          <circle cx="10" cy="10" r="3.5" />
          <path d="M10 1.5v2.5M10 16v2.5M1.5 10H4M16 10h2.5M4 4l1.8 1.8M14.2 14.2 16 16M4 16l1.8-1.8M14.2 5.8 16 4" />
        </svg>
        <svg v-else class="toolbar__icon" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M16.5 12.3A7 7 0 0 1 7.7 3.5a7 7 0 1 0 8.8 8.8Z" />
        </svg>
        {{ isDark ? t('toolbar.themeToLight') : t('toolbar.themeToDark') }}
      </button>
      <template #fallback>
        <span class="toolbar__item toolbar__item--placeholder" aria-hidden="true">{{ t('toolbar.themeToDark') }}</span>
      </template>
    </ClientOnly>

    <button type="button" class="toolbar__item" @click="print">
      <svg class="toolbar__icon" viewBox="0 0 20 20" aria-hidden="true">
        <path d="M5.5 7V2.5h9V7M5.5 14.5h-3v-7h15v7h-3M5.5 11.5h9v6h-9z" />
      </svg>
      {{ t('toolbar.print') }}
    </button>
  </nav>
</template>

<style scoped>
.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.toolbar__item {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  min-height: 2.5rem;
  padding: 0.45rem 0.85rem;
  border: 1px solid var(--c-line);
  border-radius: 999px;
  background: var(--c-surface);
  color: var(--c-ink);
  font: inherit;
  font-size: 0.875rem;
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  transition: border-color 0.15s, background-color 0.15s;
}

.toolbar__item:hover {
  border-color: var(--c-accent);
}

.toolbar__item--placeholder {
  visibility: hidden;
}

.toolbar__icon {
  width: 1rem;
  height: 1rem;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>
