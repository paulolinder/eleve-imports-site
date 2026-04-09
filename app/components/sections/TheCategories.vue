<script setup lang="ts">
const { data: categories, status } = useCategories()

const categoryConfig: Record<string, { icon: string; gradient: string; accentColor: string }> = {
  iphones: {
    icon: 'ph:device-mobile-camera',
    gradient: 'from-slate-900 to-slate-700',
    accentColor: 'text-blue-400',
  },
  'perfumes-arabes': {
    icon: 'ph:sparkle',
    gradient: 'from-amber-900 to-amber-700',
    accentColor: 'text-amber-300',
  },
}
</script>

<template>
  <section class="section-padding bg-cream-50" aria-labelledby="categories-heading">
    <div class="container-site">
      <!-- Heading -->
      <div class="mb-12 text-center">
        <h2
          id="categories-heading"
          class="font-display text-3xl font-bold text-dark-500 sm:text-4xl"
        >
          Nossas Categorias
        </h2>
        <p class="mt-3 text-gray-500 max-w-md mx-auto">
          Curadoria de produtos importados premium para quem exige o melhor.
        </p>
      </div>

      <!-- Loading -->
      <div v-if="status === 'pending'" class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div v-for="n in 2" :key="n" class="animate-pulse h-64 rounded-3xl bg-gray-200" />
      </div>

      <!-- Categories grid -->
      <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <NuxtLink
          v-for="category in categories"
          :key="category.id"
          :to="`/catalogo?categoria=${category.slug}`"
          class="group relative overflow-hidden rounded-3xl"
          :aria-label="`Ver produtos da categoria ${category.name}`"
        >
          <!-- Background gradient -->
          <div
            class="aspect-[4/3] bg-gradient-to-br"
            :class="categoryConfig[category.slug]?.gradient ?? 'from-dark-500 to-dark-700'"
          >
            <!-- Overlay pattern -->
            <div
              class="absolute inset-0 opacity-10"
              style="background-image: radial-gradient(circle at 50% 50%, rgba(201,168,76,0.4) 0%, transparent 70%)"
            />
          </div>

          <!-- Content overlay -->
          <div
            class="absolute inset-0 flex flex-col justify-between p-8 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
          >
            <!-- Icon -->
            <div
              class="flex size-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 transition-transform duration-300 group-hover:scale-110"
            >
              <Icon
                :name="categoryConfig[category.slug]?.icon ?? 'ph:package'"
                class="size-7"
                :class="categoryConfig[category.slug]?.accentColor ?? 'text-white'"
              />
            </div>

            <!-- Text -->
            <div>
              <span class="text-xs font-semibold uppercase tracking-widest text-gold-300 mb-2 block">
                {{ category.productCount }} produtos
              </span>
              <h3 class="font-display text-2xl font-bold text-white mb-2 sm:text-3xl">
                {{ category.name }}
              </h3>
              <p class="text-sm text-white/70 line-clamp-2">
                {{ category.description }}
              </p>

              <!-- CTA inline -->
              <div
                class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold-400 transition-all duration-200 group-hover:gap-3"
              >
                Ver produtos
                <Icon name="ph:arrow-right" class="size-4" />
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
