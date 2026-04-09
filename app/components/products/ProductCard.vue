<script setup lang="ts">
import type { Product } from '~/types'

interface Props {
  product: Product
}

const props = defineProps<Props>()
const { format, discount } = useFormatPrice()

const discountPercent = computed(() => {
  if (!props.product.priceOriginal) return null
  return discount(props.product.priceOriginal, props.product.price)
})

const availabilityLabel: Record<string, string> = {
  available: 'Disponível',
  out_of_stock: 'Esgotado',
  coming_soon: 'Em breve',
}
</script>

<template>
  <article
    class="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/8"
  >
    <!-- Badge novo / destaque -->
    <div class="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
      <UiBadge v-if="product.isNew" variant="new">Novo</UiBadge>
      <UiBadge v-if="product.isFeatured" variant="gold">
        <Icon name="ph:star" class="size-3" />
        Destaque
      </UiBadge>
      <UiBadge v-if="discountPercent" variant="red">-{{ discountPercent }}%</UiBadge>
    </div>

    <!-- Imagem -->
    <NuxtLink :to="`/catalogo/${product.slug}`" class="block aspect-product overflow-hidden bg-gray-50">
      <NuxtImg
        :src="product.thumbnailUrl || '/images/placeholder-product.jpg'"
        :alt="product.name"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        format="webp"
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
          class="text-xs font-medium text-gold-600 hover:text-gold-500 transition-colors"
        >
          {{ product.category.name }}
        </NuxtLink>
        <span class="text-xs text-gray-400">{{ product.brand }}</span>
      </div>

      <!-- Nome -->
      <NuxtLink :to="`/catalogo/${product.slug}`" class="mb-2 block">
        <h3 class="font-semibold text-gray-900 line-clamp-2 leading-snug transition-colors group-hover:text-gold-600">
          {{ product.name }}
        </h3>
      </NuxtLink>

      <!-- Descrição curta -->
      <p class="text-sm text-gray-500 line-clamp-2 leading-relaxed flex-1">
        {{ product.shortDescription }}
      </p>

      <!-- Preço + CTA WhatsApp -->
      <div class="mt-4 flex items-end justify-between gap-2">
        <div>
          <span v-if="product.priceOriginal" class="block text-xs text-gray-400 line-through">
            {{ format(product.priceOriginal) }}
          </span>
          <span class="text-lg font-bold text-gray-900">
            {{ format(product.price) }}
          </span>
        </div>
        <a
          :href="`https://wa.me/5565999999999?text=Olá! Tenho interesse no ${encodeURIComponent(product.name)} (${format(product.price)})`"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 rounded-lg bg-green-500 px-3 py-1.5 text-xs font-semibold text-white transition-all duration-200 hover:bg-green-400 hover:shadow-md active:scale-95"
          :class="product.availability !== 'available' ? 'opacity-50 pointer-events-none' : ''"
        >
          <Icon name="ph:whatsapp-logo" class="size-3.5" />
          Consultar
        </a>
      </div>
    </div>
  </article>
</template>
