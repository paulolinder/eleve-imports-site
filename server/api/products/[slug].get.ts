import { PRODUCTS } from '~/data/products'
import { DATABASE_ID, COLLECTIONS } from '~/lib/appwrite/collections'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Slug obrigatório' })
  }

  try {
    const { databases } = getAppwriteServer()
    const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.PRODUCTS, [
      Query.equal('slug', slug),
      Query.limit(1),
    ])

    if (response.documents.length === 0) {
      throw createError({ statusCode: 404, statusMessage: 'Produto não encontrado' })
    }

    return mapProduct(response.documents[0])
  } catch (err: unknown) {
    if (err && typeof err === 'object' && 'statusCode' in err) throw err

    const product = PRODUCTS.find((p) => p.slug === slug)
    if (!product) {
      throw createError({ statusCode: 404, statusMessage: 'Produto não encontrado' })
    }
    return product
  }
})
