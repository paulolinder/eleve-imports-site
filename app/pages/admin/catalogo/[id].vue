<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const route = useRoute()
const router = useRouter()
const { databases } = useAppwriteClient()
const DB = 'eleve_imports_db'
const COL = 'products'

const loading = ref(true)
const saving = ref(false)
const product = ref<any>(null)

const thumbUrl = ref('')
const extraUrls = ref<string[]>([])
const newExtra = ref('')

async function load() {
  loading.value = true
  try {
    const doc = await databases.getDocument(DB, COL, route.params.id as string)
    product.value = doc
    thumbUrl.value = doc.thumbnailUrl || ''
    extraUrls.value = (doc.images || []).filter((u: string) => u !== doc.thumbnailUrl)
  } catch {
    alert('Produto não encontrado')
    router.push('/admin/catalogo')
  }
  loading.value = false
}

function addExtra() {
  const url = newExtra.value.trim()
  if (!url) return
  extraUrls.value.push(url)
  newExtra.value = ''
}

function removeExtra(i: number) {
  extraUrls.value.splice(i, 1)
}

async function save() {
  if (!thumbUrl.value.trim()) {
    alert('Cole a URL da foto principal antes de salvar.')
    return
  }
  saving.value = true
  try {
    const images = [thumbUrl.value, ...extraUrls.value].filter(Boolean)
    await databases.updateDocument(DB, COL, route.params.id as string, {
      thumbnailUrl: thumbUrl.value.trim(),
      images,
    })
    router.push('/admin/catalogo')
  } catch (e: any) {
    alert('Erro ao salvar: ' + e.message)
  }
  saving.value = false
}

onMounted(load)
</script>

<template>
  <div>
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px;">
      <NuxtLink to="/admin/catalogo" style="color:#6b7280;text-decoration:none;display:flex;align-items:center;">
        <Icon name="ph:arrow-left" style="width:20px;height:20px;" />
      </NuxtLink>
      <h1 style="font-size:22px;font-weight:700;color:#111827;">Editar fotos do produto</h1>
    </div>

    <div v-if="loading" style="text-align:center;padding:60px;color:#6b7280;">Carregando...</div>

    <div v-else-if="product" style="max-width:680px;">

      <!-- Info do produto -->
      <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:16px 20px;margin-bottom:24px;display:flex;align-items:center;gap:16px;">
        <img
          v-if="thumbUrl"
          :src="thumbUrl"
          :alt="product.name"
          style="width:60px;height:75px;object-fit:cover;border-radius:8px;border:1px solid #e5e7eb;flex-shrink:0;"
        />
        <div
          v-else
          style="width:60px;height:75px;border-radius:8px;background:#e5e7eb;display:flex;align-items:center;justify-content:center;flex-shrink:0;"
        >
          <Icon name="ph:image" style="width:24px;height:24px;color:#9ca3af;" />
        </div>
        <div>
          <p style="font-weight:600;color:#111827;margin:0 0 4px;font-size:16px;">{{ product.name }}</p>
          <p style="font-size:13px;color:#6b7280;margin:0;">{{ product.brand }} · {{ product.categoryName }}</p>
        </div>
      </div>

      <!-- Foto principal -->
      <div style="background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:24px;margin-bottom:16px;">
        <label style="display:block;font-size:14px;font-weight:600;color:#111827;margin-bottom:6px;">
          Foto principal (thumbnail)
        </label>
        <p style="font-size:12px;color:#9ca3af;margin:0 0 12px;">
          Cole a URL da imagem do produto. Funciona com links do Google Imagens, site da marca, Amazon, etc.
        </p>
        <input
          v-model="thumbUrl"
          type="url"
          placeholder="https://..."
          style="width:100%;padding:10px 14px;border:1px solid #d1d5db;border-radius:8px;font-size:14px;color:#111827;background:#fff;box-sizing:border-box;"
        />

        <!-- Preview -->
        <div v-if="thumbUrl" style="margin-top:12px;">
          <p style="font-size:12px;color:#6b7280;margin:0 0 8px;">Preview:</p>
          <img
            :src="thumbUrl"
            :alt="product.name"
            style="width:120px;height:150px;object-fit:cover;border-radius:8px;border:1px solid #e5e7eb;background:#f3f4f6;"
            @error="(e: any) => e.target.style.display='none'"
          />
        </div>
      </div>

      <!-- Fotos extras (galeria) -->
      <div style="background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:24px;margin-bottom:24px;">
        <label style="display:block;font-size:14px;font-weight:600;color:#111827;margin-bottom:6px;">
          Fotos extras (galeria — opcional)
        </label>
        <p style="font-size:12px;color:#9ca3af;margin:0 0 12px;">
          Aparecem como miniaturas na página do produto.
        </p>

        <div v-if="extraUrls.length" style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px;">
          <div
            v-for="(url, i) in extraUrls"
            :key="i"
            style="position:relative;"
          >
            <img
              :src="url"
              style="width:64px;height:80px;object-fit:cover;border-radius:6px;border:1px solid #e5e7eb;background:#f3f4f6;"
              @error="(e: any) => e.target.style.display='none'"
            />
            <button
              style="position:absolute;top:-6px;right:-6px;width:18px;height:18px;border-radius:50%;background:#dc2626;color:#fff;border:none;cursor:pointer;font-size:10px;display:flex;align-items:center;justify-content:center;line-height:1;"
              @click="removeExtra(i)"
            >×</button>
          </div>
        </div>

        <div style="display:flex;gap:8px;">
          <input
            v-model="newExtra"
            type="url"
            placeholder="https://..."
            style="flex:1;padding:10px 14px;border:1px solid #d1d5db;border-radius:8px;font-size:14px;color:#111827;background:#fff;"
            @keydown.enter.prevent="addExtra"
          />
          <button
            style="padding:10px 16px;background:#f3f4f6;border:1px solid #e5e7eb;border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;color:#374151;white-space:nowrap;"
            @click="addExtra"
          >
            + Adicionar
          </button>
        </div>
      </div>

      <!-- Como encontrar fotos -->
      <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:16px 20px;margin-bottom:24px;">
        <p style="font-size:13px;font-weight:600;color:#92400e;margin:0 0 8px;">💡 Como encontrar a foto certa</p>
        <ol style="font-size:13px;color:#78350f;margin:0;padding-left:20px;line-height:1.8;">
          <li>Pesquise "<strong>{{ product.name }}</strong>" no Google Imagens</li>
          <li>Clique na imagem que quiser</li>
          <li>Clique com botão direito → <strong>Copiar endereço da imagem</strong></li>
          <li>Cole no campo acima</li>
        </ol>
      </div>

      <!-- Botões -->
      <div style="display:flex;gap:12px;">
        <button
          :disabled="saving"
          style="padding:12px 28px;background:#111827;color:#fff;border:none;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;"
          :style="saving ? 'opacity:0.6;cursor:not-allowed' : ''"
          @click="save"
        >
          {{ saving ? 'Salvando...' : 'Salvar fotos' }}
        </button>
        <NuxtLink
          to="/admin/catalogo"
          style="padding:12px 24px;background:#f3f4f6;color:#374151;border-radius:8px;font-size:14px;font-weight:500;text-decoration:none;"
        >
          Cancelar
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
