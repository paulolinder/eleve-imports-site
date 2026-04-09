<script setup lang="ts">
import type { Product } from '~/types'

interface Props {
  product: Product
}

defineProps<Props>()
</script>

<template>
  <article
    class="group relative flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-dark-600 border border-gray-100 dark:border-dark-500 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/8 hover:border-gold-200 dark:hover:border-gold-700"
  >
    <!-- Badges -->
    <div class="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
      <UiBadge v-if="product.isNew" variant="new">Novo</UiBadge>
      <UiBadge v-if="product.isFeatured" variant="gold">
        <Icon name="ph:star" class="size-3" />
        Destaque
      </UiBadge>
    </div>

    <!-- Imagem -->
    <NuxtLink :to="`/catalogo/${product.slug}`" class="block aspect-product overflow-hidden bg-gray-100" :aria-label="`Ver produto: ${product.name}`">
      <img
        :src="product.thumbnailUrl || '/images/placeholder-product.svg'"
        :alt="product.name"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        width="400"
        height="500"
      />
    </NuxtLink>

    <!-- Conteúdo -->
    <div class="flex flex-1 flex-col p-4">
      <!-- Categoria + Marca -->
      <div class="flex items-center justify-between mb-2">
        <NuxtLink
          :to="`/catalogo?categoria=${product.category.slug}`"
          class="text-xs font-semibold text-gold-700 hover:text-gold-600 transition-colors uppercase tracking-wide"
        >
          {{ product.category.name }}
        </NuxtLink>
        <span class="text-xs text-gray-500 font-medium">{{ product.brand }}</span>
      </div>

      <!-- Nome -->
      <NuxtLink :to="`/catalogo/${product.slug}`" class="mb-2 block">
        <h3 class="font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 leading-snug transition-colors group-hover:text-gold-700 dark:group-hover:text-gold-400">
          {{ product.name }}
        </h3>
      </NuxtLink>

      <!-- Descrição curta -->
      <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed flex-1">
        {{ product.shortDescription }}
      </p>

      <!-- CTA -->
      <div class="mt-4">
        <a
          :href="`https://wa.me/5565996881272?text=${encodeURIComponent(`Olá! Tenho interesse no ${product.name}. Ref: ${product.slug}`)}`"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`Consultar ${product.name} no WhatsApp`"
          class="flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-green-400 hover:shadow-md active:scale-95"
          :class="product.availability !== 'available' ? 'opacity-50 pointer-events-none' : ''"
        >
          <Icon name="ph:whatsapp-logo-fill" class="size-4" />
          {{ product.availability === 'available' ? 'Consultar preço' : product.availability === 'out_of_stock' ? 'Esgotado' : 'Em breve' }}
        </a>
      </div>
    </div>
  </article>
</template>
