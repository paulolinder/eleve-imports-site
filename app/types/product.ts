export interface ProductSeo {
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: string
}

export type ProductAvailability = 'available' | 'out_of_stock' | 'coming_soon'

export interface ProductCategory {
  id: string
  name: string
  slug: string
}

export interface Product {
  id: string
  name: string
  slug: string
  shortDescription: string
  description: string
  price: number
  priceOriginal?: number
  currency: 'BRL'
  brand: string
  category: ProductCategory
  images: string[]
  thumbnailUrl: string
  availability: ProductAvailability
  isFeatured: boolean
  isNew: boolean
  tags: string[]
  seo: ProductSeo
  createdAt: string
  updatedAt: string
}

export interface ProductFilters {
  category?: string
  brand?: string
  availability?: ProductAvailability
  featured?: boolean
  search?: string
  minPrice?: number
  maxPrice?: number
}

export interface ProductListResponse {
  items: Product[]
  total: number
  page: number
  perPage: number
}
