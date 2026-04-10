<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const { databases } = useAppwriteClient()
const DB = 'eleve_imports_db'
const COL = 'products'

const products = ref<any[]>([])
const loading = ref(true)
const search = ref('')

async function loadProducts() {
  loading.value = true
  try {
    const { Query } = await import('appwrite')
    const res = await databases.listDocuments(DB, COL, [
      Query.limit(100),
      Query.orderDesc('$createdAt'),
    ])
    products.value = res.documents
  } catch (e: any) {
    alert('Erro ao carregar: ' + e.message)
    products.value = []
  }
  loading.value = false
}

const filtered = computed(() => {
  if (!search.value) return products.value
  const q = search.value.toLowerCase()
  return products.value.filter(p =>
    p.name?.toLowerCase().includes(q) || p.brand?.toLowerCase().includes(q),
  )
})

onMounted(loadProducts)
</script>

<template>
  <div>
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px;">
      <div>
        <h1 style="font-size:24px;font-weight:700;color:#111827;margin-bottom:4px;">Catálogo de Produtos</h1>
        <p style="font-size:14px;color:#6b7280;">Edite fotos e informações dos produtos do catálogo</p>
      </div>
      <div style="display:flex;align-items:center;gap:10px;background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:8px 14px;">
        <Icon name="ph:magnifying-glass" style="width:16px;height:16px;color:#9ca3af;" />
        <input
          v-model="search"
          type="search"
          placeholder="Buscar produto..."
          style="border:none;outline:none;font-size:14px;color:#111827;background:transparent;width:200px;"
        />
      </div>
    </div>

    <div v-if="loading" style="text-align:center;padding:60px;color:#6b7280;">Carregando...</div>

    <div v-else-if="filtered.length === 0" style="text-align:center;padding:60px;color:#6b7280;">
      <Icon name="ph:package" style="width:48px;height:48px;color:#d1d5db;margin-bottom:12px;" />
      <p>Nenhum produto encontrado.</p>
    </div>

    <div v-else style="background:#fff;border-radius:12px;border:1px solid #e5e7eb;overflow:hidden;">
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <thead>
          <tr style="background:#f9fafb;border-bottom:1px solid #e5e7eb;">
            <th style="text-align:left;padding:12px 16px;font-weight:600;color:#374151;">Produto</th>
            <th style="text-align:left;padding:12px 16px;font-weight:600;color:#374151;display:none;" class="md-show">Categoria</th>
            <th style="text-align:left;padding:12px 16px;font-weight:600;color:#374151;">Foto</th>
            <th style="text-align:right;padding:12px 16px;font-weight:600;color:#374151;">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="p in filtered"
            :key="p.$id"
            style="border-bottom:1px solid #f3f4f6;"
          >
            <td style="padding:12px 16px;">
              <p style="font-weight:500;color:#111827;margin:0 0 2px;">{{ p.name }}</p>
              <p style="font-size:12px;color:#9ca3af;margin:0;">{{ p.brand }}</p>
            </td>
            <td style="padding:12px 16px;">
              <span
                style="padding:3px 10px;border-radius:20px;font-size:12px;font-weight:500;"
                :style="p.categorySlug === 'iphones'
                  ? 'background:#eff6ff;color:#1d4ed8;'
                  : 'background:#fdf4ff;color:#7e22ce;'"
              >
                {{ p.categoryName }}
              </span>
            </td>
            <td style="padding:12px 16px;">
              <div style="display:flex;align-items:center;gap:10px;">
                <img
                  v-if="p.thumbnailUrl"
                  :src="p.thumbnailUrl"
                  :alt="p.name"
                  style="width:48px;height:60px;object-fit:cover;border-radius:6px;background:#f3f4f6;border:1px solid #e5e7eb;"
                />
                <div
                  v-else
                  style="width:48px;height:60px;border-radius:6px;background:#f3f4f6;border:1px solid #e5e7eb;display:flex;align-items:center;justify-content:center;"
                >
                  <Icon name="ph:image" style="width:20px;height:20px;color:#d1d5db;" />
                </div>
                <span
                  style="font-size:11px;padding:2px 8px;border-radius:4px;"
                  :style="p.thumbnailUrl ? 'background:#f0fdf4;color:#166534;' : 'background:#fef2f2;color:#991b1b;'"
                >
                  {{ p.thumbnailUrl ? 'OK' : 'Sem foto' }}
                </span>
              </div>
            </td>
            <td style="padding:12px 16px;text-align:right;">
              <NuxtLink
                :to="`/admin/catalogo/${p.$id}`"
                style="padding:6px 14px;background:#111827;color:#fff;border-radius:6px;font-size:13px;font-weight:500;text-decoration:none;"
              >
                Editar foto
              </NuxtLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
