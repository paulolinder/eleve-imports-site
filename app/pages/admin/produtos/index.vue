<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const { databases } = useAppwriteClient()
const DB = 'eleve_imports_db'
const COLLECTION = 'homepage_products'

const products = ref<any[]>([])
const loading = ref(true)

async function loadProducts() {
  loading.value = true
  try {
    const res = await databases.listDocuments(DB, COLLECTION)
    products.value = res.documents.sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))
  } catch {
    products.value = []
  }
  loading.value = false
}

async function deleteProduct(id: string, name: string) {
  if (!confirm(`Excluir "${name}"?`)) return
  try {
    await databases.deleteDocument(DB, COLLECTION, id)
    await loadProducts()
  } catch (e: any) {
    alert('Erro ao excluir: ' + e.message)
  }
}

async function toggleActive(doc: any) {
  try {
    await databases.updateDocument(DB, COLLECTION, doc.$id, { isActive: !doc.isActive })
    await loadProducts()
  } catch (e: any) {
    alert('Erro: ' + e.message)
  }
}

onMounted(loadProducts)
</script>

<template>
  <div>
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;">
      <div>
        <h1 style="font-size:24px;font-weight:700;color:#111827;margin-bottom:4px;">Produtos da Homepage</h1>
        <p style="font-size:14px;color:#6b7280;">iPhones e perfumes exibidos na landing page</p>
      </div>
      <NuxtLink
        to="/admin/produtos/novo"
        style="display:flex;align-items:center;gap:8px;padding:10px 20px;background:#111827;color:#fff;border-radius:8px;font-size:14px;font-weight:600;text-decoration:none;"
      >
        <Icon name="ph:plus" style="width:16px;height:16px;" />
        Novo Produto
      </NuxtLink>
    </div>

    <div v-if="loading" style="text-align:center;padding:60px;color:#6b7280;">Carregando...</div>

    <div v-else-if="products.length === 0" style="text-align:center;padding:60px;color:#6b7280;">
      <Icon name="ph:package" style="width:48px;height:48px;color:#d1d5db;margin-bottom:12px;" />
      <p>Nenhum produto cadastrado ainda.</p>
      <NuxtLink to="/admin/produtos/novo" style="color:#b8860b;text-decoration:underline;font-size:14px;">Adicionar primeiro produto</NuxtLink>
    </div>

    <div v-else style="background:#fff;border-radius:12px;border:1px solid #e5e7eb;overflow:hidden;">
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <thead>
          <tr style="background:#f9fafb;border-bottom:1px solid #e5e7eb;">
            <th style="text-align:left;padding:12px 16px;font-weight:600;color:#374151;">Produto</th>
            <th style="text-align:left;padding:12px 16px;font-weight:600;color:#374151;">Seção</th>
            <th style="text-align:left;padding:12px 16px;font-weight:600;color:#374151;">Badge</th>
            <th style="text-align:center;padding:12px 16px;font-weight:600;color:#374151;">Ativo</th>
            <th style="text-align:right;padding:12px 16px;font-weight:600;color:#374151;">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="p in products"
            :key="p.$id"
            style="border-bottom:1px solid #f3f4f6;"
          >
            <td style="padding:12px 16px;">
              <div style="display:flex;align-items:center;gap:12px;">
                <img
                  :src="p.image"
                  :alt="p.name"
                  style="width:40px;height:40px;border-radius:8px;object-fit:cover;background:#f3f4f6;"
                />
                <div>
                  <p style="font-weight:500;color:#111827;margin:0;">{{ p.name }}</p>
                  <p style="font-size:12px;color:#9ca3af;margin:0;">{{ p.subtitle }}</p>
                </div>
              </div>
            </td>
            <td style="padding:12px 16px;">
              <span
                style="padding:4px 10px;border-radius:20px;font-size:12px;font-weight:500;"
                :style="p.section === 'iphones'
                  ? 'background:#eff6ff;color:#1d4ed8;'
                  : 'background:#fdf2f8;color:#be185d;'"
              >
                {{ p.section === 'iphones' ? 'iPhones' : 'Perfumes' }}
              </span>
            </td>
            <td style="padding:12px 16px;font-size:13px;color:#6b7280;">
              {{ p.badge || '—' }}
            </td>
            <td style="padding:12px 16px;text-align:center;">
              <button
                style="background:none;border:none;cursor:pointer;font-size:20px;"
                @click="toggleActive(p)"
              >
                {{ p.isActive ? '✅' : '⛔' }}
              </button>
            </td>
            <td style="padding:12px 16px;text-align:right;">
              <div style="display:flex;gap:8px;justify-content:flex-end;">
                <NuxtLink
                  :to="`/admin/produtos/${p.$id}`"
                  style="padding:6px 12px;background:#f3f4f6;border-radius:6px;font-size:13px;color:#374151;text-decoration:none;"
                >
                  Editar
                </NuxtLink>
                <button
                  style="padding:6px 12px;background:#fef2f2;border-radius:6px;font-size:13px;color:#dc2626;border:none;cursor:pointer;"
                  @click="deleteProduct(p.$id, p.name)"
                >
                  Excluir
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
