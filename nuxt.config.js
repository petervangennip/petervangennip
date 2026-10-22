const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://petervangennip.nl'

export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  devtools: { enabled: true },

  modules: ['@nuxtjs/i18n', '@nuxtjs/color-mode', '@nuxt/fonts', '@nuxt/image'],

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: { siteUrl },
  },

  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
      meta: [{ name: 'theme-color', content: '#eef1f0' }],
    },
  },

  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: '',
    storageKey: 'pvg-color-mode',
  },

  fonts: {
    families: [
      { name: 'Bricolage Grotesque', provider: 'google', weights: ['400 800'] },
      { name: 'Atkinson Hyperlegible Next', provider: 'google', weights: ['400 700'], styles: ['normal', 'italic'] },
    ],
  },

  image: {
    format: ['avif', 'webp'],
    quality: 80,
  },

  i18n: {
    baseUrl: siteUrl,
    defaultLocale: 'nl',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
    locales: [
      { code: 'nl', language: 'nl-NL', name: 'Nederlands', file: 'nl.json' },
      { code: 'en', language: 'en-GB', name: 'English', file: 'en.json' },
    ],
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/en'],
    },
  },
})
