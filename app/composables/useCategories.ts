import { Query } from 'appwrite'
import type { Category } from '~/types'
import { DATABASE_ID, COLLECTIONS } from '~/lib/appwrite/collections'
import { CATEGORIES } from '~/data/categories'

export function useCategories() {
  return useAsyncData<Category[]>(
    'categories',
    async () => {
      try {
        const { databases } = useAppwriteClient()
        const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.CATEGORIES, [
          Query.equal('isActive', [true]),
          Query.orderAsc('order'),
        ])
        return response.documents.map(mapCategory)
      } catch {
        return CATEGORIES.filter((c) => c.isActive)
      }
    },
    { default: () => [] },
  )
}
