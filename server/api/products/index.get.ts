import { PRODUCTS, FEATURED_PRODUCTS } from '~/data/products'
import { DATABASE_ID, COLLECTIONS, QUERY_LIMITS } from '~/lib/appwrite/collections'
import type { ProductFilters } from '~/types'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const filters: ProductFilters = {
    category: query.category as string | undefined,
    brand: query.brand as string | undefined,
    featured: query.featured === 'true' ? true : undefined,
    search: query.search as string | undefined,
  }

  const page = Number(query.page) || 1
  const perPage = Math.min(Number(query.perPage) || QUERY_LIMITS.DEFAULT, QUERY_LIMITS.MAX)

  try {
    const { databases } = getAppwriteServer()
    const queries: string[] = [
      Query.limit(perPage),
      Query.offset((page - 1) * perPage),
      Query.orderDesc('$createdAt'),
    ]

    if (filters.category) queries.push(Query.equal('categorySlug', filters.category))
    if (filters.featured !== undefined) queries.push(Query.equal('isFeatured', filters.featured))
    if (filters.search) queries.push(Query.search('name', filters.search))

    const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.PRODUCTS, queries)

    return {
      items: response.documents.map(mapProduct),
      total: response.total,
      page,
      perPage,
    }
  } catch {
    let items = filters.featured ? FEATURED_PRODUCTS : PRODUCTS

    if (filters.category) {
      items = items.filter((p) => p.category.slug === filters.category)
    }
    if (filters.search) {
      const term = filters.search.toLowerCase()
      items = items.filter(
        (p) => p.name.toLowerCase().includes(term) || p.tags.some((t) => t.includes(term)),
      )
    }

    const total = items.length
    const paginated = items.slice((page - 1) * perPage, page * perPage)

    return { items: paginated, total, page, perPage }
  }
})
