<script setup lang="ts">
definePageMeta({ layout: 'default' })

useSeoMeta({
  title: 'Contato | Eleve Imports — Campo Novo do Parecis',
  description:
    'Fale com a Eleve Imports pelo WhatsApp (65) 99688-1272. Atendimento rápido em Campo Novo do Parecis - MT.',
  ogTitle: 'Fale com a Eleve Imports',
  ogDescription: 'Atendimento via WhatsApp. Tire dúvidas, faça pedidos e consulte disponibilidade.',
  ogImage: '/logo-dark.png',
})

useHead({
  link: [{ rel: 'canonical', href: 'https://eleveimports.com/contato' }],
})

useSchemaOrg([
  defineWebPage({ '@type': 'ContactPage' }),
  {
    '@type': 'LocalBusiness',
    name: 'Eleve Imports',
    telephone: '+5565996881272',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Avenida Jatobá, 456',
      addressLocality: 'Campo Novo do Parecis',
      addressRegion: 'MT',
      addressCountry: 'BR',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+5565996881272',
      contactType: 'customer service',
      areaServed: 'BR',
      availableLanguage: 'Portuguese',
    },
  },
])

const contactOptions = [
  {
    icon: 'ph:whatsapp-logo',
    title: 'WhatsApp',
    description: 'A forma mais rápida de falar conosco. Respondemos em instantes.',
    action: 'Abrir WhatsApp',
    href: 'https://wa.me/5565996881272',
    accent: 'text-green-500',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
  },
  {
    icon: 'ph:instagram-logo',
    title: 'Instagram',
    description: 'Siga e nos mande uma mensagem pelo Direct.',
    action: 'Seguir no Instagram',
    href: 'https://instagram.com/eleveimports',
    accent: 'text-pink-500',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
  },
]
</script>

<template>
  <div>
    <!-- Header -->
    <div class="gradient-dark py-20">
      <div class="container-site text-center max-w-2xl mx-auto">
        <h1 class="font-display text-4xl font-bold text-white sm:text-5xl mb-4">
          Fale <span class="gradient-gold-text">Conosco</span>
        </h1>
        <p class="text-white/60 text-lg">
          Estamos prontos para ajudar. Escolha o canal preferido.
        </p>
      </div>
    </div>

    <!-- Contatos -->
    <div class="container-site py-16">
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-2xl mx-auto">
        <a
          v-for="option in contactOptions"
          :key="option.title"
          :href="option.href"
          target="_blank"
          rel="noopener noreferrer"
          class="group flex flex-col gap-4 rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
          :class="[option.border, option.bg]"
        >
          <div
            class="flex size-12 items-center justify-center rounded-xl bg-white"
          >
            <Icon :name="option.icon" class="size-6" :class="option.accent" />
          </div>
          <div>
            <h2 class="font-semibold text-gray-900 mb-1">{{ option.title }}</h2>
            <p class="text-sm text-gray-500 mb-4">{{ option.description }}</p>
            <span
              class="inline-flex items-center gap-2 text-sm font-semibold transition-all group-hover:gap-3"
              :class="option.accent"
            >
              {{ option.action }}
              <Icon name="ph:arrow-right" class="size-4" />
            </span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
