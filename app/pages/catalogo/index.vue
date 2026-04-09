<script setup lang="ts">
definePageMeta({ layout: 'default' })

const route = useRoute()
const router = useRouter()

// Filtros reativos sincronizados com a URL
const activeCategory = computed({
  get: () => (route.query.categoria as string) || '',
  set: (val) => router.push({ query: { ...route.query, categoria: val || undefined } }),
})

// Input local + debounce para não fazer request a cada tecla
const searchInput = ref((route.query.busca as string) || '')
const searchQuery = computed({
  get: () => (route.query.busca as string) || '',
  set: (val) => router.push({ query: { ...route.query, busca: val || undefined } }),
})

const debouncedSearch = useDebounceFn(() => {
  searchQuery.value = searchInput.value
}, 400)

watch(searchInput, () => debouncedSearch())

const { data: categoriesData } = useCategories()
const categories = computed(() => categoriesData.value ?? [])

const { products, total, isLoading, filters } = useProducts({
  category: activeCategory.value || undefined,
  search: searchQuery.value || undefined,
})

// Sincronizar filtros com URL
watch(activeCategory, (val) => { filters.category = val || undefined })
watch(searchQuery, (val) => { filters.search = val || undefined })

// SEO dinâmico
const activecat = computed(() =>
  categories.value.find((c) => c.slug === activeCategory.value),
)

useSeoMeta({
  title: () =>
    activecat.value
      ? `${activecat.value.seo?.title ?? activecat.value.name} | Catálogo`
      : 'Catálogo de Produtos | Eleve Imports',
  description: () =>
    activecat.value?.seo?.description ??
    'Catálogo de iPhones originais e perfumes árabes importados em Campo Novo do Parecis - MT.',
  ogTitle: () =>
    activecat.value ? activecat.value.name : 'Catálogo | Eleve Imports',
  ogDescription: () =>
    activecat.value?.seo?.description ??
    'iPhones originais e perfumes árabes importados em Campo Novo do Parecis.',
  ogImage: '/logo-dark.png',
  ogType: 'website',
  ogLocale: 'pt_BR',
})

useHead({
  link: [{ rel: 'canonical', href: 'https://eleveimports.com/catalogo' }],
})

useSchemaOrg([
  defineWebPage({ '@type': 'CollectionPage' }),
  defineBreadcrumb({
    itemListElement: [
      { position: 1, name: 'Início', item: 'https://eleveimports.com' },
      { position: 2, name: 'Catálogo', item: 'https://eleveimports.com/catalogo' },
    ],
  }),
])
</script>

<template>
  <div>
    <!-- Page header -->
    <div class="gradient-dark py-14">
      <div class="container-site">
        <!-- Breadcrumb -->
        <nav class="mb-4 flex items-center gap-2 text-sm text-white/40" aria-label="Breadcrumb">
          <NuxtLink to="/" class="hover:text-white/70 transition-colors">Início</NuxtLink>
          <Icon name="ph:caret-right" class="size-3" />
          <span class="text-white/70">Catálogo</span>
          <template v-if="activecat">
            <Icon name="ph:caret-right" class="size-3" />
            <span class="text-gold-400">{{ activecat.name }}</span>
          </template>
        </nav>

        <h1 class="font-display text-3xl font-bold text-white sm:text-4xl">
          <span v-if="activecat">{{ activecat.name }}</span>
          <span v-else>Catálogo Completo</span>
        </h1>
        <p class="mt-2 text-white/50">
          <span v-if="!isLoading">{{ total }} produto{{ total !== 1 ? 's' : '' }}</span>
          <span v-else>Carregando...</span>
        </p>
      </div>
    </div>

    <!-- Filtros + Grid -->
    <div class="container-site py-10">
      <!-- Filtros de categoria -->
      <div class="mb-8 flex flex-wrap items-center gap-2">
        <button
          class="rounded-full px-4 py-2 text-sm font-medium transition-all"
          :class="
            !activeCategory
              ? 'bg-gold-500 text-dark-500'
              : 'border border-gray-200 text-gray-600 hover:border-gold-500/50 hover:text-gold-600'
          "
          @click="activeCategory = ''"
        >
          Todos
        </button>
        <button
          v-for="cat in categories"
          :key="cat.id"
          class="rounded-full px-4 py-2 text-sm font-medium transition-all"
          :class="
            activeCategory === cat.slug
              ? 'bg-gold-500 text-dark-500'
              : 'border border-gray-200 text-gray-600 hover:border-gold-500/50 hover:text-gold-600'
          "
          @click="activeCategory = cat.slug"
        >
          {{ cat.name }}
        </button>

        <!-- Search -->
        <div class="ml-auto flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2">
          <Icon name="ph:magnifying-glass" class="size-4 text-gray-400" />
          <input
            v-model="searchInput"
            type="search"
            placeholder="Buscar produto..."
            class="text-sm outline-none bg-transparent text-gray-700 placeholder:text-gray-400 w-40"
          />
        </div>
      </div>

      <!-- Product grid -->
      <ProductGrid :products="products" :loading="isLoading" :columns="3" />
    </div>
  </div>
</template>
