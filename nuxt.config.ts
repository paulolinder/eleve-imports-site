import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',

  // Nuxt 4 app directory structure
  future: {
    compatibilityVersion: 4,
  },

  // Nitro preset para Cloudflare Pages
  nitro: {
    preset: 'cloudflare-pages',
    prerender: {
      crawlLinks: true,
      routes: ['/', '/catalogo', '/sobre', '/contato'],
    },
  },

  // Render híbrido: SSG com revalidação para páginas de produto
  routeRules: {
    '/': { prerender: true },
    '/catalogo': { prerender: true },
    '/catalogo/**': { swr: 3600 }, // 1 hora de cache
    '/sobre': { prerender: true },
    '/contato': { prerender: true },
    '/api/**': { cors: true },
  },

  // Módulos
  modules: [
    '@nuxtjs/seo',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/eslint',
  ],

  // Componentes: sem prefixo de subpasta para facilitar uso
  components: [
    { path: '~/components/ui', pathPrefix: false },
    { path: '~/components/layout', pathPrefix: false },
    { path: '~/components/sections', pathPrefix: false },
    { path: '~/components/products', pathPrefix: false },
    { path: '~/components', pathPrefix: false },
  ],

  // CSS global
  css: ['~/assets/css/main.css'],

  // Vite plugins (Tailwind v4)
  vite: {
    plugins: [tailwindcss()],
  },

  // Configuração de fontes (@nuxt/fonts)
  fonts: {
    families: [
      { name: 'Inter', provider: 'google', weights: [300, 400, 500, 600, 700] },
      {
        name: 'Playfair Display',
        provider: 'google',
        weights: [400, 500, 600, 700],
        styles: ['normal', 'italic'],
      },
    ],
  },

  // Configuração de imagens (@nuxt/image)
  image: {
    quality: 85,
    format: ['webp', 'avif'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
    domains: [
      'images.unsplash.com',
      'res.cloudinary.com',
      new URL(process.env.APPWRITE_ENDPOINT || 'https://cloud.appwrite.io').hostname,
    ],
  },

  // Configuração SEO (@nuxtjs/seo)
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://eleveimports.com.br',
    name: 'Eleve Imports',
    description:
      'Importados premium em Campo Novo do Parecis: iPhones originais e perfumes árabes exclusivos. Consulte pelo WhatsApp.',
    defaultLocale: 'pt-BR',
    language: 'pt-BR',
    indexable: process.env.NODE_ENV === 'production',
  },

  // Open Graph / SEO global
  seo: {
    redirectToCanonicalSiteUrl: true,
  },

  // Sitemap
  sitemap: {
    strictNuxtContentPaths: false,
    exclude: ['/admin/**'],
  },

  // Robots
  robots: {
    disallow: ['/api/', '/admin/'],
  },

  // Variáveis de ambiente públicas (expostas ao cliente)
  runtimeConfig: {
    // Privadas — apenas server-side
    appwriteApiKey: process.env.APPWRITE_API_KEY || '',
    appwriteEndpoint:
      process.env.APPWRITE_ENDPOINT ||
      'https://sistemas-appwrite.oczois.easypanel.host/',
    appwriteProjectId:
      process.env.APPWRITE_PROJECT_ID || '69cd7caa001df667ead9',
    // Públicas — expostas ao cliente
    public: {
      siteUrl:
        process.env.NUXT_PUBLIC_SITE_URL || 'https://eleveimports.com.br',
      siteName: 'Eleve Imports',
      appwriteEndpoint:
        process.env.APPWRITE_ENDPOINT ||
        'https://sistemas-appwrite.oczois.easypanel.host/',
      appwriteProjectId:
        process.env.APPWRITE_PROJECT_ID || '69cd7caa001df667ead9',
    },
  },

  // TypeScript
  typescript: {
    strict: true,
    typeCheck: false, // rodar separado: npm run typecheck
  },

  // ESLint
  eslint: {
    config: {
      stylistic: false,
    },
  },

  // App head padrão
  app: {
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        {
          name: 'theme-color',
          content: '#0d0d1a',
        },
        {
          name: 'format-detection',
          content: 'telephone=no',
        },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/favicon.svg',
        },
        {
          rel: 'apple-touch-icon',
          href: '/apple-touch-icon.png',
        },
      ],
    },
  },

  // Dev tools
  devtools: { enabled: true },
})
