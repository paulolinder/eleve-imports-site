<script setup lang="ts">
definePageMeta({ layout: 'default' })

const route = useRoute()
const slug = computed(() => route.params.slug as string)
const { data: product, status, error } = useProduct(slug)

// 404 se não encontrar
if (error.value?.statusCode === 404) {
  throw createError({ statusCode: 404, fatal: true, statusMessage: 'Produto não encontrado' })
}

// SEO dinâmico com dados do produto
useSeoMeta({
  title: () => product.value?.seo?.title ?? product.value?.name ?? 'Produto',
  description: () => product.value?.seo?.description ?? product.value?.shortDescription,
  ogTitle: () => product.value?.name,
  ogDescription: () => product.value?.shortDescription,
  ogImage: () => product.value?.thumbnailUrl,
  ogType: 'product',
  ogLocale: 'pt_BR',
  ogUrl: () => `https://eleveimports.com/catalogo/${slug.value}`,
})

useHead({
  link: [{ rel: 'canonical', href: () => `https://eleveimports.com/catalogo/${slug.value}` }],
})

useSchemaOrg([
  defineProduct({
    name: () => product.value?.name ?? '',
    description: () => product.value?.description,
    image: () => product.value?.images ?? [],
    offers: () =>
      product.value
        ? {
            price: product.value.price,
            priceCurrency: 'BRL',
            availability:
              product.value.availability === 'available'
                ? 'InStock'
                : 'OutOfStock',
          }
        : undefined,
  }),
  defineBreadcrumb({
    itemListElement: () => [
      { position: 1, name: 'Início', item: 'https://eleveimports.com' },
      { position: 2, name: 'Catálogo', item: 'https://eleveimports.com/catalogo' },
      { position: 3, name: product.value?.category?.name ?? 'Categoria', item: `https://eleveimports.com/catalogo?categoria=${product.value?.category?.slug}` },
      { position: 4, name: product.value?.name ?? 'Produto', item: `https://eleveimports.com/catalogo/${slug.value}` },
    ],
  }),
])

const selectedImage = ref(0)
</script>

<template>
  <div>
    <!-- Loading -->
    <div v-if="status === 'pending'" class="container-site py-20">
      <div class="animate-pulse grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div class="aspect-product rounded-2xl bg-gray-200" />
        <div class="space-y-6 py-4">
          <div class="h-4 bg-gray-200 rounded w-1/4" />
          <div class="h-8 bg-gray-200 rounded w-3/4" />
          <div class="h-4 bg-gray-200 rounded w-full" />
          <div class="h-4 bg-gray-200 rounded w-5/6" />
          <div class="h-10 bg-gray-200 rounded w-1/3 mt-8" />
        </div>
      </div>
    </div>

    <!-- Produto -->
    <div v-else-if="product">
      <!-- Breadcrumb + Header simples -->
      <div class="border-b border-gray-100 bg-gray-50">
        <div class="container-site py-4">
          <nav class="flex items-center gap-2 text-sm text-gray-500" aria-label="Breadcrumb">
            <NuxtLink to="/" class="hover:text-gray-600 transition-colors">Início</NuxtLink>
            <Icon name="ph:caret-right" class="size-3" />
            <NuxtLink to="/catalogo" class="hover:text-gray-600 transition-colors">Catálogo</NuxtLink>
            <Icon name="ph:caret-right" class="size-3" />
            <NuxtLink
              :to="`/catalogo?categoria=${product.category.slug}`"
              class="hover:text-gray-600 transition-colors"
            >
              {{ product.category.name }}
            </NuxtLink>
            <Icon name="ph:caret-right" class="size-3" />
            <span class="text-gray-700 truncate max-w-[200px]">{{ product.name }}</span>
          </nav>
        </div>
      </div>

      <!-- Conteúdo principal -->
      <div class="container-site py-12">
        <div class="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <!-- Galeria de imagens -->
          <div>
            <div class="aspect-product overflow-hidden rounded-2xl bg-gray-50 border border-gray-100">
              <img
                :src="product.images[selectedImage] ?? product.thumbnailUrl ?? '/images/placeholder-product.svg'"
                :alt="`${product.name} - imagem ${selectedImage + 1}`"
                class="h-full w-full object-cover"
                width="600"
                height="750"
              />
            </div>
            <!-- Thumbnails -->
            <div v-if="product.images.length > 1" class="mt-3 flex gap-2 overflow-x-auto">
              <button
                v-for="(img, idx) in product.images"
                :key="idx"
                class="shrink-0 size-16 overflow-hidden rounded-lg border-2 transition-colors"
                :class="selectedImage === idx ? 'border-gold-500' : 'border-transparent'"
                :aria-label="`Ver imagem ${idx + 1} do produto`"
                @click="selectedImage = idx"
              >
                <img :src="img" :alt="`Thumb ${idx + 1}`" class="h-full w-full object-cover" width="64" height="64" />
              </button>
            </div>
          </div>

          <!-- Informações do produto -->
          <div class="flex flex-col">
            <!-- Badges -->
            <div class="flex flex-wrap items-center gap-2 mb-4">
              <UiBadge variant="gold">{{ product.category.name }}</UiBadge>
              <UiBadge v-if="product.isNew" variant="new">Novo</UiBadge>
              <UiBadge
                :variant="product.availability === 'available' ? 'green' : 'red'"
              >
                {{
                  product.availability === 'available'
                    ? 'Disponível'
                    : product.availability === 'out_of_stock'
                      ? 'Esgotado'
                      : 'Em breve'
                }}
              </UiBadge>
            </div>

            <!-- Marca + Nome -->
            <span class="text-sm text-gray-600 font-medium mb-1">{{ product.brand }}</span>
            <h1 class="font-display text-2xl font-bold text-gray-900 sm:text-3xl leading-tight mb-4">
              {{ product.name }}
            </h1>

            <!-- Descrição curta -->
            <p class="text-gray-600 leading-relaxed mb-6">{{ product.shortDescription }}</p>

            <!-- CTA WhatsApp -->
            <a
              :href="`https://wa.me/5565996881272?text=${encodeURIComponent(`Olá! Tenho interesse no ${product.name}. Ref: ${product.slug}`)}`"
              target="_blank"
              rel="noopener noreferrer"
              class="flex w-full items-center justify-center gap-3 rounded-xl bg-green-500 px-6 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-green-400 hover:shadow-lg hover:shadow-green-500/25 active:scale-[0.98] sm:w-auto sm:px-8"
              :class="product.availability !== 'available' ? 'opacity-50 pointer-events-none' : ''"
            >
              <Icon name="ph:whatsapp-logo-fill" class="size-6" />
              Tenho interesse
            </a>
            <p class="mt-3 text-sm text-gray-400">
              <Icon name="ph:map-pin" class="size-3.5 inline -mt-0.5" />
              Atendemos em Campo Novo do Parecis - MT
            </p>

            <!-- Separador -->
            <div class="my-8 border-t border-gray-100" />

            <!-- Descrição completa -->
            <div>
              <h2 class="font-semibold text-gray-900 mb-3">Descrição</h2>
              <p class="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                {{ product.description }}
              </p>
            </div>

            <!-- Tags -->
            <div v-if="product.tags.length > 0" class="mt-6 flex flex-wrap gap-1.5">
              <span
                v-for="tag in product.tags"
                :key="tag"
                class="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-500"
              >
                #{{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
