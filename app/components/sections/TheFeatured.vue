<script setup lang="ts">
const { data, status } = useFeaturedProducts()
const products = computed(() => data.value?.items ?? [])
</script>

<template>
  <section class="section-padding bg-white" aria-labelledby="featured-heading">
    <div class="container-site">
      <!-- Heading -->
      <div class="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <span class="text-xs font-semibold uppercase tracking-widest text-gold-600 mb-2 block">
            Seleção especial
          </span>
          <h2 id="featured-heading" class="font-display text-3xl font-bold text-dark-500 sm:text-4xl">
            Produtos em Destaque
          </h2>
        </div>
        <NuxtLink
          to="/catalogo"
          class="inline-flex items-center gap-2 text-sm font-semibold text-gold-600 hover:text-gold-500 transition-colors shrink-0"
        >
          Ver todos
          <Icon name="ph:arrow-right" class="size-4" />
        </NuxtLink>
      </div>

      <!-- Grid -->
      <ProductGrid :products="products" :loading="status === 'pending'" :columns="4" />
    </div>
  </section>
</template>
