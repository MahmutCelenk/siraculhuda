export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    "nitro-cloudflare-dev"
  ],

  css: ['~/assets/css/main.css'],
  compatibilityDate: '2026-06-04',

  future: {
    compatibilityVersion: 4
  },

  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: {
        lang: 'tr'
      },
      titleTemplate: "%s | Sirâcü'l-Hüdâ",
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Amiri&family=Amiri+Quran&family=Inter:wght@400;500;600;700&family=Noto+Naskh+Arabic:wght@400;500;600;700&family=Playfair+Display:wght@600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600;8..60,700&display=swap'
        }
      ],
      meta: [
        {
          name: 'description',
          content: "Sirâcü'l-Hüdâ, geleneksel ilmi modern ve sakin bir öğrenme deneyimiyle buluşturan İslami eğitim platformudur."
        }
      ]
    }
  },

  content: {
    build: {
      markdown: {
        highlight: false
      }
    }
  },

  nitro: {
    preset: "cloudflare_module",

    cloudflare: {
      deployConfig: true,
      nodeCompat: true
    }
  }
})
