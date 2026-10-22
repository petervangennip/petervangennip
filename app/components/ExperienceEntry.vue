<script setup>
defineProps({
  id: { type: String, required: true },
  title: { type: String, required: true },
  organisation: { type: String, required: true },
  start: { type: Object, required: true },
  end: { type: Object, default: null },
  highlights: { type: Array, default: () => [] },
  summary: { type: String, default: '' },
  compact: { type: Boolean, default: false },
})

const { t } = useI18n()
const { formatPoint, toIso } = usePeriod()
</script>

<template>
  <article :id="id" class="entry" :class="{ 'entry--compact': compact }">
    <header class="entry__header">
      <h3 class="entry__title">
        {{ title }}
        <span class="entry__organisation">{{ organisation }}</span>
      </h3>
      <p class="entry__period">
        <time :datetime="toIso(start)">{{ formatPoint(start) }}</time>
        –
        <time v-if="end" :datetime="toIso(end)">{{ formatPoint(end) }}</time>
        <template v-else>{{ t('date.present') }}</template>
      </p>
    </header>

    <p v-if="summary" class="entry__summary">{{ summary }}</p>
    <ul v-if="highlights.length" class="entry__highlights">
      <li v-for="(highlight, index) in highlights" :key="index">{{ highlight }}</li>
    </ul>
  </article>
</template>

<style scoped>
.entry {
  scroll-margin-top: 2rem;
}

.entry:target .entry__title {
  color: var(--c-accent);
}

.entry__header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.25rem 1.5rem;
  margin-bottom: 0.75rem;
}

.entry__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.375rem;
  font-weight: 650;
  line-height: 1.2;
  letter-spacing: -0.01em;
  transition: color 0.2s;
}

.entry__organisation {
  display: block;
  margin-top: 0.15rem;
  color: var(--c-ink-muted);
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0;
}

.entry__period {
  margin: 0;
  color: var(--c-ink-muted);
  font-size: 0.9375rem;
  white-space: nowrap;
}

.entry__summary {
  margin: 0;
  max-width: 62ch;
}

.entry__highlights {
  display: grid;
  gap: 0.5rem;
  max-width: 62ch;
  margin: 0;
  padding-left: 1.1rem;
}

.entry__highlights li::marker {
  color: var(--c-accent);
}

.entry--compact .entry__title {
  font-size: 1.125rem;
}

.entry--compact .entry__header {
  margin-bottom: 0.35rem;
}

@media print {
  .entry {
    break-inside: avoid;
  }

  .entry__title {
    font-size: 1.05rem;
  }

  .entry__highlights {
    gap: 0.15rem;
  }
}
</style>
