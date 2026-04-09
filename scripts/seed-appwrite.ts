/**
 * Seed do Appwrite — popula categories, products e site_config com dados iniciais.
 * Executar: npx tsx scripts/seed-appwrite.ts
 */
import { Client, Databases, ID } from 'node-appwrite'
import 'dotenv/config'

const endpoint = process.env.APPWRITE_ENDPOINT!.replace(/\/$/, '')
const fullEndpoint = endpoint.endsWith('/v1') ? endpoint : `${endpoint}/v1`

const client = new Client()
client
  .setEndpoint(fullEndpoint)
  .setProject(process.env.APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_API_KEY!)

const databases = new Databases(client)
const DB = 'eleve_imports_db'

async function createDoc(collection: string, data: Record<string, any>, id?: string) {
  try {
    await databases.createDocument(DB, collection, id || ID.unique(), data)
    console.log(`  ✓ ${collection}: ${data.name || data.title || data.key}`)
  } catch (e: any) {
    if (e.code === 409) console.log(`  ~ ${data.name || data.title || data.key} already exists`)
    else console.error(`  ✗ ${data.name || data.title || data.key}: ${e.message}`)
  }
}

async function main() {
  console.log('\n🌱 Eleve Imports — Seed\n')

  // ── CATEGORIES ──
  console.log('📂 Categories:')
  await createDoc('categories', {
    name: 'iPhones',
    slug: 'iphones',
    description: 'iPhones originais importados com garantia. Todos os modelos disponíveis, desbloqueados e prontos para uso no Brasil.',
    thumbnailUrl: '',
    icon: 'ph:device-mobile-camera',
    order: 1,
    isActive: true,
    seoTitle: 'iPhones Importados | Eleve Imports',
    seoDescription: 'Compre iPhones originais importados com garantia. iPhone 15, 16 e mais. Desbloqueados, entrega rápida.',
  }, 'cat_iphones')

  await createDoc('categories', {
    name: 'Perfumes Árabes',
    slug: 'perfumes-arabes',
    description: 'Perfumes árabes exclusivos, importados diretamente do Oriente Médio. Fragrâncias únicas, concentradas e de longa duração.',
    thumbnailUrl: '',
    icon: 'ph:sparkle',
    order: 2,
    isActive: true,
    seoTitle: 'Perfumes Árabes Importados | Eleve Imports',
    seoDescription: 'Perfumes árabes exclusivos importados do Oriente Médio. Oud, attar, fragrâncias concentradas.',
  }, 'cat_perfumes')

  // ── PRODUCTS ──
  console.log('\n📦 Products:')

  await createDoc('products', {
    name: 'iPhone 16 Pro Max 256GB',
    slug: 'iphone-16-pro-max-256gb',
    shortDescription: 'O mais poderoso iPhone. Chip A18 Pro, câmera de 48MP, tela de 6,9".',
    description: 'iPhone 16 Pro Max com 256GB de armazenamento, chip A18 Pro, sistema de câmera Pro com 48MP, tela Super Retina XDR de 6,9", Dynamic Island e bateria de longa duração. Importado, desbloqueado para todas as operadoras.',
    price: 9499,
    priceOriginal: 10999,
    currency: 'BRL',
    brand: 'Apple',
    categoryId: 'cat_iphones',
    categorySlug: 'iphones',
    categoryName: 'iPhones',
    images: [],
    thumbnailUrl: '',
    availability: 'available',
    isFeatured: true,
    isNew: true,
    tags: ['iphone', 'apple', 'pro max', 'smartphone'],
    specifications: JSON.stringify({ storage: '256GB', chip: 'A18 Pro', screen: '6.9" Super Retina XDR', camera: '48MP Pro', battery: 'Até 33h vídeo' }),
  })

  await createDoc('products', {
    name: 'iPhone 16 128GB',
    slug: 'iphone-16-128gb',
    shortDescription: 'iPhone 16 com chip A18, câmera avançada e design refinado.',
    description: 'iPhone 16 com 128GB, chip A18, câmera de 48MP com zoom óptico, tela Super Retina XDR de 6,1". Desbloqueado para todas as operadoras.',
    price: 6799,
    priceOriginal: 7499,
    currency: 'BRL',
    brand: 'Apple',
    categoryId: 'cat_iphones',
    categorySlug: 'iphones',
    categoryName: 'iPhones',
    images: [],
    thumbnailUrl: '',
    availability: 'available',
    isFeatured: true,
    isNew: true,
    tags: ['iphone', 'apple', 'smartphone'],
    specifications: JSON.stringify({ storage: '128GB', chip: 'A18', screen: '6.1" Super Retina XDR', camera: '48MP' }),
  })

  await createDoc('products', {
    name: 'iPhone 15 Pro 256GB',
    slug: 'iphone-15-pro-256gb',
    shortDescription: 'iPhone 15 Pro com titânio, chip A17 Pro e câmera de 48MP.',
    description: 'iPhone 15 Pro com carcaça em titânio, chip A17 Pro, câmera de 48MP com zoom óptico de 3x, Dynamic Island e USB-C. 256GB.',
    price: 7999,
    priceOriginal: 0,
    currency: 'BRL',
    brand: 'Apple',
    categoryId: 'cat_iphones',
    categorySlug: 'iphones',
    categoryName: 'iPhones',
    images: [],
    thumbnailUrl: '',
    availability: 'available',
    isFeatured: false,
    isNew: false,
    tags: ['iphone', 'apple', 'pro', 'titanio'],
    specifications: JSON.stringify({ storage: '256GB', chip: 'A17 Pro', screen: '6.1"', camera: '48MP', material: 'Titânio' }),
  })

  await createDoc('products', {
    name: 'Oud Royal 100ml',
    slug: 'oud-royal-100ml',
    shortDescription: 'Fragrância oriental intensa com oud nobre, âmbar e notas amadeiradas.',
    description: 'Oud Royal é uma composição olfativa de luxo inspirada nos grandes oudhs árabes. Notas de topo: cardamomo e bergamota. Coração: oud nobre, rosa de Damasco. Fundo: âmbar, baunilha e sândalo. Concentração parfum, 100ml.',
    price: 389,
    priceOriginal: 459,
    currency: 'BRL',
    brand: 'Arabian Oud',
    categoryId: 'cat_perfumes',
    categorySlug: 'perfumes-arabes',
    categoryName: 'Perfumes Árabes',
    images: [],
    thumbnailUrl: '',
    availability: 'available',
    isFeatured: true,
    isNew: false,
    tags: ['oud', 'arabico', 'oriental', 'amadeirado', 'parfum'],
    specifications: JSON.stringify({ volume: '100ml', concentration: 'Parfum', origin: 'Oriente Médio', notes: 'Oud, Rosa, Âmbar' }),
  })

  await createDoc('products', {
    name: 'Mukhallat Gold 50ml',
    slug: 'mukhallat-gold-50ml',
    shortDescription: 'Blend exclusivo de attar puro com rosas, oud e musk.',
    description: 'Mukhallat Gold é um blend aromático artesanal de attar puro. Rosa turca, oud cambojano, musk branco e âmbar dourado. Sem álcool, altíssima concentração. 50ml em frasco artesanal.',
    price: 279,
    priceOriginal: 0,
    currency: 'BRL',
    brand: 'Swiss Arabian',
    categoryId: 'cat_perfumes',
    categorySlug: 'perfumes-arabes',
    categoryName: 'Perfumes Árabes',
    images: [],
    thumbnailUrl: '',
    availability: 'available',
    isFeatured: true,
    isNew: true,
    tags: ['mukhallat', 'attar', 'sem alcool', 'musk', 'rosa'],
    specifications: JSON.stringify({ volume: '50ml', concentration: 'Attar (sem álcool)', origin: 'Emirados Árabes', notes: 'Rosa, Oud, Musk, Âmbar' }),
  })

  await createDoc('products', {
    name: 'Amber Oud Black 100ml',
    slug: 'amber-oud-black-100ml',
    shortDescription: 'Intensidade máxima: oud escuro, âmbar fumegante e especiarias raras.',
    description: 'Amber Oud Black é para quem busca o extremo das fragrâncias orientais. Abertura fumegante com defumação e cardamomo negro. Coração de oud preto, patchouli intenso e couro. Fundo de âmbar, vetiver e musgo.',
    price: 449,
    priceOriginal: 0,
    currency: 'BRL',
    brand: 'Arabian Oud',
    categoryId: 'cat_perfumes',
    categorySlug: 'perfumes-arabes',
    categoryName: 'Perfumes Árabes',
    images: [],
    thumbnailUrl: '',
    availability: 'available',
    isFeatured: false,
    isNew: true,
    tags: ['amber', 'oud', 'couro', 'especiarias', 'intenso'],
    specifications: JSON.stringify({ volume: '100ml', concentration: 'Eau de Parfum', origin: 'Oriente Médio', notes: 'Oud, Âmbar, Couro, Patchouli' }),
  })

  // ── SITE CONFIG ──
  console.log('\n⚙️  Site Config:')

  const configs = [
    { key: 'whatsapp_number', value: '5511999999999', type: 'string', description: 'Número do WhatsApp principal (com DDI+DDD)' },
    { key: 'instagram_handle', value: 'eleveimports', type: 'string', description: 'Arroba do Instagram (sem @)' },
    { key: 'site_announcement', value: '', type: 'string', description: 'Texto da barra de anúncio do site (vazio = oculta)' },
    { key: 'maintenance_mode', value: 'false', type: 'boolean', description: 'Modo manutenção ativado' },
  ]

  for (const cfg of configs) {
    await createDoc('site_config', cfg)
  }

  console.log('\n✅ Seed completo!\n')
}

main().catch((err) => {
  console.error('\n❌ Erro no seed:', err.message || err)
  process.exit(1)
})
