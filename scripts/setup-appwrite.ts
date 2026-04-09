/**
 * Script de setup do Appwrite — cria database, collections, atributos, índices e storage buckets.
 * Executar: npx tsx scripts/setup-appwrite.ts
 */
import { Client, Databases, Storage, ID, Permission, Role } from 'node-appwrite'
import 'dotenv/config'

const endpoint = process.env.APPWRITE_ENDPOINT!.replace(/\/$/, '')
const fullEndpoint = endpoint.endsWith('/v1') ? endpoint : `${endpoint}/v1`

const client = new Client()
client
  .setEndpoint(fullEndpoint)
  .setProject(process.env.APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_API_KEY!)

const databases = new Databases(client)
const storage = new Storage(client)

const DATABASE_ID = 'eleve_imports_db'

// Helper para esperar atributo ficar available
async function waitForAttribute(collectionId: string, key: string, maxRetries = 30) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const attr = await databases.getAttribute(DATABASE_ID, collectionId, key)
      if ((attr as any).status === 'available') return
    } catch {
      // attribute might not exist yet
    }
    await new Promise((r) => setTimeout(r, 1000))
  }
  console.warn(`  ⚠ Timeout waiting for attribute ${key} on ${collectionId}`)
}

// Helper para criar atributo com retry
async function createString(collectionId: string, key: string, size: number, required: boolean, def?: string, array = false) {
  try {
    await databases.createStringAttribute(DATABASE_ID, collectionId, key, size, required, def, array)
    console.log(`    + ${key} (string${array ? '[]' : ''})`)
  } catch (e: any) {
    if (e.code === 409) console.log(`    ~ ${key} already exists`)
    else throw e
  }
}

async function createInteger(collectionId: string, key: string, required: boolean, min?: number, max?: number, def?: number) {
  try {
    await databases.createIntegerAttribute(DATABASE_ID, collectionId, key, required, min, max, def)
    console.log(`    + ${key} (integer)`)
  } catch (e: any) {
    if (e.code === 409) console.log(`    ~ ${key} already exists`)
    else throw e
  }
}

async function createFloat(collectionId: string, key: string, required: boolean, min?: number, max?: number, def?: number) {
  try {
    await databases.createFloatAttribute(DATABASE_ID, collectionId, key, required, min, max, def)
    console.log(`    + ${key} (float)`)
  } catch (e: any) {
    if (e.code === 409) console.log(`    ~ ${key} already exists`)
    else throw e
  }
}

async function createBoolean(collectionId: string, key: string, required: boolean, def?: boolean) {
  try {
    await databases.createBooleanAttribute(DATABASE_ID, collectionId, key, required, def)
    console.log(`    + ${key} (boolean)`)
  } catch (e: any) {
    if (e.code === 409) console.log(`    ~ ${key} already exists`)
    else throw e
  }
}

async function createEnum(collectionId: string, key: string, elements: string[], required: boolean, def?: string) {
  try {
    await databases.createEnumAttribute(DATABASE_ID, collectionId, key, elements, required, def)
    console.log(`    + ${key} (enum: ${elements.join(', ')})`)
  } catch (e: any) {
    if (e.code === 409) console.log(`    ~ ${key} already exists`)
    else throw e
  }
}

async function createDatetime(collectionId: string, key: string, required: boolean) {
  try {
    await databases.createDatetimeAttribute(DATABASE_ID, collectionId, key, required)
    console.log(`    + ${key} (datetime)`)
  } catch (e: any) {
    if (e.code === 409) console.log(`    ~ ${key} already exists`)
    else throw e
  }
}

async function createEmail(collectionId: string, key: string, required: boolean) {
  try {
    await databases.createEmailAttribute(DATABASE_ID, collectionId, key, required)
    console.log(`    + ${key} (email)`)
  } catch (e: any) {
    if (e.code === 409) console.log(`    ~ ${key} already exists`)
    else throw e
  }
}

async function createIndex(collectionId: string, key: string, type: string, attributes: string[], orders?: string[]) {
  try {
    await databases.createIndex(DATABASE_ID, collectionId, key, type as any, attributes, orders)
    console.log(`    ⚡ index: ${key} (${type})`)
  } catch (e: any) {
    if (e.code === 409) console.log(`    ~ index ${key} already exists`)
    else throw e
  }
}

async function createCollection(id: string, name: string, permissions: string[]) {
  try {
    await databases.createCollection(DATABASE_ID, id, name, permissions, false)
    console.log(`  ✓ Collection: ${name}`)
  } catch (e: any) {
    if (e.code === 409) console.log(`  ~ Collection ${name} already exists`)
    else throw e
  }
}

async function createBucket(id: string, name: string, permissions: string[], maxSize: number, allowedExtensions: string[]) {
  try {
    await storage.createBucket(id, name, permissions, false, undefined, maxSize, allowedExtensions)
    console.log(`  ✓ Bucket: ${name}`)
  } catch (e: any) {
    if (e.code === 409) console.log(`  ~ Bucket ${name} already exists`)
    else throw e
  }
}

