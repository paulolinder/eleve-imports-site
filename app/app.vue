<script setup lang="ts">
useSeoMeta({
  titleTemplate: '%s | Eleve Imports',
  ogSiteName: 'Eleve Imports',
  twitterCard: 'summary_large_image',
  ogType: 'website',
  ogLocale: 'pt_BR',
  // Fallback description global
  description: 'iPhones originais e perfumes árabes importados em Campo Novo do Parecis - MT. Consulte pelo WhatsApp.',
})

useHead({
  htmlAttrs: { lang: 'pt-BR' },
  meta: [
    { name: 'format-detection', content: 'telephone=no' },
    { name: 'application-name', content: 'Eleve Imports' },
    { name: 'apple-mobile-web-app-title', content: 'Eleve Imports' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
  ],
  link: [
    { rel: 'dns-prefetch', href: 'https://images.unsplash.com' },
    { rel: 'dns-prefetch', href: 'https://lattafa.com' },
    { rel: 'dns-prefetch', href: 'https://www.lattafa-usa.com' },
    { rel: 'dns-prefetch', href: 'https://armaf.com' },
    { rel: 'preconnect', href: 'https://images.unsplash.com' },
  ],
})
</script>

<template>
  <NuxtLoadingIndicator color="#c9a84c" :height="3" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
