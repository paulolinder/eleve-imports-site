import { Query } from 'appwrite'
import type { Product, ProductFilters, ProductListResponse } from '~/types'
import { DATABASE_ID, COLLECTIONS, QUERY_LIMITS } from '~/lib/appwrite/collections'
import { PRODUCTS, FEATURED_PRODUCTS } from '~/data/products'

export function useProducts(initialFilters?: ProductFilters) {
  const filters = reactive<ProductFilters>(initialFilters ?? {})

  // Fetch all products once (filter client-side — avoids server API at runtime)
  const { data: allData, status, error, refresh } = useAsyncData<{ items: Product[]; total: number }>(
    'all-products',
    async () => {
      try {
        const { databases } = useAppwriteClient()
        const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.PRODUCTS, [
          Query.limit(QUERY_LIMITS.MAX),
          Query.orderDesc('$createdAt'),
        ])
        return { items: response.documents.map(mapProduct), total: response.total }
      } catch {
        return { items: PRODUCTS, total: PRODUCTS.length }
      }
    },
    { default: () => ({ items: [], total: 0 }) },
  )

  // Reactive client-side filtering — instant, no extra network requests
  const filtered = computed(() => {
    let items = allData.value?.items ?? []

    if (filters.featured !== undefined) {
      items = items.filter((p) => p.isFeatured === filters.featured)
    }
    if (filters.category) {
      items = items.filter((p) => p.category.slug === filters.category)
    }
    if (filters.brand) {
      items = items.filter((p) => p.brand === filters.brand)
    }
    if (filters.search) {
      const term = filters.search.toLowerCase()
      items = items.filter(
        (p) => p.name.toLowerCase().includes(term) || p.tags.some((t) => t.includes(term)),
      )
    }
    return items
  })

  const products = computed(() => filtered.value)
  const total = computed(() => filtered.value.length)
  const isLoading = computed(() => status.value === 'pending')

  function setFilter<K extends keyof ProductFilters>(key: K, value: ProductFilters[K]) {
    filters[key] = value
  }

  function clearFilters() {
    Object.keys(filters).forEach((k) => {
      delete filters[k as keyof ProductFilters]
    })
  }

  return { products, total, filters, isLoading, error, refresh, setFilter, clearFilters }
}

export function useProduct(slug: MaybeRef<string>) {
  const slugRef = toRef(() => unref(slug))
  return useAsyncData<Product>(
    () => `product-${slugRef.value}`,
    async () => {
      try {
        const { databases } = useAppwriteClient()
        const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.PRODUCTS, [
          Query.equal('slug', [slugRef.value]),
          Query.limit(1),
        ])
        if (!response.documents.length) {
          throw createError({ statusCode: 404, statusMessage: 'Produto não encontrado' })
        }
        return mapProduct(response.documents[0])
      } catch (e: unknown) {
        if (e && typeof e === 'object' && 'statusCode' in e) throw e
        const product = PRODUCTS.find((p) => p.slug === slugRef.value)
        if (!product) throw createError({ statusCode: 404, statusMessage: 'Produto não encontrado' })
        return product
      }
    },
    { watch: [slugRef] },
  )
}

export function useFeaturedProducts() {
  return useAsyncData<ProductListResponse>(
    'featured-products',
    async () => {
      try {
        const { databases } = useAppwriteClient()
        const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.PRODUCTS, [
          Query.equal('isFeatured', [true]),
          Query.limit(QUERY_LIMITS.FEATURED),
          Query.orderDesc('$createdAt'),
        ])
        return {
          items: response.documents.map(mapProduct),
          total: response.total,
          page: 1,
          perPage: QUERY_LIMITS.FEATURED,
        }
      } catch {
        return {
          items: FEATURED_PRODUCTS.slice(0, QUERY_LIMITS.FEATURED),
          total: FEATURED_PRODUCTS.length,
          page: 1,
          perPage: QUERY_LIMITS.FEATURED,
        }
      }
    },
    { default: () => ({ items: [], total: 0, page: 1, perPage: QUERY_LIMITS.FEATURED }) },
  )
}
