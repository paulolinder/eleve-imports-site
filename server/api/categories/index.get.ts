import { CATEGORIES } from '~/data/categories'
import { DATABASE_ID, COLLECTIONS } from '~/lib/appwrite/collections'

export default defineEventHandler(async (_event) => {
  try {
    const { databases } = getAppwriteServer()
    const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.CATEGORIES, [
      Query.equal('isActive', true),
      Query.orderAsc('order'),
    ])

    return response.documents.map(mapCategory)
  } catch {
    return CATEGORIES.filter((c) => c.isActive)
  }
})
