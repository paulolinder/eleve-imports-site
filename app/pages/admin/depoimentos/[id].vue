<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const route = useRoute()
const router = useRouter()
const { databases } = useAppwriteClient()
const DB = 'eleve_imports_db'
const COLLECTION = 'testimonials'

const isNew = computed(() => route.params.id === 'novo')
const loading = ref(false)
const saving = ref(false)

const form = ref({
  name: '',
  city: '',
  avatarLetter: '',
  avatarColor: '#1d4ed8',
  product: '',
  rating: 5,
  text: '',
  order: 0,
  isActive: true,
})

const colorOptions = ['#1d4ed8', '#7c3aed', '#059669', '#dc2626', '#d97706', '#0891b2']

async function loadItem() {
  if (isNew.value) return
  loading.value = true
  try {
    const doc = await databases.getDocument(DB, COLLECTION, route.params.id as string)
    form.value = {
      name: doc.name || '',
      city: doc.city || '',
      avatarLetter: doc.avatarLetter || '',
      avatarColor: doc.avatarColor || '#1d4ed8',
      product: doc.product || '',
      rating: doc.rating || 5,
      text: doc.text || '',
      order: doc.order || 0,
      isActive: doc.isActive ?? true,
    }
  } catch {
    alert('Depoimento não encontrado')
    router.push('/admin/depoimentos')
  }
  loading.value = false
}

watch(() => form.value.name, (name) => {
  if (name && !form.value.avatarLetter) {
    form.value.avatarLetter = name.charAt(0).toUpperCase()
  }
})

async function save() {
  saving.value = true
  try {
    if (isNew.value) {
      await databases.createDocument(DB, COLLECTION, 'unique()', form.value)
    } else {
      await databases.updateDocument(DB, COLLECTION, route.params.id as string, form.value)
    }
    router.push('/admin/depoimentos')
  } catch (e: any) {
    alert('Erro ao salvar: ' + e.message)
  }
  saving.value = false
}

onMounted(loadItem)
</script>

<template>
  <div>
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px;">
      <NuxtLink to="/admin/depoimentos" style="color:#6b7280;text-decoration:none;">
        <Icon name="ph:arrow-left" style="width:20px;height:20px;" />
      </NuxtLink>
      <h1 style="font-size:24px;font-weight:700;color:#111827;">
        {{ isNew ? 'Novo Depoimento' : 'Editar Depoimento' }}
      </h1>
    </div>

    <form v-if="!loading" @submit.prevent="save" style="max-width:600px;">
      <div style="background:#fff;border-radius:12px;border:1px solid #e5e7eb;padding:24px;display:flex;flex-direction:column;gap:20px;">

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
          <div>
            <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:6px;">Nome *</label>
            <input v-model="form.name" required style="width:100%;padding:10px 14px;border:1px solid #d1d5db;border-radius:8px;font-size:14px;box-sizing:border-box;color:#111827;background:#fff;" placeholder="Carlos M." />
          </div>
          <div>
            <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:6px;">Cidade *</label>
            <input v-model="form.city" required style="width:100%;padding:10px 14px;border:1px solid #d1d5db;border-radius:8px;font-size:14px;box-sizing:border-box;color:#111827;background:#fff;" placeholder="Campo Novo do Parecis - MT" />
          </div>
        </div>

        <div style="display:grid;grid-template-columns:80px 1fr;gap:16px;">
          <div>
            <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:6px;">Letra</label>
            <input v-model="form.avatarLetter" maxlength="2" style="width:100%;padding:10px 14px;border:1px solid #d1d5db;border-radius:8px;font-size:14px;box-sizing:border-box;color:#111827;background:#fff;text-align:center;" />
          </div>
          <div>
            <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:6px;">Cor do avatar</label>
            <div style="display:flex;gap:8px;padding:8px 0;">
              <button
                v-for="c in colorOptions"
                :key="c"
                type="button"
                style="width:32px;height:32px;border-radius:50%;border:3px solid transparent;cursor:pointer;"
                :style="`background:${c};${form.avatarColor === c ? 'border-color:#111827;' : ''}`"
                @click="form.avatarColor = c"
              />
            </div>
          </div>
        </div>

        <div>
          <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:6px;">Produto comprado *</label>
          <input v-model="form.product" required style="width:100%;padding:10px 14px;border:1px solid #d1d5db;border-radius:8px;font-size:14px;box-sizing:border-box;color:#111827;background:#fff;" placeholder="Ex: iPhone 16 Pro Max" />
        </div>

        <div>
          <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:6px;">Avaliação</label>
          <div style="display:flex;gap:4px;">
            <button
              v-for="i in 5"
              :key="i"
              type="button"
              style="background:none;border:none;cursor:pointer;font-size:24px;padding:0;"
              @click="form.rating = i"
            >
              {{ i <= form.rating ? '★' : '☆' }}
            </button>
          </div>
        </div>

        <div>
          <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:6px;">Depoimento *</label>
          <textarea v-model="form.text" required rows="4" style="width:100%;padding:10px 14px;border:1px solid #d1d5db;border-radius:8px;font-size:14px;box-sizing:border-box;color:#111827;background:#fff;resize:vertical;" placeholder="O que o cliente disse..." />
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
          <div>
            <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:6px;">Ordem</label>
            <input v-model.number="form.order" type="number" style="width:100%;padding:10px 14px;border:1px solid #d1d5db;border-radius:8px;font-size:14px;box-sizing:border-box;color:#111827;background:#fff;" />
          </div>
          <div>
            <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:6px;">Status</label>
            <label style="display:flex;align-items:center;gap:8px;padding:10px 0;cursor:pointer;">
              <input v-model="form.isActive" type="checkbox" style="width:18px;height:18px;" />
              <span style="font-size:14px;color:#374151;">Ativo</span>
            </label>
          </div>
        </div>
      </div>

      <div style="display:flex;gap:12px;margin-top:20px;">
        <button
          type="submit"
          :disabled="saving"
          style="padding:12px 28px;background:#111827;color:#fff;border:none;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;"
          :style="saving ? 'opacity:0.6' : ''"
        >
          {{ saving ? 'Salvando...' : 'Salvar' }}
        </button>
        <NuxtLink to="/admin/depoimentos" style="padding:12px 28px;background:#f3f4f6;color:#374151;border-radius:8px;font-size:14px;font-weight:500;text-decoration:none;">
          Cancelar
        </NuxtLink>
      </div>
    </form>
  </div>
</template>
