import { getAppwriteServer, Query } from '~/server/utils/appwrite'
import { PRODUCTS } from '~/data/products'
import { DATABASE_ID, COLLECTIONS } from '~/lib/appwrite/collections'
import type { Product } from '~/types'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Slug obrigatório' })
  }

  // Tenta buscar do Appwrite; fallback para mock
  try {
    const { databases } = getAppwriteServer()
    const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.PRODUCTS, [
      Query.equal('slug', slug),
      Query.limit(1),
    ])

    if (response.documents.length === 0) {
      throw createError({ statusCode: 404, statusMessage: 'Produto não encontrado' })
    }

    return response.documents[0] as unknown as Product
  } catch (err: unknown) {
    // Re-throw 404s
    if (err && typeof err === 'object' && 'statusCode' in err) throw err

    // Fallback para mock
    const product = PRODUCTS.find((p) => p.slug === slug)

    if (!product) {
      throw createError({ statusCode: 404, statusMessage: 'Produto não encontrado' })
    }

    return product
  }
})
