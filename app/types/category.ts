export interface CategorySeo {
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  thumbnailUrl?: string
  icon?: string
  order: number
  isActive: boolean
  productCount?: number
  seo: CategorySeo
}
