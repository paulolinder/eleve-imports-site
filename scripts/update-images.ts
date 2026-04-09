/**
 * Atualiza thumbnails dos produtos com imagens placeholder adequadas.
 * Executar: npx tsx scripts/update-images.ts
 */
import { Client, Databases, Query } from 'node-appwrite'
import 'dotenv/config'

const endpoint = process.env.APPWRITE_ENDPOINT!.replace(/\/$/, '')
const fullEndpoint = endpoint.endsWith('/v1') ? endpoint : `${endpoint}/v1`

const client = new Client()
client.setEndpoint(fullEndpoint).setProject(process.env.APPWRITE_PROJECT_ID!).setKey(process.env.APPWRITE_API_KEY!)

const db = new Databases(client)
const DB = 'eleve_imports_db'

const imageMap: Record<string, { thumbnailUrl: string; images: string[] }> = {
  'iphone-16-pro-max-256gb': {
    thumbnailUrl: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=600&h=750&fit=crop&q=85',
    images: [
      'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=800&h=1000&fit=crop&q=85',
      'https://images.unsplash.com/photo-1632633173522-47456de71b76?w=800&h=1000&fit=crop&q=85',
    ],
  },
  'iphone-16-128gb': {
    thumbnailUrl: 'https://images.unsplash.com/photo-1632633173522-47456de71b76?w=600&h=750&fit=crop&q=85',
    images: [
      'https://images.unsplash.com/photo-1632633173522-47456de71b76?w=800&h=1000&fit=crop&q=85',
    ],
  },
  'iphone-15-pro-256gb': {
    thumbnailUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=750&fit=crop&q=85',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=1000&fit=crop&q=85',
    ],
  },
  'oud-royal-100ml': {
    thumbnailUrl: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=600&h=750&fit=crop&q=85',
    images: [
      'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800&h=1000&fit=crop&q=85',
    ],
  },
  'mukhallat-gold-50ml': {
    thumbnailUrl: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=750&fit=crop&q=85',
    images: [
      'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&h=1000&fit=crop&q=85',
    ],
  },
  'amber-oud-black-100ml': {
    thumbnailUrl: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=600&h=750&fit=crop&q=85',
    images: [
      'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800&h=1000&fit=crop&q=85',
    ],
  },
}

async function main() {
  console.log('\n🖼️  Atualizando imagens dos produtos...\n')

  for (const [slug, data] of Object.entries(imageMap)) {
    try {
      const res = await db.listDocuments(DB, 'products', [Query.equal('slug', slug), Query.limit(1)])
      if (res.documents.length === 0) {
        console.log(`  ✗ ${slug} — não encontrado`)
        continue
      }
      await db.updateDocument(DB, 'products', res.documents[0].$id, {
        thumbnailUrl: data.thumbnailUrl,
        images: data.images,
      })
      console.log(`  ✓ ${slug}`)
    } catch (e: any) {
      console.error(`  ✗ ${slug} — ${e.message}`)
    }
  }

  console.log('\n✅ Imagens atualizadas!\n')
}

main()
