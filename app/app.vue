<script setup>
const { t } = useI18n()
const config = useRuntimeConfig()
const cv = useCv()
const head = useLocaleHead({ dir: true, lang: true, seo: true })

// Crawlers need an absolute URL to the original file, not an IPX variant.
const ogImage = computed(() => new URL(cv.value.photo.src, config.public.siteUrl).href)

useHead(() => ({
  htmlAttrs: head.value.htmlAttrs,
  link: head.value.link,
  meta: head.value.meta,
}))

useSeoMeta({
  title: () => t('meta.title'),
  description: () => t('meta.description'),
  ogTitle: () => t('meta.title'),
  ogDescription: () => t('meta.description'),
  ogType: 'profile',
  ogImage: () => ogImage.value,
  ogImageWidth: () => cv.value.photo.width,
  ogImageHeight: () => cv.value.photo.height,
  ogImageAlt: () => cv.value.photo.alt,
  twitterCard: 'summary',
})
</script>

<template>
  <a class="skip-link" href="#main">{{ t('skipLink') }}</a>
  <NuxtPage />
</template>
