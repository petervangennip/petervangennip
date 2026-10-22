<script setup>
const props = defineProps({
  /** `{ id, label, sublabel, kind: 'work' | 'education', start, end }`, oldest first. */
  items: { type: Array, required: true },
})

const { t } = useI18n()
const { format, toDecimal, now } = usePeriod()

const from = computed(() => Math.min(...props.items.map(item => item.start.y)))
const to = computed(() => toDecimal(null))
const span = computed(() => to.value - from.value)

const percentOf = value => ((value - from.value) / span.value) * 100

const rows = computed(() => props.items.map((item, index) => {
  const start = percentOf(toDecimal(item.start))
  const end = percentOf(toDecimal(item.end, { isEnd: true }))
  return {
    ...item,
    index,
    period: format(item.start, item.end),
    ongoing: !item.end,
    style: { '--start': `${start}%`, '--width': `${end - start}%`, '--i': index },
  }
}))

const ticks = computed(() => {
  const first = Math.ceil(from.value / 5) * 5
  const list = []
  for (let year = first; year <= now.value.y; year += 5) {
    list.push({ year, style: { '--at': `${percentOf(year)}%` } })
  }
  return list
})
</script>

<template>
  <figure class="timeline">
    <figcaption class="timeline__caption">
      {{ t('sections.timelineCaption', { from }) }}
      <span class="timeline__legend">
        <span class="timeline__key timeline__key--work">{{ t('timeline.work') }}</span>
        <span class="timeline__key timeline__key--education">{{ t('timeline.education') }}</span>
      </span>
    </figcaption>

    <div class="timeline__chart">
      <div class="timeline__grid" aria-hidden="true">
        <span v-for="tick in ticks" :key="tick.year" class="timeline__gridline" :style="tick.style" />
      </div>

      <ol class="timeline__rows">
        <li v-for="row in rows" :key="row.id" class="timeline__row" :class="`timeline__row--${row.kind}`">
          <a class="timeline__link" :href="`#${row.id}`">
            <span class="timeline__label">
              <span class="timeline__name">{{ row.label }}</span>
              <span class="timeline__meta">
                {{ row.period }}<span class="visually-hidden">, {{ row.sublabel }}</span>
              </span>
            </span>
            <span class="timeline__track" aria-hidden="true">
              <span class="timeline__bar" :class="{ 'timeline__bar--ongoing': row.ongoing }" :style="row.style" />
            </span>
          </a>
        </li>
      </ol>

      <div class="timeline__axis" aria-hidden="true">
        <span v-for="tick in ticks" :key="tick.year" class="timeline__tick" :style="tick.style">{{ tick.year }}</span>
      </div>
    </div>
  </figure>
</template>

<style scoped>
.timeline {
  --label-width: 15rem;
  --row-gap: 0.125rem;
  margin: 0;
}

.timeline__caption {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem 1.5rem;
  margin-bottom: 1.25rem;
  color: var(--c-ink-muted);
  font-size: 0.9375rem;
}

.timeline__legend {
  display: inline-flex;
  gap: 1rem;
}

.timeline__key {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.timeline__key::before {
  content: '';
  width: 1.25rem;
  height: 0.5rem;
  border-radius: 2px;
}

.timeline__key--work::before {
  background: var(--c-accent);
}

.timeline__key--education::before {
  background: var(--c-education);
}

.timeline__chart {
  position: relative;
}

/* Gridlines live in the track column only, so they line up with the bars. */
.timeline__grid,
.timeline__axis {
  position: absolute;
  inset: 0 0 0 var(--label-width);
  pointer-events: none;
}

.timeline__axis {
  position: relative;
  inset: auto;
  height: 1.5rem;
  margin-left: var(--label-width);
  margin-top: 0.5rem;
}

.timeline__gridline {
  position: absolute;
  top: 0;
  bottom: 2rem;
  left: var(--at);
  border-left: 1px dashed var(--c-line);
}

.timeline__tick {
  position: absolute;
  left: var(--at);
  transform: translateX(-50%);
  color: var(--c-ink-muted);
  font-size: 0.8125rem;
}

.timeline__rows {
  position: relative;
  display: grid;
  gap: var(--row-gap);
  margin: 0;
  padding: 0;
  list-style: none;
}

.timeline__link {
  display: grid;
  grid-template-columns: var(--label-width) 1fr;
  align-items: center;
  min-height: 2.75rem;
  border-radius: 4px;
  color: inherit;
  text-decoration: none;
}

.timeline__label {
  display: flex;
  flex-direction: column;
  padding-right: 1rem;
  line-height: 1.25;
}

.timeline__name {
  font-weight: 700;
}

.timeline__meta {
  color: var(--c-ink-muted);
  font-size: 0.8125rem;
}

.timeline__track {
  position: relative;
  height: 0.875rem;
}

.timeline__bar {
  position: absolute;
  inset-block: 0;
  left: var(--start);
  width: var(--width);
  min-width: 0.5rem;
  border-radius: 3px;
  background: var(--c-accent);
  transform-origin: left center;
  animation: timeline-grow 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) both;
  animation-delay: calc(var(--i) * 70ms + 150ms);
  transition: box-shadow 0.15s;
}

.timeline__row--education .timeline__bar {
  background: var(--c-education);
}

/* An open-ended position fades out instead of stopping at a hard edge. */
.timeline__bar--ongoing {
  border-radius: 3px 0 0 3px;
  mask-image: linear-gradient(to right, #000 75%, transparent);
}

.timeline__link:hover .timeline__bar,
.timeline__link:focus-visible .timeline__bar {
  box-shadow: 0 0 0 3px var(--c-accent-soft);
}

.timeline__link:hover .timeline__name {
  color: var(--c-accent);
}

@keyframes timeline-grow {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

@media (prefers-reduced-motion: reduce) {
  .timeline__bar {
    animation: none;
  }
}

@media (max-width: 40rem) {
  .timeline {
    --label-width: 0px;
    --row-gap: 0.75rem;
  }

  .timeline__link {
    grid-template-columns: 1fr;
    gap: 0.35rem;
    min-height: 0;
  }

  .timeline__label {
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    gap: 1rem;
    padding-right: 0;
  }
}

@media print {
  .timeline {
    --label-width: 11rem;
    --row-gap: 0;
  }

  .timeline__link {
    min-height: 1.6rem;
  }

  .timeline__bar {
    animation: none;
    print-color-adjust: exact;
  }

  .timeline__caption {
    display: none;
  }
}
</style>
