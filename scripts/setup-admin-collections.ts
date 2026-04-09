/**
 * Cria as collections do admin: homepage_products e testimonials.
 * Executar: npx tsx scripts/setup-admin-collections.ts
 */
import { Client, Databases, Permission, Role } from 'node-appwrite'
import 'dotenv/config'

const endpoint = process.env.APPWRITE_ENDPOINT!.replace(/\/$/, '')
const fullEndpoint = endpoint.endsWith('/v1') ? endpoint : `${endpoint}/v1`

const client = new Client()
client
  .setEndpoint(fullEndpoint)
  .setProject(process.env.APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_API_KEY!)

const db = new Databases(client)
const DB = 'eleve_imports_db'

const permissions = [
  Permission.read(Role.any()),
  Permission.create(Role.users()),
  Permission.update(Role.users()),
  Permission.delete(Role.users()),
]

async function createAttr(
  collId: string,
  type: string,
  key: string,
  opts: any = {},
) {
  try {
    switch (type) {
      case 'string':
        await db.createStringAttribute(DB, collId, key, opts.size || 200, opts.required ?? false, opts.default ?? undefined, opts.array ?? false)
        break
      case 'integer':
        await db.createIntegerAttribute(DB, collId, key, opts.required ?? false, opts.min, opts.max, opts.default ?? undefined, opts.array ?? false)
        break
      case 'boolean':
        await db.createBooleanAttribute(DB, collId, key, opts.required ?? false, opts.default ?? undefined, opts.array ?? false)
        break
      case 'enum':
        await db.createEnumAttribute(DB, collId, key, opts.elements, opts.required ?? false, opts.default ?? undefined, opts.array ?? false)
        break
    }
    console.log(`  ✓ ${collId}.${key}`)
  } catch (e: any) {
    if (e.code === 409) {
      console.log(`  ○ ${collId}.${key} (já existe)`)
    } else {
      console.error(`  ✗ ${collId}.${key}: ${e.message}`)
    }
  }
}

async function main() {
  console.log('\n🏗️  Criando collections do admin...\n')

  // === homepage_products ===
  try {
    await db.createCollection(DB, 'homepage_products', 'homepage_products', permissions)
    console.log('✓ Collection homepage_products criada')
  } catch (e: any) {
    if (e.code === 409) console.log('○ Collection homepage_products já existe')
    else console.error('✗ homepage_products:', e.message)
  }

  console.log('\n  Atributos homepage_products:')
  await createAttr('homepage_products', 'string', 'name', { size: 200, required: true })
  await createAttr('homepage_products', 'enum', 'section', { elements: ['iphones', 'perfumes'], required: true })
  await createAttr('homepage_products', 'integer', 'order', { required: false, min: 0, max: 999 })
  await createAttr('homepage_products', 'string', 'image', { size: 500, required: true })
  await createAttr('homepage_products', 'string', 'badge', { size: 50 })
  await createAttr('homepage_products', 'string', 'badgeStyle', { size: 20 })
  await createAttr('homepage_products', 'string', 'subtitle', { size: 200, required: true })
  await createAttr('homepage_products', 'string', 'brand', { size: 100 })
  await createAttr('homepage_products', 'string', 'productType', { size: 50 })
  await createAttr('homepage_products', 'string', 'highlights', { size: 2000, required: true })
  await createAttr('homepage_products', 'string', 'differentials', { size: 3000 })
  await createAttr('homepage_products', 'string', 'description', { size: 1000 })
  await createAttr('homepage_products', 'string', 'stockLabel', { size: 50 })
  await createAttr('homepage_products', 'string', 'stockStyle', { size: 20 })
  await createAttr('homepage_products', 'string', 'waMessage', { size: 500, required: true })
  await createAttr('homepage_products', 'boolean', 'isActive', { required: false })

  // === testimonials ===
  try {
    await db.createCollection(DB, 'testimonials', 'testimonials', permissions)
    console.log('\n✓ Collection testimonials criada')
  } catch (e: any) {
    if (e.code === 409) console.log('\n○ Collection testimonials já existe')
    else console.error('\n✗ testimonials:', e.message)
  }

  console.log('\n  Atributos testimonials:')
  await createAttr('testimonials', 'string', 'name', { size: 100, required: true })
  await createAttr('testimonials', 'string', 'city', { size: 200, required: true })
  await createAttr('testimonials', 'string', 'avatarLetter', { size: 5, required: true })
  await createAttr('testimonials', 'string', 'avatarColor', { size: 20, required: true })
  await createAttr('testimonials', 'string', 'product', { size: 200, required: true })
  await createAttr('testimonials', 'integer', 'rating', { required: true, min: 1, max: 5 })
  await createAttr('testimonials', 'string', 'text', { size: 1000, required: true })
  await createAttr('testimonials', 'integer', 'order', { required: false, min: 0, max: 999 })
  await createAttr('testimonials', 'boolean', 'isActive', { required: false })

  console.log('\n✅ Setup do admin concluído!\n')
  console.log('Próximo passo: criar um usuário admin no console do Appwrite.')
  console.log('Acesse seu Appwrite → Auth → Create User')
  console.log('Email: admin@eleveimports.com')
  console.log('Senha: (escolha uma senha segura)\n')
}

main()
