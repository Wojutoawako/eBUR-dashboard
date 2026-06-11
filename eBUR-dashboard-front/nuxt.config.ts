// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
  ],

  i18n: {
    locales: [
      { code: 'ru', language: 'ru-RU', file: 'ru-RU.json' },
      { code: 'en', language: 'en-US', file: 'en-US.json' }
    ],
    detectBrowserLanguage: {
      useCookie: false,
      redirectOn: 'root'
    },
    // strategy: 'no_prefix',
    defaultLocale: 'ru-RU'
  },

  vite: {
    optimizeDeps: {
      include: [
        'date-fns', //tmp
        'gridstack',
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/api/**': {
      cors: true
    }
  },

  devtools: {
    enabled: true
  },

  compatibilityDate: '2024-07-11',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
