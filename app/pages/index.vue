<script setup lang="ts">
definePageMeta({ layout: 'default' })

useSeoMeta({
  title: 'Eleve Imports — iPhones e Perfumes Árabes em Campo Novo do Parecis',
  description:
    'iPhones originais e perfumes árabes exclusivos em Campo Novo do Parecis - MT. Produtos importados com qualidade garantida. Consulte pelo WhatsApp.',
  ogTitle: 'Eleve Imports — Importados Premium em Campo Novo do Parecis',
  ogDescription:
    'iPhones originais e perfumes árabes exclusivos. Qualidade garantida em Campo Novo do Parecis.',
  ogImage: '/og/home.jpg',
  twitterTitle: 'Eleve Imports — Importados Premium',
  twitterDescription: 'iPhones e perfumes árabes importados em Campo Novo do Parecis - MT.',
})

useSchemaOrg([
  defineLocalBusiness({
    name: 'Eleve Imports',
    url: 'https://eleveimports.com.br',
    logo: 'https://eleveimports.com.br/logo.svg',
    description: 'Importados premium em Campo Novo do Parecis: iPhones originais e perfumes árabes exclusivos.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Campo Novo do Parecis',
      addressRegion: 'MT',
      addressCountry: 'BR',
    },
    areaServed: {
      '@type': 'City',
      name: 'Campo Novo do Parecis',
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
