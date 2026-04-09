<script setup lang="ts">
definePageMeta({ layout: 'default' })

useSeoMeta({
  title: 'iPhones e Perfumes Árabes em Campo Novo do Parecis',
  description:
    'iPhones originais desbloqueados e perfumes árabes exclusivos em Campo Novo do Parecis - MT. Consulte disponibilidade pelo WhatsApp.',
  ogTitle: 'Eleve Imports — Importados Premium em Campo Novo do Parecis',
  ogDescription:
    'iPhones originais e perfumes árabes exclusivos. Lattafa Yara, iPhone 16 Pro Max e mais. Entrega em Campo Novo do Parecis - MT.',
  ogImage: '/logo-dark.png',
  ogType: 'website',
  ogLocale: 'pt_BR',
  ogUrl: 'https://eleveimports.com',
  twitterTitle: 'Eleve Imports — Importados Premium',
  twitterDescription: 'iPhones e perfumes árabes importados em Campo Novo do Parecis - MT.',
  twitterImage: '/logo-dark.png',
  // Geo tags para SEO local
  robots: 'index, follow',
})

// Meta tags adicionais para SEO local
useHead({
  meta: [
    { name: 'geo.region', content: 'BR-MT' },
    { name: 'geo.placename', content: 'Campo Novo do Parecis' },
    { name: 'author', content: 'Eleve Imports' },
    { name: 'publisher', content: 'Eleve Imports' },
  ],
  link: [
    { rel: 'canonical', href: 'https://eleveimports.com' },
  ],
})

useSchemaOrg([
  defineLocalBusiness({
    name: 'Eleve Imports',
    url: 'https://eleveimports.com',
    logo: 'https://eleveimports.com/logo-dark.png',
    image: 'https://eleveimports.com/logo-dark.png',
    description: 'Importados premium em Campo Novo do Parecis: iPhones originais desbloqueados e perfumes árabes exclusivos. Lattafa, Armaf, Carolina Herrera.',
    telephone: '+5565996881272',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Avenida Jatobá, 456',
      addressLocality: 'Campo Novo do Parecis',
      addressRegion: 'MT',
      addressCountry: 'BR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -13.6677,
      longitude: -57.6897,
    },
    areaServed: {
      '@type': 'City',
      name: 'Campo Novo do Parecis',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '19:00',
      },
    ],
    sameAs: [
      'https://instagram.com/eleveimports',
      'https://wa.me/5565996881272',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '200',
      bestRating: '5',
      worstRating: '1',
    },
  }),
  defineWebSite({
    name: 'Eleve Imports',
    url: 'https://eleveimports.com',
    description: 'iPhones originais e perfumes árabes importados em Campo Novo do Parecis - MT.',
    inLanguage: 'pt-BR',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://eleveimports.com/catalogo?busca={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }),
  defineWebPage({
    '@type': 'WebPage',
    name: 'Eleve Imports — iPhones e Perfumes Árabes',
    description: 'Landing page da Eleve Imports com iPhones desbloqueados e perfumes árabes exclusivos.',
  }),
])
</script>

<template>
  <div>
    <TheHero />
    <TheIphones />
    <ThePerfumes />
    <TheTestimonials />
    <TheBenefits />
    <TheContactCTA />
  </div>
</template>
