import type { Product, Category } from '~/types'

export function mapProduct(doc: Record<string, unknown>): Product {
  const d = doc as Record<string, any>
  return {
    id: d.$id,
    name: d.name,
    slug: d.slug,
    shortDescription: d.shortDescription,
    description: d.description,
    price: d.price,
    priceOriginal: d.priceOriginal || undefined,
    currency: d.currency || 'BRL',
    brand: d.brand,
    category: {
      id: d.categoryId,
      name: d.categoryName,
      slug: d.categorySlug,
    },
    images: d.images || [],
    thumbnailUrl: d.thumbnailUrl || '',
    availability: d.availability,
    isFeatured: d.isFeatured,
    isNew: d.isNew,
    tags: d.tags || [],
    seo: {
      title: d.seoTitle || undefined,
      description: d.seoDescription || undefined,
    },
    createdAt: d.$createdAt,
    updatedAt: d.$updatedAt,
  }
}

export function mapCategory(doc: Record<string, unknown>): Category {
  const d = doc as Record<string, any>
  return {
    id: d.$id,
    name: d.name,
    slug: d.slug,
    description: d.description || undefined,
    thumbnailUrl: d.thumbnailUrl || undefined,
    icon: d.icon || undefined,
    order: d.order,
    isActive: d.isActive,
    seo: {
      title: d.seoTitle || undefined,
      description: d.seoDescription || undefined,
    },
  }
}
