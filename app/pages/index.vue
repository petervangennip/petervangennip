<script setup>
const { t, locale } = useI18n()
const cv = useCv()
const { now } = usePeriod()
const config = useRuntimeConfig()
const localePath = useLocalePath()

const timelineItems = computed(() => {
  const work = [...cv.value.experience, ...cv.value.earlyCareer].map(item => ({
    id: item.id,
    label: item.company,
    sublabel: item.title,
    kind: 'work',
    start: item.start,
    end: item.end,
  }))
  const education = cv.value.education.map(item => ({
    id: item.id,
    label: item.institution,
    sublabel: item.programme,
    kind: 'education',
    start: item.start,
    end: item.end,
  }))
  return [...work, ...education].sort((a, b) => a.start.y - b.start.y || (a.start.m ?? 0) - (b.start.m ?? 0))
})

const updated = computed(() => new Intl.DateTimeFormat(locale.value, { month: 'long', year: 'numeric', timeZone: 'UTC' })
  .format(new Date(Date.UTC(now.value.y, now.value.m - 1, 1))))

const personSchema = computed(() => {
  const current = cv.value.experience.find(item => !item.end)
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: cv.value.name,
    jobTitle: cv.value.role,
    description: cv.value.profile,
    url: new URL(localePath('/'), config.public.siteUrl).href,
    sameAs: [cv.value.linkedin],
    image: new URL(cv.value.photo.src, config.public.siteUrl).href,
    address: { '@type': 'PostalAddress', addressLocality: 'Best', addressCountry: 'NL' },
    worksFor: current ? { '@type': 'Organization', name: current.company } : undefined,
    alumniOf: cv.value.education.map(item => ({ '@type': 'EducationalOrganization', name: item.institution })),
    knowsAbout: cv.value.skills.flatMap(group => group.items),
    knowsLanguage: ['nl', 'en'],
  }
})

useHead(() => ({
  script: [{ key: 'person-schema', type: 'application/ld+json', innerHTML: JSON.stringify(personSchema.value) }],
}))
</script>

<template>
  <div class="page">
    <header class="hero">
      <AppToolbar class="hero__toolbar" />

      <div class="hero__body">
        <NuxtPicture
          class="hero__photo"
          format="avif,webp"
          :src="cv.photo.src"
          :alt="cv.photo.alt"
          :width="cv.photo.width"
          :height="cv.photo.height"
          sizes="112px sm:160px lg:272px"
          densities="x1 x2"
          :img-attrs="{ class: 'hero__photo-img', fetchpriority: 'high' }"
          preload
        />

        <div class="hero__intro">
          <h1 class="hero__name">{{ cv.name }}</h1>
          <p class="hero__role">
            {{ cv.role }}
            <span class="hero__focus">{{ cv.focus }}</span>
          </p>
        </div>
      </div>

      <dl class="hero__contact">
        <div>
          <dt>{{ t('contact.linkedin') }}</dt>
          <dd><a :href="cv.linkedin" rel="me noopener" target="_blank">linkedin.com/in/petervangennip</a></dd>
        </div>        <div>
          <dt>{{ t('contact.location') }}</dt>
          <dd>{{ cv.location }}</dd>
        </div>
      </dl>
    </header>

    <main id="main" tabindex="-1">
      <section class="section section--profile" aria-labelledby="profile-title">
        <h2 id="profile-title" class="visually-hidden">{{ t('sections.profile') }}</h2>
        <p class="profile">{{ cv.profile }}</p>
      </section>

      <section class="section" aria-labelledby="timeline-title">
        <h2 id="timeline-title" class="section__title">{{ t('sections.timeline') }}</h2>
        <CareerTimeline :items="timelineItems" />
      </section>

      <div class="columns">
        <div class="columns__main">
          <section class="section" aria-labelledby="experience-title">
            <h2 id="experience-title" class="section__title">{{ t('sections.experience') }}</h2>
            <div class="stack stack--loose">
              <ExperienceEntry
                v-for="item in cv.experience"
                :id="item.id"
                :key="item.id"
                :title="item.title"
                :organisation="item.company"
                :start="item.start"
                :end="item.end"
                :highlights="item.highlights"
              />
            </div>
          </section>

          <section class="section" aria-labelledby="early-career-title">
            <h2 id="early-career-title" class="section__title">{{ t('sections.earlyCareer') }}</h2>
            <div class="stack">
              <ExperienceEntry
                v-for="item in cv.earlyCareer"
                :id="item.id"
                :key="item.id"
                :title="item.title"
                :organisation="item.company"
                :start="item.start"
                :end="item.end"
                :summary="item.summary"
                compact
              />
            </div>
          </section>

          <section class="section" aria-labelledby="education-title">
            <h2 id="education-title" class="section__title">{{ t('sections.education') }}</h2>
            <div class="stack">
              <ExperienceEntry
                v-for="item in cv.education"
                :id="item.id"
                :key="item.id"
                :title="item.programme"
                :organisation="item.institution"
                :start="item.start"
                :end="item.end"
                compact
              />
            </div>
          </section>
        </div>

        <aside class="columns__aside">
          <section class="section" aria-labelledby="skills-title">
            <h2 id="skills-title" class="section__title">{{ t('sections.skills') }}</h2>
            <div class="stack">
              <div v-for="group in cv.skills" :key="group.id" class="skill-group">
                <h3 class="skill-group__title">{{ group.title }}</h3>
                <ul class="skill-group__list">
                  <li v-for="skill in group.items" :key="skill">{{ skill }}</li>
                </ul>
              </div>
            </div>
          </section>

          <section class="section" aria-labelledby="languages-title">
            <h2 id="languages-title" class="section__title">{{ t('sections.languages') }}</h2>
            <dl class="languages">
              <div v-for="language in cv.languages" :key="language.id">
                <dt>{{ language.name }}</dt>
                <dd>{{ language.level }}</dd>
              </div>
            </dl>
          </section>
        </aside>
      </div>
    </main>

    <footer class="footer">
      <p>{{ cv.name }}</p>
      <p>{{ t('footer.updated', { date: updated }) }}</p>
    </footer>
  </div>
