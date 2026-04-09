import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',

  // Nuxt 4 app directory structure
  future: {
    compatibilityVersion: 4,
  },

  // Nitro preset para Cloudflare Pages (estático — sem Worker, sem erro unenv)
  nitro: {
    preset: 'cloudflare-pages-static',
    sourceMap: false,
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/catalogo',
        '/sobre',
        '/contato',
        // iPhones
        '/catalogo/iphone-17-pro-max-256gb',
        '/catalogo/iphone-17-pro-256gb',
        '/catalogo/iphone-17-air-256gb',
        '/catalogo/iphone-17-128gb',
        '/catalogo/iphone-16-pro-max-256gb',
        '/catalogo/iphone-16-128gb',
        '/catalogo/iphone-15-pro-256gb',
        '/catalogo/iphone-15-128gb',
        '/catalogo/iphone-14-128gb',
        '/catalogo/iphone-13-128gb',
        // Perfumes
        '/catalogo/lattafa-yara-100ml',
        '/catalogo/mawwal-basir-100ml',
        '/catalogo/sabah-al-ward-sugar-100ml',
        '/catalogo/212-vip-rose-elixir-80ml',
        '/catalogo/armaf-liquid-brun-100ml',
        '/catalogo/oud-royal-100ml',
        '/catalogo/mukhallat-gold-50ml',
        '/catalogo/amber-oud-black-100ml',
      ],
    },
  },

  // Render híbrido: SSG com revalidação para páginas de produto
  routeRules: {
    '/': { prerender: true },
    '/catalogo': { prerender: true },
    '/catalogo/**': { prerender: true }, // prerender em vez de swr para evitar Worker
    '/sobre': { prerender: true },
    '/contato': { prerender: true },
    '/admin/**': { ssr: false },
  },

  // Módulos
  modules: [
    '@nuxtjs/seo',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    // @nuxt/eslint é apenas para dev — não carregar em produção
    ...(process.env.NODE_ENV !== 'production' ? ['@nuxt/eslint'] : []),
    '@nuxtjs/color-mode',
  ],

  // Color mode (dark/light)
  colorMode: {
    classSuffix: '',
    preference: 'light',
    fallback: 'light',
  },

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
      new URL(process.env.NUXT_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io').hostname,
    ],
  },

  // Configuração SEO (@nuxtjs/seo)
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://eleveimports.com',
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

  // Desabilita OG image dinâmico — usa @takumi-rs/wasm (5MB) que quebra o Worker do Cloudflare
  // OG images são definidas estaticamente via useSeoMeta({ ogImage: '...' }) em cada página
  ogImage: {
    enabled: false,
  },

  // Sitemap
  sitemap: {
    strictNuxtContentPaths: false,
    exclude: ['/admin/**', '/admin'],
  },

  // Robots
  robots: {
    disallow: ['/api/', '/admin/'],
  },

  // Variáveis de ambiente públicas (expostas ao cliente)
  // Nuxt sobrescreve automaticamente via env vars com prefixo NUXT_
  // Ex: appwriteApiKey → NUXT_APPWRITE_API_KEY
  //     public.appwriteEndpoint → NUXT_PUBLIC_APPWRITE_ENDPOINT
  runtimeConfig: {
    // Privadas — apenas server-side (override: NUXT_APPWRITE_*)
    appwriteApiKey: '',
    appwriteEndpoint: 'https://sistemas-appwrite.oczois.easypanel.host/',
    appwriteProjectId: '69cd7caa001df667ead9',
    // Públicas — expostas ao cliente (override: NUXT_PUBLIC_*)
    public: {
      siteUrl: 'https://eleveimports.com',
      siteName: 'Eleve Imports',
      appwriteEndpoint: 'https://sistemas-appwrite.oczois.easypanel.host/',
      appwriteProjectId: '69cd7caa001df667ead9',
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
          content: '#ffffff',
          media: '(prefers-color-scheme: light)',
        },
        {
          name: 'theme-color',
          content: '#0f1117',
          media: '(prefers-color-scheme: dark)',
        },
        {
          name: 'format-detection',
          content: 'telephone=no',
        },
      ],
      script: [
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=AW-980077552',
          async: true,
        },
        {
          innerHTML: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'AW-980077552');`,
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
