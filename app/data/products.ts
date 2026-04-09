import type { Product } from '~/types'

export const PRODUCTS: Product[] = [
  // iPhones
  {
    id: 'prod_iphone16_pro_max_256',
    name: 'iPhone 16 Pro Max 256GB',
    slug: 'iphone-16-pro-max-256gb',
    shortDescription: 'O mais poderoso iPhone. Chip A18 Pro, câmera de 48MP, tela de 6,9".',
    description:
      'iPhone 16 Pro Max com 256GB de armazenamento, chip A18 Pro, sistema de câmera Pro com 48MP, tela Super Retina XDR de 6,9", Dynamic Island e bateria de longa duração. Importado, desbloqueado para todas as operadoras.',
    price: 9499,
    priceOriginal: 10999,
    currency: 'BRL',
    brand: 'Apple',
    category: { id: 'cat_iphones', name: 'iPhones', slug: 'iphones' },
    images: [
      '/images/products/iphone-16-pro-max-1.jpg',
      '/images/products/iphone-16-pro-max-2.jpg',
    ],
    thumbnailUrl: '/images/products/iphone-16-pro-max-thumb.jpg',
    availability: 'available',
    isFeatured: true,
    isNew: true,
    tags: ['iphone', 'apple', 'pro max', 'smartphone'],
    seo: {
      title: 'iPhone 16 Pro Max 256GB | Eleve Imports',
      description:
        'Compre iPhone 16 Pro Max 256GB importado. Chip A18 Pro, câmera 48MP, desbloqueado. Garantia e entrega segura.',
      keywords: ['iphone 16 pro max', 'iphone 256gb', 'iphone importado', 'comprar iphone 16'],
    },
    createdAt: '2025-01-15T10:00:00.000Z',
    updatedAt: '2025-03-01T10:00:00.000Z',
  },
  {
    id: 'prod_iphone16_128',
    name: 'iPhone 16 128GB',
    slug: 'iphone-16-128gb',
    shortDescription: 'iPhone 16 com chip A18, câmera avançada e design refinado.',
    description:
      'iPhone 16 com 128GB, chip A18, câmera de 48MP com zoom óptico, tela Super Retina XDR de 6,1". Desbloqueado para todas as operadoras.',
    price: 6799,
    priceOriginal: 7499,
    currency: 'BRL',
    brand: 'Apple',
    category: { id: 'cat_iphones', name: 'iPhones', slug: 'iphones' },
    images: ['/images/products/iphone-16-1.jpg'],
    thumbnailUrl: '/images/products/iphone-16-thumb.jpg',
    availability: 'available',
    isFeatured: true,
    isNew: true,
    tags: ['iphone', 'apple', 'smartphone'],
    seo: {
      title: 'iPhone 16 128GB Importado | Eleve Imports',
      description:
        'iPhone 16 128GB importado, chip A18, câmera 48MP. Desbloqueado com garantia.',
      keywords: ['iphone 16', 'iphone 128gb', 'iphone importado'],
    },
    createdAt: '2025-01-20T10:00:00.000Z',
    updatedAt: '2025-03-01T10:00:00.000Z',
  },
  {
    id: 'prod_iphone15_pro_256',
    name: 'iPhone 15 Pro 256GB',
    slug: 'iphone-15-pro-256gb',
    shortDescription: 'iPhone 15 Pro com titânio, chip A17 Pro e câmera de 48MP.',
    description:
      'iPhone 15 Pro com carcaça em titânio, chip A17 Pro, câmera de 48MP com zoom óptico de 3x, Dynamic Island e USB-C. 256GB de armazenamento.',
    price: 7999,
    currency: 'BRL',
    brand: 'Apple',
    category: { id: 'cat_iphones', name: 'iPhones', slug: 'iphones' },
    images: ['/images/products/iphone-15-pro-1.jpg'],
    thumbnailUrl: '/images/products/iphone-15-pro-thumb.jpg',
    availability: 'available',
    isFeatured: false,
    isNew: false,
    tags: ['iphone', 'apple', 'pro', 'titanio'],
    seo: {
      title: 'iPhone 15 Pro 256GB | Eleve Imports',
      description: 'iPhone 15 Pro 256GB importado com titânio e chip A17 Pro.',
      keywords: ['iphone 15 pro', 'iphone titanio', 'iphone importado'],
    },
    createdAt: '2025-01-10T10:00:00.000Z',
    updatedAt: '2025-02-15T10:00:00.000Z',
  },

  // Perfumes Árabes
  {
    id: 'prod_oud_royal_100ml',
    name: 'Oud Royal 100ml',
    slug: 'oud-royal-100ml',
    shortDescription: 'Fragrância oriental intensa com oud nobre, âmbar e notas amadeiradas.',
    description:
      'Oud Royal é uma composição olfativa de luxo inspirada nos grandes oudhs árabes. Notas de topo: cardamomo e bergamota. Notas de coração: oud nobre, rosa de Damasco. Notas de fundo: âmbar, baunilha e sândalo. Concentração parfum, 100ml.',
    price: 389,
    priceOriginal: 459,
    currency: 'BRL',
    brand: 'Arabian Oud',
    category: {
      id: 'cat_perfumes',
      name: 'Perfumes Árabes',
      slug: 'perfumes-arabes',
    },
    images: ['/images/products/oud-royal-1.jpg', '/images/products/oud-royal-2.jpg'],
    thumbnailUrl: '/images/products/oud-royal-thumb.jpg',
    availability: 'available',
    isFeatured: true,
    isNew: false,
    tags: ['oud', 'arabico', 'oriental', 'amadeirado', 'parfum'],
    seo: {
      title: 'Oud Royal 100ml | Perfume Árabe | Eleve Imports',
      description:
        'Oud Royal, perfume árabe original com oud nobre e âmbar. Concentração parfum, 100ml. Alta fixação e longa duração.',
      keywords: ['oud royal', 'perfume arabe', 'oud importado', 'perfume oriental'],
    },
    createdAt: '2025-01-05T10:00:00.000Z',
    updatedAt: '2025-02-10T10:00:00.000Z',
  },
  {
    id: 'prod_mukhallat_gold_50ml',
    name: 'Mukhallat Gold 50ml',
    slug: 'mukhallat-gold-50ml',
    shortDescription: 'Blend exclusivo de attar puro com rosas, oud e musk.',
    description:
      'Mukhallat Gold é um blend aromático artesanal de attar puro. Composição rica em rosa turca, oud cambojano, musk branco e âmbar dourado. Sem álcool, altíssima concentração. 50ml em frasco artesanal.',
    price: 279,
    currency: 'BRL',
    brand: 'Swiss Arabian',
    category: {
      id: 'cat_perfumes',
      name: 'Perfumes Árabes',
      slug: 'perfumes-arabes',
    },
    images: ['/images/products/mukhallat-gold-1.jpg'],
    thumbnailUrl: '/images/products/mukhallat-gold-thumb.jpg',
    availability: 'available',
    isFeatured: true,
    isNew: true,
    tags: ['mukhallat', 'attar', 'sem alcool', 'musk', 'rosa'],
    seo: {
      title: 'Mukhallat Gold 50ml | Attar Árabe | Eleve Imports',
      description:
        'Mukhallat Gold, blend de attar puro sem álcool com oud, rosa e musk. Perfume árabe de alta concentração.',
      keywords: ['mukhallat', 'attar puro', 'perfume sem alcool', 'perfume arabe'],
    },
    createdAt: '2025-01-08T10:00:00.000Z',
    updatedAt: '2025-02-20T10:00:00.000Z',
  },
  {
    id: 'prod_amber_oud_black_100ml',
    name: 'Amber Oud Black 100ml',
    slug: 'amber-oud-black-100ml',
    shortDescription: 'Intensidade máxima: oud escuro, âmbar fumegante e especiarias raras.',
    description:
      'Amber Oud Black é para quem busca o extremo das fragrâncias orientais. Abertura fumegante com notas de defumação e cardamomo negro. Coração de oud preto, patchouli intenso e couro. Fundo duradouro de âmbar, vetiver e musgo.',
    price: 449,
    currency: 'BRL',
    brand: 'Arabian Oud',
    category: {
      id: 'cat_perfumes',
      name: 'Perfumes Árabes',
      slug: 'perfumes-arabes',
    },
    images: ['/images/products/amber-oud-black-1.jpg'],
    thumbnailUrl: '/images/products/amber-oud-black-thumb.jpg',
    availability: 'available',
    isFeatured: false,
    isNew: true,
    tags: ['amber', 'oud', 'couro', 'especiarias', 'intenso'],
    seo: {
      title: 'Amber Oud Black 100ml | Perfume Árabe Intenso | Eleve Imports',
      description:
        'Amber Oud Black, perfume árabe com oud escuro e âmbar fumegante. Intensidade máxima, longa duração.',
      keywords: ['amber oud', 'oud black', 'perfume arabe intenso', 'parfum oriental'],
    },
    createdAt: '2025-02-01T10:00:00.000Z',
    updatedAt: '2025-03-05T10:00:00.000Z',
  },
]

export const FEATURED_PRODUCTS = PRODUCTS.filter((p) => p.isFeatured)
