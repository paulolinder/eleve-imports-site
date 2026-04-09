import type { Category } from '~/types'

export const CATEGORIES: Category[] = [
  {
    id: 'cat_iphones',
    name: 'iPhones',
    slug: 'iphones',
    description:
      'iPhones originais importados com garantia. Todos os modelos disponíveis, desbloqueados e prontos para uso no Brasil.',
    thumbnailUrl: '/images/categories/iphones.jpg',
    icon: 'ph:device-mobile',
    order: 1,
    isActive: true,
    productCount: 12,
    seo: {
      title: 'iPhones Importados | Eleve Imports',
      description:
        'Compre iPhones originais importados com garantia. Todos os modelos: iPhone 15, 16 e mais. Desbloqueados, entrega rápida.',
      keywords: ['iphone importado', 'iphone original', 'iphone desbloqueado', 'comprar iphone'],
    },
  },
  {
    id: 'cat_perfumes',
    name: 'Perfumes Árabes',
    slug: 'perfumes-arabes',
    description:
      'Perfumes árabes exclusivos, importados diretamente do Oriente Médio. Fragrâncias únicas, concentradas e de longa duração.',
    thumbnailUrl: '/images/categories/perfumes.jpg',
    icon: 'ph:sparkle',
    order: 2,
    isActive: true,
    productCount: 24,
    seo: {
      title: 'Perfumes Árabes Importados | Eleve Imports',
      description:
        'Perfumes árabes exclusivos importados do Oriente Médio. Fragrâncias concentradas, oud, attar e muito mais.',
      keywords: [
        'perfume árabe',
        'perfume importado',
        'oud',
        'attar',
        'perfume oriental',
        'perfume exclusivo',
      ],
    },
  },
]
