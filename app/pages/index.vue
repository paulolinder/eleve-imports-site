<script setup lang="ts">
definePageMeta({ layout: 'default' })

useSeoMeta({
  title: 'Eleve Imports — iPhones e Perfumes Árabes Importados',
  description:
    'iPhones originais importados e perfumes árabes exclusivos. Qualidade garantida, entrega segura em todo o Brasil. Conheça nosso catálogo.',
  ogTitle: 'Eleve Imports — Importados Premium',
  ogDescription:
    'iPhones originais importados e perfumes árabes exclusivos. Qualidade garantida, entrega segura.',
  ogImage: '/og/home.jpg',
  twitterTitle: 'Eleve Imports — Importados Premium',
  twitterDescription: 'iPhones e perfumes árabes importados com qualidade garantida.',
})

useSchemaOrg([
  defineOrganization({
    name: 'Eleve Imports',
    url: 'https://eleveimports.com.br',
    logo: 'https://eleveimports.com.br/logo.svg',
    description: 'Vitrine digital de produtos importados premium: iPhones e perfumes árabes.',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: 'Portuguese',
    },
  }),
  defineWebSite({
    name: 'Eleve Imports',
    url: 'https://eleveimports.com.br',
  }),
  defineWebPage(),
])
</script>

<template>
  <div>
    <TheHero />
    <TheCategories />
    <TheFeatured />
    <TheBenefits />
    <TheContactCTA />
  </div>
</template>
