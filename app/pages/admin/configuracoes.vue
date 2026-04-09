<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const { databases } = useAppwriteClient()
const DB = 'eleve_imports_db'
const COLLECTION = 'site_config'

const loading = ref(true)
const saving = ref(false)
const configs = ref<Record<string, { id: string; value: string }>>({})

const fields = [
  { key: 'whatsapp_number', label: 'Número WhatsApp (com DDI)', placeholder: '5565996881272', default: '5565996881272' },
  { key: 'business_name', label: 'Nome do negócio', placeholder: 'Eleve Imports', default: 'Eleve Imports' },
  { key: 'business_location', label: 'Localização', placeholder: 'Campo Novo do Parecis - MT', default: 'Av. Jatobá, 456 - Campo Novo do Parecis - MT' },
  { key: 'business_hours', label: 'Horário de atendimento', placeholder: 'Seg-Sáb, 8h-19h', default: 'Seg-Sáb, 8h-19h' },
  { key: 'instagram_handle', label: 'Instagram (sem @)', placeholder: 'eleveimports', default: 'eleveimports' },
  { key: 'site_announcement', label: 'Anúncio (banner topo)', placeholder: 'Texto do anúncio ou vazio' },
]

async function load() {
  loading.value = true
  try {
    const res = await databases.listDocuments(DB, COLLECTION)
    for (const doc of res.documents) {
      configs.value[doc.key] = { id: doc.$id, value: doc.value || '' }
    }
  } catch {}
  loading.value = false
}

async function save() {
  saving.value = true
  try {
    for (const field of fields) {
      const existing = configs.value[field.key]
      const value = existing?.value || ''
      if (existing?.id) {
        await databases.updateDocument(DB, COLLECTION, existing.id, { value })
      } else {
        await databases.createDocument(DB, COLLECTION, 'unique()', {
          key: field.key,
          value,
          type: 'string',
          description: field.label,
        })
      }
    }
    alert('Configurações salvas!')
  } catch (e: any) {
    alert('Erro: ' + e.message)
  }
  saving.value = false
}

function getValue(key: string) {
  return configs.value[key]?.value || ''
}

function setValue(key: string, value: string) {
  if (!configs.value[key]) {
    configs.value[key] = { id: '', value }
  } else {
    configs.value[key].value = value
  }
}

onMounted(load)
</script>

<template>
  <div>
    <h1 style="font-size:24px;font-weight:700;color:#111827;margin-bottom:4px;">Configurações</h1>
    <p style="font-size:14px;color:#6b7280;margin-bottom:24px;">Dados gerais do site e contato</p>

    <div v-if="loading" style="text-align:center;padding:60px;color:#6b7280;">Carregando...</div>

    <form v-else @submit.prevent="save" style="max-width:600px;">
      <div style="background:#fff;border-radius:12px;border:1px solid #e5e7eb;padding:24px;display:flex;flex-direction:column;gap:20px;">
        <div v-for="field in fields" :key="field.key">
          <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:6px;">
            {{ field.label }}
          </label>
          <input
            :value="getValue(field.key)"
            @input="setValue(field.key, ($event.target as HTMLInputElement).value)"
            style="width:100%;padding:10px 14px;border:1px solid #d1d5db;border-radius:8px;font-size:14px;box-sizing:border-box;color:#111827;background:#fff;"
            :placeholder="field.placeholder"
          />
        </div>
      </div>

      <div style="margin-top:20px;">
        <button
          type="submit"
          :disabled="saving"
          style="padding:12px 28px;background:#111827;color:#fff;border:none;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;"
          :style="saving ? 'opacity:0.6' : ''"
        >
          {{ saving ? 'Salvando...' : 'Salvar Configurações' }}
        </button>
      </div>
    </form>
  </div>
</template>
