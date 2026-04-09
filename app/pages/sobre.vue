<script setup lang="ts">
definePageMeta({ layout: 'default' })

useSeoMeta({
  title: 'Sobre a Eleve Imports — Nossa História',
  description:
    'Conheça a Eleve Imports: especializados em importação de iPhones originais e perfumes árabes exclusivos. Qualidade, confiança e atendimento personalizado.',
  ogTitle: 'Sobre a Eleve Imports',
  ogDescription: 'Conheça nossa história, valores e compromisso com a qualidade.',
})

useSchemaOrg([defineWebPage({ '@type': 'AboutPage' })])
</script>

<template>
  <div>
    <!-- Header -->
    <div class="gradient-dark py-20">
      <div class="container-site text-center max-w-3xl mx-auto">
        <h1 class="font-display text-4xl font-bold text-white sm:text-5xl mb-4">
          Sobre a <span class="gradient-gold-text">Eleve Imports</span>
        </h1>
        <p class="text-white/60 text-lg">
          Importados premium com a qualidade que você merece.
        </p>
      </div>
    </div>

    <!-- Content -->
    <div class="container-site py-16 max-w-4xl mx-auto">
      <div class="prose prose-lg max-w-none">
        <div class="grid grid-cols-1 gap-16 md:grid-cols-2">
          <div>
            <h2 class="font-display text-2xl font-bold text-dark-500 mb-4">Nossa missão</h2>
            <p class="text-gray-600 leading-relaxed">
              A <strong>Eleve Imports</strong> nasceu para trazer ao Brasil o que há de melhor em
              produtos importados: iPhones originais desbloqueados e perfumes árabes exclusivos,
              com total segurança e garantia de autenticidade.
            </p>
            <p class="text-gray-600 leading-relaxed mt-4">
              Trabalhamos com fornecedores verificados e processos rigorosos de importação para
              garantir que cada produto chegue até você com a qualidade prometida.
            </p>
          </div>
          <div>
            <h2 class="font-display text-2xl font-bold text-dark-500 mb-4">Nossos valores</h2>
            <ul class="space-y-3">
              <li class="flex items-start gap-3">
                <Icon name="ph:check-circle" class="size-5 text-gold-500 mt-0.5 shrink-0" />
                <span class="text-gray-600"><strong>Autenticidade</strong> — Apenas produtos originais, sem exceção.</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon name="ph:check-circle" class="size-5 text-gold-500 mt-0.5 shrink-0" />
                <span class="text-gray-600"><strong>Transparência</strong> — Processos claros, preços justos e comunicação honesta.</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon name="ph:check-circle" class="size-5 text-gold-500 mt-0.5 shrink-0" />
                <span class="text-gray-600"><strong>Cuidado</strong> — Atendimento personalizado do pedido à entrega.</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon name="ph:check-circle" class="size-5 text-gold-500 mt-0.5 shrink-0" />
                <span class="text-gray-600"><strong>Confiança</strong> — Construímos relações de longo prazo com nossos clientes.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="mt-16 text-center">
        <UiButton to="/catalogo" size="lg" variant="primary">
          Explorar catálogo
          <Icon name="ph:arrow-right" class="size-5" />
        </UiButton>
      </div>
    </div>
  </div>
</template>
