<script setup lang="ts">
import type { Product } from '~/types'

interface Props {
  products: Product[]
  loading?: boolean
  columns?: 2 | 3 | 4
}

withDefaults(defineProps<Props>(), {
  loading: false,
  columns: 3,
})

const colClasses: Record<number, string> = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
}
</script>

<template>
  <div>
    <!-- Loading skeleton -->
    <div v-if="loading" :class="['grid gap-5 md:gap-6', colClasses[columns]]">
      <div
        v-for="n in columns * 2"
        :key="n"
        class="animate-pulse rounded-2xl overflow-hidden"
      >
        <div class="aspect-product bg-gray-200" />
        <div class="p-4 space-y-3">
          <div class="h-3 bg-gray-200 rounded w-1/3" />
          <div class="h-4 bg-gray-200 rounded w-3/4" />
          <div class="h-3 bg-gray-200 rounded w-full" />
          <div class="h-3 bg-gray-200 rounded w-2/3" />
        </div>
      </div>
    </div>

    <!-- Grid de produtos -->
    <div v-else-if="products.length > 0" :class="['grid gap-5 md:gap-6', colClasses[columns]]">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>

    <!-- Empty state -->
    <div v-else class="flex flex-col items-center justify-center py-20 text-center">
      <Icon name="ph:package" class="size-16 text-gray-300 mb-4" />
      <h3 class="text-lg font-semibold text-gray-600 mb-2">Nenhum produto encontrado</h3>
      <p class="text-sm text-gray-400">
        Tente ajustar os filtros ou entre em contato via WhatsApp.
      </p>
    </div>
  </div>
</template>
