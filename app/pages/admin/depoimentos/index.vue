<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const { databases } = useAppwriteClient()
const DB = 'eleve_imports_db'
const COLLECTION = 'testimonials'

const items = ref<any[]>([])
const loading = ref(true)

async function load() {
  loading.value = true
  try {
    const res = await databases.listDocuments(DB, COLLECTION)
    items.value = res.documents.sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))
  } catch {
    items.value = []
  }
  loading.value = false
}

async function deleteItem(id: string, name: string) {
  if (!confirm(`Excluir depoimento de "${name}"?`)) return
  try {
    await databases.deleteDocument(DB, COLLECTION, id)
    await load()
  } catch (e: any) {
    alert('Erro ao excluir: ' + e.message)
  }
}

onMounted(load)
</script>

<template>
  <div>
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;">
      <div>
        <h1 style="font-size:24px;font-weight:700;color:#111827;margin-bottom:4px;">Depoimentos</h1>
        <p style="font-size:14px;color:#6b7280;">Avaliações exibidas na landing page</p>
      </div>
      <NuxtLink
        to="/admin/depoimentos/novo"
        style="display:flex;align-items:center;gap:8px;padding:10px 20px;background:#111827;color:#fff;border-radius:8px;font-size:14px;font-weight:600;text-decoration:none;"
      >
        <Icon name="ph:plus" style="width:16px;height:16px;" />
        Novo Depoimento
      </NuxtLink>
    </div>

    <div v-if="loading" style="text-align:center;padding:60px;color:#6b7280;">Carregando...</div>

    <div v-else-if="items.length === 0" style="text-align:center;padding:60px;color:#6b7280;">
      <p>Nenhum depoimento cadastrado.</p>
    </div>

    <div v-else style="display:grid;gap:12px;">
      <div
        v-for="t in items"
        :key="t.$id"
        style="background:#fff;border-radius:12px;border:1px solid #e5e7eb;padding:20px;display:flex;align-items:flex-start;gap:16px;"
      >
        <!-- Avatar -->
        <div
          style="width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;color:#fff;font-size:16px;flex-shrink:0;"
          :style="`background:${t.avatarColor || '#6b7280'}`"
        >
          {{ t.avatarLetter || t.name?.charAt(0) }}
        </div>

        <!-- Content -->
        <div style="flex:1;min-width:0;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
            <span style="font-weight:600;color:#111827;font-size:14px;">{{ t.name }}</span>
            <span style="font-size:12px;color:#9ca3af;">{{ t.city }}</span>
            <span v-if="!t.isActive" style="font-size:11px;color:#dc2626;font-weight:500;">Inativo</span>
          </div>
          <p style="font-size:13px;color:#6b7280;margin:0 0 6px;line-height:1.5;">
            "{{ t.text?.substring(0, 150) }}{{ t.text?.length > 150 ? '...' : '' }}"
          </p>
          <span style="font-size:12px;color:#9ca3af;">Produto: {{ t.product }}</span>
        </div>

        <!-- Actions -->
        <div style="display:flex;gap:8px;flex-shrink:0;">
          <NuxtLink
            :to="`/admin/depoimentos/${t.$id}`"
            style="padding:6px 12px;background:#f3f4f6;border-radius:6px;font-size:13px;color:#374151;text-decoration:none;"
          >
            Editar
          </NuxtLink>
          <button
            style="padding:6px 12px;background:#fef2f2;border-radius:6px;font-size:13px;color:#dc2626;border:none;cursor:pointer;"
            @click="deleteItem(t.$id, t.name)"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
