// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primeuix/themes/aura'
import { APP_NAME } from './shared/constants/name'
import { preventFlash } from './utils/prevent-flash'

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@primevue/nuxt-module', '@vueuse/nuxt'],

  runtimeConfig: {
    openRouter: {
      apiKey: process.env.OPENROUTER_API_KEY,
    },
  },

  primevue: {
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.p-dark',
        },
      },
      ripple: true,
    },
    autoImport: true,
  },

  css: ['primeicons/primeicons.css', 'assets/css/main.css'],

  app: {
    head: {
      title: APP_NAME,
      script: [
        {
          innerHTML: `(${preventFlash.toString()})();`,
          tagPosition: 'bodyOpen',
          type: 'text/javascript',
        },
      ],
      style: [
        {
          innerHTML: `
            /* Ensure smooth appearance once loaded */
            html {
              opacity: 1;
              transition: opacity 0.1s ease;
            }
          `,
          tagPosition: 'bodyOpen',
        },
      ],
      link: [
        {
          rel: 'icon',
          href: '/favicon.ico',
          type: 'image/x-icon',
        },
      ],
    },
  },

  plugins: [{ src: '~/plugins/apply-theme.client.ts', mode: 'client' }],

  compatibilityDate: '2025-03-29',

  future: {
    compatibilityVersion: 4,
  },

  imports: {
    dirs: ['shared/constants'],
  },
})
