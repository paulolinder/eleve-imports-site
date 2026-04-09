import type { Product, ProductFilters, ProductListResponse } from '~/types'

export function useProducts(initialFilters?: ProductFilters) {
  const filters = reactive<ProductFilters>(initialFilters ?? {})

  const { data, status, refresh, error } = useFetch<ProductListResponse>('/api/products', {
    query: computed(() => ({
      ...(filters.category && { category: filters.category }),
      ...(filters.brand && { brand: filters.brand }),
      ...(filters.featured !== undefined && { featured: String(filters.featured) }),
      ...(filters.search && { search: filters.search }),
    })),
    default: () => ({ items: [], total: 0, page: 1, perPage: 25 }),
  })

  const products = computed(() => data.value?.items ?? [])
  const total = computed(() => data.value?.total ?? 0)
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
  return useFetch<Product>(() => `/api/products/${unref(slug)}`, {
    key: `product-${unref(slug)}`,
  })
}

export function useFeaturedProducts() {
  return useFetch<ProductListResponse>('/api/products', {
    query: { featured: 'true', perPage: '8' },
    key: 'featured-products',
    default: () => ({ items: [], total: 0, page: 1, perPage: 8 }),
  })
}