// ============================================================
// MAIN
// ============================================================
async function main() {
  console.log('\n🚀 Eleve Imports — Appwrite Setup\n')
  console.log(`Endpoint: ${process.env.APPWRITE_ENDPOINT}`)
  console.log(`Project:  ${process.env.APPWRITE_PROJECT_ID}\n`)

  // ── DATABASE ──
  console.log('📦 Criando database...')
  try {
    await databases.create(DATABASE_ID, 'Eleve Imports')
    console.log('  ✓ Database criada: eleve_imports_db')
  } catch (e: any) {
    if (e.code === 409) console.log('  ~ Database já existe')
    else throw e
  }

  const publicRead = [Permission.read(Role.any())]
  const publicReadUserWrite = [
    Permission.read(Role.any()),
    Permission.create(Role.users()),
    Permission.update(Role.users()),
    Permission.delete(Role.users()),
  ]
  const usersOnly = [
    Permission.read(Role.users()),
    Permission.create(Role.users()),
    Permission.update(Role.users()),
    Permission.delete(Role.users()),
  ]
  const contactPerms = [
    Permission.read(Role.users()),
    Permission.create(Role.any()),
    Permission.update(Role.users()),
    Permission.delete(Role.users()),
  ]

  // ── COLLECTION: products (18 atributos já criados) ──
  console.log('\n📋 Collection: products')
  await createCollection('products', 'Products', publicReadUserWrite)
  console.log('  ℹ Atributos já existem (18/18) — pulando para índices')

  // Aguardar atributos já criados estarem available
  await waitForAttribute('products', 'slug')
  await waitForAttribute('products', 'categorySlug')
  await waitForAttribute('products', 'isFeatured')
  await waitForAttribute('products', 'brand')
  await waitForAttribute('products', 'name')

  await createIndex('products', 'idx_slug', 'unique', ['slug'])
  await createIndex('products', 'idx_category_avail', 'key', ['categorySlug', 'availability'])
  await createIndex('products', 'idx_featured', 'key', ['isFeatured'])
  await createIndex('products', 'idx_brand', 'key', ['brand'])
  await createIndex('products', 'idx_name_search', 'fulltext', ['name'])

  // ── COLLECTION: categories ──
  console.log('\n📋 Collection: categories')
  await createCollection('categories', 'Categories', publicReadUserWrite)

  await createString('categories', 'name', 100, true)
  await createString('categories', 'slug', 100, true)
  await createString('categories', 'description', 1000, false)
  await createString('categories', 'thumbnailUrl', 500, false)
  await createString('categories', 'icon', 100, false)
  await createInteger('categories', 'order', true, 0, 999)
  await createBoolean('categories', 'isActive', true)
  await createString('categories', 'seoTitle', 255, false)
  await createString('categories', 'seoDescription', 500, false)

  console.log('  ⏳ Aguardando atributos...')
  await waitForAttribute('categories', 'slug')
  await waitForAttribute('categories', 'isActive')
  await waitForAttribute('categories', 'order')

  await createIndex('categories', 'idx_slug', 'unique', ['slug'])
  await createIndex('categories', 'idx_active_order', 'key', ['isActive', 'order'])

  // ── COLLECTION: banners ──
  console.log('\n📋 Collection: banners')
  await createCollection('banners', 'Banners', publicReadUserWrite)

  await createString('banners', 'title', 255, true)
  await createString('banners', 'subtitle', 500, false)
  await createString('banners', 'imageUrl', 500, true)
  await createString('banners', 'imageMobileUrl', 500, false)
  await createString('banners', 'linkTo', 500, false)
  await createString('banners', 'ctaText', 100, false)
  await createEnum('banners', 'position', ['hero', 'promo', 'category'], true)
  await createInteger('banners', 'order', true, 0, 999)
  await createBoolean('banners', 'isActive', true)
  await createDatetime('banners', 'startsAt', false)
  await createDatetime('banners', 'endsAt', false)

  console.log('  ⏳ Aguardando atributos...')
  await waitForAttribute('banners', 'isActive')
  await waitForAttribute('banners', 'position')

  await createIndex('banners', 'idx_active_position', 'key', ['isActive', 'position'])

  // ── COLLECTION: contacts ──
  console.log('\n📋 Collection: contacts')
  await createCollection('contacts', 'Contacts', contactPerms)

  await createString('contacts', 'name', 200, true)
  await createEmail('contacts', 'email', false)
  await createString('contacts', 'phone', 20, true)
  await createString('contacts', 'message', 2000, true)
  await createEnum('contacts', 'source', ['site', 'whatsapp', 'instagram'], true)
  await createEnum('contacts', 'status', ['new', 'read', 'replied', 'archived'], true)
  await createString('contacts', 'notes', 2000, false)

  console.log('  ⏳ Aguardando atributos...')
  await waitForAttribute('contacts', 'status')

  await createIndex('contacts', 'idx_status', 'key', ['status'])

  // ── COLLECTION: customers ──
  console.log('\n📋 Collection: customers')
  await createCollection('customers', 'Customers', usersOnly)

  await createString('customers', 'name', 200, true)
  await createString('customers', 'phone', 20, true)
  await createEmail('customers', 'email', false)
  await createString('customers', 'instagram', 100, false)
  await createString('customers', 'city', 100, false)
  await createString('customers', 'state', 2, false)
  await createString('customers', 'notes', 5000, false)
  await createString('customers', 'tags', 100, false, undefined, true)
  await createEnum('customers', 'source', ['whatsapp', 'instagram', 'site', 'indicacao', 'outro'], true)
  await createInteger('customers', 'totalPurchases', false, 0, undefined, 0)
  await createFloat('customers', 'totalSpent', false, 0, undefined, 0)
  await createDatetime('customers', 'lastPurchaseAt', false)
  await createEnum('customers', 'status', ['lead', 'active', 'vip', 'inactive'], true)

  console.log('  ⏳ Aguardando atributos...')
  await waitForAttribute('customers', 'phone')
  await waitForAttribute('customers', 'status')
  await waitForAttribute('customers', 'name')

  await createIndex('customers', 'idx_phone', 'unique', ['phone'])
  await createIndex('customers', 'idx_status', 'key', ['status'])
  await createIndex('customers', 'idx_name_search', 'fulltext', ['name'])

  // ── COLLECTION: orders (9 atributos já criados) ──
  console.log('\n📋 Collection: orders')
  await createCollection('orders', 'Orders', usersOnly)
  console.log('  ℹ Atributos já existem (9/9) — pulando para índices')

  await waitForAttribute('orders', 'customerId')
  await waitForAttribute('orders', 'status')

  await createIndex('orders', 'idx_customer', 'key', ['customerId'])
  await createIndex('orders', 'idx_status', 'key', ['status'])

  // ── COLLECTION: site_config ──
  console.log('\n📋 Collection: site_config')
  await createCollection('site_config', 'Site Config', publicReadUserWrite)

  await createString('site_config', 'key', 100, true)
  await createString('site_config', 'value', 5000, true)
  await createEnum('site_config', 'type', ['string', 'number', 'boolean', 'json'], true)
  await createString('site_config', 'description', 500, false)

  console.log('  ⏳ Aguardando atributos...')
  await waitForAttribute('site_config', 'key')

  await createIndex('site_config', 'idx_key', 'unique', ['key'])

  // ── COLLECTION: blog_posts ──
  console.log('\n📋 Collection: blog_posts')
  await createCollection('blog_posts', 'Blog Posts', publicReadUserWrite)

  await createString('blog_posts', 'title', 255, true)
  await createString('blog_posts', 'slug', 255, true)
  await createString('blog_posts', 'excerpt', 500, true)
  await createString('blog_posts', 'content', 50000, true)
  await createString('blog_posts', 'coverImage', 500, false)
  await createString('blog_posts', 'author', 100, true)
  await createString('blog_posts', 'category', 100, true)
  await createString('blog_posts', 'tags', 100, false, undefined, true)
  await createString('blog_posts', 'seoTitle', 255, false)
  await createString('blog_posts', 'seoDescription', 500, false)
  await createBoolean('blog_posts', 'isPublished', true)
  await createDatetime('blog_posts', 'publishedAt', false)

  console.log('  ⏳ Aguardando atributos...')
  await waitForAttribute('blog_posts', 'slug')
  await waitForAttribute('blog_posts', 'isPublished')
  await waitForAttribute('blog_posts', 'category')

  await createIndex('blog_posts', 'idx_slug', 'unique', ['slug'])
  await createIndex('blog_posts', 'idx_published', 'key', ['isPublished'])
  await createIndex('blog_posts', 'idx_category', 'key', ['category'])

  // ── STORAGE BUCKETS ──
  console.log('\n🗄️  Criando Storage Buckets...')

  const publicBucketPerms = [
    Permission.read(Role.any()),
    Permission.create(Role.users()),
    Permission.update(Role.users()),
    Permission.delete(Role.users()),
  ]
  const privateBucketPerms = [
    Permission.read(Role.users()),
    Permission.create(Role.users()),
    Permission.update(Role.users()),
    Permission.delete(Role.users()),
  ]

  const imageExts = ['jpg', 'jpeg', 'png', 'webp', 'avif', 'gif', 'svg']

  await createBucket('product-images', 'Product Images', publicBucketPerms, 5 * 1024 * 1024, imageExts)
  await createBucket('category-images', 'Category Images', publicBucketPerms, 3 * 1024 * 1024, imageExts)
  await createBucket('banner-images', 'Banner Images', publicBucketPerms, 5 * 1024 * 1024, imageExts)
  await createBucket('blog-images', 'Blog Images', publicBucketPerms, 5 * 1024 * 1024, imageExts)
  await createBucket('attachments', 'Attachments', privateBucketPerms, 10 * 1024 * 1024, [...imageExts, 'pdf', 'doc', 'docx', 'xls', 'xlsx'])

  console.log('\n✅ Setup completo!\n')
}

main().catch((err) => {
  console.error('\n❌ Erro no setup:', err.message || err)
  process.exit(1)
})