</template>

<style scoped>
.page {
  width: min(100% - 2 * var(--gutter), 72rem);
  margin-inline: auto;
}

/* Hero */

.hero {
  padding-block: clamp(1.5rem, 4vw, 2.5rem) clamp(2.5rem, 7vw, 5rem);
}

.hero__toolbar {
  justify-content: flex-end;
  margin-bottom: clamp(3rem, 10vw, 7rem);
}

.hero__body {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  grid-template-areas: 'intro photo';
  align-items: end;
  gap: clamp(1.5rem, 4vw, 3rem);
}

.hero__intro {
  grid-area: intro;
}

.hero__photo {
  grid-area: photo;
  display: block;
  width: 7rem;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 6px;
  background: #000;
}

.hero__photo :deep(.hero__photo-img) {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__name {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(3rem, 10vw, 7.25rem);
  font-weight: 800;
  line-height: 0.92;
  letter-spacing: -0.045em;
  text-wrap: balance;
}

.hero__role {
  margin: clamp(1rem, 2.5vw, 1.75rem) 0 0;
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 2.6vw, 1.75rem);
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.01em;
  color: var(--c-accent);
}

.hero__focus {
  display: block;
  color: var(--c-ink-muted);
  font-weight: 400;
}

.hero__contact {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 2.5rem;
  margin: clamp(2rem, 5vw, 3rem) 0 0;
}

.hero__contact dt {
  color: var(--c-ink-muted);
  font-size: 0.8125rem;
}

.hero__contact dd {
  margin: 0;
}

/* Sections */

.section {
  padding-block: clamp(2rem, 5vw, 3.5rem);
  border-top: 1px solid var(--c-line);
}

.section--profile {
  padding-top: clamp(2rem, 5vw, 3rem);
}

.section__title {
  margin: 0 0 1.75rem;
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.profile {
  max-width: 34em;
  margin: 0;
  font-size: clamp(1.1875rem, 2vw, 1.4375rem);
  line-height: 1.55;
  text-wrap: pretty;
}

.columns {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 20rem);
  column-gap: clamp(2rem, 6vw, 5rem);
}

.columns__aside .section__title {
  font-size: 1.375rem;
}

.stack {
  display: grid;
  gap: 1.75rem;
}

.stack--loose {
  gap: 2.75rem;
}

/* Skills */

.skill-group__title {
  margin: 0 0 0.6rem;
  font-size: 0.9375rem;
  font-weight: 700;
}

.skill-group__list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.skill-group__list li {
  padding: 0.2rem 0.55rem;
  border: 1px solid var(--c-line);
  border-radius: 4px;
  background: var(--c-surface);
  font-size: 0.875rem;
  line-height: 1.4;
}

/* Languages */

.languages {
  display: grid;
  gap: 0.85rem;
  margin: 0;
}

.languages dt {
  font-weight: 700;
}

.languages dd {
  margin: 0;
  color: var(--c-ink-muted);
}

/* Footer */

.footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem 2rem;
  padding-block: 2rem 3rem;
  border-top: 1px solid var(--c-line);
  color: var(--c-ink-muted);
  font-size: 0.875rem;
}

.footer p {
  margin: 0;
}

@media (min-width: 40rem) {
  .hero__photo {
    width: 10rem;
  }
}

@media (min-width: 64rem) {
  .hero__photo {
    width: 17rem;
  }
}

@media (max-width: 56rem) {
  .columns {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 40rem) {
  .hero__body {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas: 'photo' 'intro';
    gap: 1.5rem;
  }
}

@media print {
  .page {
    width: 100%;
  }

  .hero {
    padding-block: 0 1rem;
  }

  .hero__toolbar {
    display: none;
  }

  .hero__body {
    gap: 1.5rem;
  }

  .hero__photo {
    width: 3cm;
    print-color-adjust: exact;
  }

  .hero__name {
    font-size: 2.5rem;
  }

  .hero__role {
    margin-top: 0.4rem;
    font-size: 1.15rem;
  }

  .hero__contact {
    margin-top: 0.9rem;
    gap: 0.5rem 2rem;
  }

  .section,
  .section--profile {
    padding-block: 0.9rem;
  }

  .section__title,
  .columns__aside .section__title {
    margin-bottom: 0.6rem;
    font-size: 1.15rem;
  }

  .profile {
    max-width: none;
    font-size: 0.95rem;
  }

  .columns {
    grid-template-columns: minmax(0, 1fr) 13.5rem;
    column-gap: 1.75rem;
  }

  .stack,
  .stack--loose {
    gap: 0.75rem;
  }

  .skill-group__list li {
    padding: 0.05rem 0.35rem;
    font-size: 0.75rem;
  }

  .footer {
    display: none;
  }
}
</style>
