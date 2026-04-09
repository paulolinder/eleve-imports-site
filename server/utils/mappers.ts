import type { Product, Category } from '~/types'

/**
 * Mapeia documento do Appwrite para o tipo Product do frontend.
 */
export function mapProduct(doc: Record<string, any>): Product {
  return {
    id: doc.$id,
    name: doc.name,
    slug: doc.slug,
    shortDescription: doc.shortDescription,
    description: doc.description,
    price: doc.price,
    priceOriginal: doc.priceOriginal || undefined,
    currency: doc.currency || 'BRL',
    brand: doc.brand,
    category: {
      id: doc.categoryId,
      name: doc.categoryName,
      slug: doc.categorySlug,
    },
    images: doc.images || [],
    thumbnailUrl: doc.thumbnailUrl || '',
    availability: doc.availability,
    isFeatured: doc.isFeatured,
    isNew: doc.isNew,
    tags: doc.tags || [],
    seo: {
      title: doc.seoTitle || undefined,
      description: doc.seoDescription || undefined,
    },
    createdAt: doc.$createdAt,
    updatedAt: doc.$updatedAt,
  }
}

/**
 * Mapeia documento do Appwrite para o tipo Category do frontend.
 */
export function mapCategory(doc: Record<string, any>): Category {
  return {
    id: doc.$id,
    name: doc.name,
    slug: doc.slug,
    description: doc.description || undefined,
    thumbnailUrl: doc.thumbnailUrl || undefined,
    icon: doc.icon || undefined,
    order: doc.order,
    isActive: doc.isActive,
    seo: {
      title: doc.seoTitle || undefined,
      description: doc.seoDescription || undefined,
    },
  }
}
