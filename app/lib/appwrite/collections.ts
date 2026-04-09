/**
 * IDs das collections no Appwrite.
 * Convenção: snake_case, plural, descritivo.
 * Mantenha sincronizado com o painel do Appwrite.
 */
export const COLLECTIONS = {
  PRODUCTS: 'products',
  CATEGORIES: 'categories',
  BANNERS: 'banners',
  SITE_CONFIG: 'site_config',
} as const

export type CollectionId = (typeof COLLECTIONS)[keyof typeof COLLECTIONS]

/**
 * Database ID no Appwrite.
 * Em produção, use uma variável de ambiente se necessário.
 */
export const DATABASE_ID = 'eleve_imports_db'

/**
 * Limites padrão para queries.
 */
export const QUERY_LIMITS = {
  DEFAULT: 25,
  MAX: 100,
  FEATURED: 8,
  RELATED: 4,
} as const
