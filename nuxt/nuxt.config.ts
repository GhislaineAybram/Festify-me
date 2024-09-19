// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  devServer: {
    port: Number(process.env.PORT_FRONT),
  },

  nitro: {
    experimental: {
      database: true,
    },
    database: {
      default: {
        connector: 'sqlite',
        options: { name: 'db' },
      },
    },
  },

  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-auth-utils',
    '@prisma/nuxt'
  ],

  runtimeConfig: {
    bcryptSaltRound: 10,
    public: {
      apiUrl: process.env.API_URL,
    },
    database: {
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      name: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    },
    session: {
      name: 'nuxt-session',
      password: process.env.NUXT_SESSION_PASSWORD || '',
      cookie: {
        sameSite: 'lax',
      },
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/_colors.scss" as *;',
        },
      },
    },
  },

  css: [
    '~/assets/css/main.css',
  ]
})