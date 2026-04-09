<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const route = useRoute()
const router = useRouter()
const { databases } = useAppwriteClient()
const DB = 'eleve_imports_db'
const COLLECTION = 'homepage_products'

const isNew = computed(() => route.params.id === 'novo')
const loading = ref(false)
const saving = ref(false)

const form = ref({
  name: '',
  section: 'perfumes' as 'iphones' | 'perfumes',
  order: 0,
  image: '',
  badge: '',
  badgeStyle: '',
  subtitle: '',
  brand: '',
  productType: '',
  highlights: '',
  differentials: '',
  description: '',
  stockLabel: '',
  stockStyle: '',
  waMessage: '',
  isActive: true,
})

async function loadProduct() {
  if (isNew.value) return
  loading.value = true
  try {
    const doc = await databases.getDocument(DB, COLLECTION, route.params.id as string)
    form.value = {
      name: doc.name || '',
      section: doc.section || 'perfumes',
      order: doc.order || 0,
      image: doc.image || '',
      badge: doc.badge || '',
      badgeStyle: doc.badgeStyle || '',
      subtitle: doc.subtitle || '',
      brand: doc.brand || '',
      productType: doc.productType || '',
      highlights: doc.highlights || '',
      differentials: doc.differentials || '',
      description: doc.description || '',
      stockLabel: doc.stockLabel || '',
      stockStyle: doc.stockStyle || '',
      waMessage: doc.waMessage || '',
      isActive: doc.isActive ?? true,
    }
  } catch (e: any) {
    alert('Produto não encontrado')
    router.push('/admin/produtos')
  }
  loading.value = false
}

function generateWaMessage() {
  const type = form.value.section === 'iphones' ? '' : 'perfume '
  form.value.waMessage = `Olá! Tenho interesse no ${type}${form.value.name}. Pode me passar disponibilidade e valor?`
}

async function save() {
  saving.value = true
  const data: any = { ...form.value }
  // Clean empty optional strings
  if (!data.badge) data.badge = null
  if (!data.badgeStyle) data.badgeStyle = null
  if (!data.brand) data.brand = null
  if (!data.productType) data.productType = null
  if (!data.differentials) data.differentials = null
  if (!data.description) data.description = null
  if (!data.stockLabel) data.stockLabel = null
  if (!data.stockStyle) data.stockStyle = null

  try {
    if (isNew.value) {
      await databases.createDocument(DB, COLLECTION, 'unique()', data)
    } else {
      await databases.updateDocument(DB, COLLECTION, route.params.id as string, data)
    }
    router.push('/admin/produtos')
  } catch (e: any) {
    alert('Erro ao salvar: ' + e.message)
  }
  saving.value = false
}

onMounted(loadProduct)
</script>

<template>
  <div>
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px;">
      <NuxtLink to="/admin/produtos" style="color:#6b7280;text-decoration:none;">
        <Icon name="ph:arrow-left" style="width:20px;height:20px;" />
      </NuxtLink>
      <h1 style="font-size:24px;font-weight:700;color:#111827;">
        {{ isNew ? 'Novo Produto' : 'Editar Produto' }}
      </h1>
    </div>

    <div v-if="loading" style="text-align:center;padding:60px;color:#6b7280;">Carregando...</div>

    <form v-else @submit.prevent="save" style="max-width:700px;">
      <div style="background:#fff;border-radius:12px;border:1px solid #e5e7eb;padding:24px;display:flex;flex-direction:column;gap:20px;">

        <!-- Seção -->
        <div>
          <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:6px;">Seção *</label>
          <select v-model="form.section" style="width:100%;padding:10px 14px;border:1px solid #d1d5db;border-radius:8px;font-size:14px;box-sizing:border-box;color:#111827;background:#fff;">
            <option value="iphones">iPhones</option>
            <option value="perfumes">Perfumes</option>
          </select>
        </div>

        <!-- Nome -->
        <div>
          <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:6px;">Nome do Produto *</label>
          <input v-model="form.name" required style="width:100%;padding:10px 14px;border:1px solid #d1d5db;border-radius:8px;font-size:14px;box-sizing:border-box;color:#111827;background:#fff;" placeholder="Ex: Lattafa Yara Moi" @blur="generateWaMessage" />
        </div>

        <!-- Subtítulo -->
        <div>
          <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:6px;">Subtítulo *</label>
          <input v-model="form.subtitle" required style="width:100%;padding:10px 14px;border:1px solid #d1d5db;border-radius:8px;font-size:14px;box-sizing:border-box;color:#111827;background:#fff;" placeholder="Ex: 100ml · Emirados Árabes ou 256GB · Desert Titanium" />
        </div>

        <!-- Imagem URL -->
        <div>
          <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:6px;">URL da Imagem *</label>
          <input v-model="form.image" required type="url" style="width:100%;padding:10px 14px;border:1px solid #d1d5db;border-radius:8px;font-size:14px;box-sizing:border-box;color:#111827;background:#fff;" placeholder="https://..." />
          <img v-if="form.image" :src="form.image" style="margin-top:8px;width:80px;height:80px;object-fit:contain;border-radius:8px;background:#f3f4f6;" />
        </div>

        <!-- Marca e Tipo (perfumes) -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
          <div>
            <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:6px;">Marca</label>
            <input v-model="form.brand" style="width:100%;padding:10px 14px;border:1px solid #d1d5db;border-radius:8px;font-size:14px;box-sizing:border-box;color:#111827;background:#fff;" placeholder="Ex: Lattafa" />
          </div>
          <div>
            <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:6px;">Tipo</label>
            <input v-model="form.productType" style="width:100%;padding:10px 14px;border:1px solid #d1d5db;border-radius:8px;font-size:14px;box-sizing:border-box;color:#111827;background:#fff;" placeholder="Ex: Feminino, Unissex" />
          </div>
        </div>

        <!-- Badge e Estilo -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
          <div>
            <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:6px;">Badge</label>
            <input v-model="form.badge" style="width:100%;padding:10px 14px;border:1px solid #d1d5db;border-radius:8px;font-size:14px;box-sizing:border-box;color:#111827;background:#fff;" placeholder="Ex: Mais vendido, Novo" />
          </div>
          <div>
            <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:6px;">Estilo do Badge</label>
            <select v-model="form.badgeStyle" style="width:100%;padding:10px 14px;border:1px solid #d1d5db;border-radius:8px;font-size:14px;box-sizing:border-box;color:#111827;background:#fff;">
              <option value="">Nenhum</option>
              <option value="gold">Dourado</option>
              <option value="blue">Azul</option>
            </select>
          </div>
        </div>

        <!-- Stock (iphones) -->
        <div v-if="form.section === 'iphones'" style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
          <div>
            <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:6px;">Estoque (label)</label>
            <input v-model="form.stockLabel" style="width:100%;padding:10px 14px;border:1px solid #d1d5db;border-radius:8px;font-size:14px;box-sizing:border-box;color:#111827;background:#fff;" placeholder="Ex: Última unidade, Pronta entrega" />
          </div>
          <div>
            <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:6px;">Cor do estoque</label>
            <select v-model="form.stockStyle" style="width:100%;padding:10px 14px;border:1px solid #d1d5db;border-radius:8px;font-size:14px;box-sizing:border-box;color:#111827;background:#fff;">
              <option value="">Nenhum</option>
              <option value="green">Verde (disponível)</option>
              <option value="amber">Amarelo (poucas)</option>
              <option value="red">Vermelho (última)</option>
            </select>
          </div>
        </div>

        <!-- Descrição -->
        <div>
          <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:6px;">Descrição</label>
          <textarea v-model="form.description" rows="3" style="width:100%;padding:10px 14px;border:1px solid #d1d5db;border-radius:8px;font-size:14px;box-sizing:border-box;color:#111827;background:#fff;resize:vertical;" placeholder="Descrição curta do produto..." />
        </div>

        <!-- Highlights (chips/notas) -->
        <div>
          <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:6px;">
            {{ form.section === 'iphones' ? 'Specs (separar por vírgula)' : 'Notas olfativas (separar por vírgula)' }} *
          </label>
          <input v-model="form.highlights" required style="width:100%;padding:10px 14px;border:1px solid #d1d5db;border-radius:8px;font-size:14px;box-sizing:border-box;color:#111827;background:#fff;" :placeholder="form.section === 'iphones' ? 'Chip A18 Pro, Câmera 48MP, Tela 6.9, USB-C' : 'Mandarina, Jasmim, Musk, Baunilha'" />
          <p style="font-size:12px;color:#9ca3af;margin:4px 0 0;">Separe cada item por vírgula</p>
        </div>

        <!-- Diferenciais (iphones) -->
        <div v-if="form.section === 'iphones'">
          <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:6px;">Diferenciais (separar por vírgula)</label>
          <input v-model="form.differentials" style="width:100%;padding:10px 14px;border:1px solid #d1d5db;border-radius:8px;font-size:14px;box-sizing:border-box;color:#111827;background:#fff;" placeholder="Desbloqueado para qualquer operadora, Garantia Apple 12 meses" />
        </div>

        <!-- Mensagem WhatsApp -->
        <div>
          <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:6px;">Mensagem do WhatsApp *</label>
          <input v-model="form.waMessage" required style="width:100%;padding:10px 14px;border:1px solid #d1d5db;border-radius:8px;font-size:14px;box-sizing:border-box;color:#111827;background:#fff;" />
          <p style="font-size:12px;color:#9ca3af;margin:4px 0 0;">Gerada automaticamente ao preencher o nome</p>
        </div>

        <!-- Ordem e Ativo -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
          <div>
            <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:6px;">Ordem</label>
            <input v-model.number="form.order" type="number" style="width:100%;padding:10px 14px;border:1px solid #d1d5db;border-radius:8px;font-size:14px;box-sizing:border-box;color:#111827;background:#fff;" />
          </div>
          <div>
            <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:6px;">Status</label>
            <label style="display:flex;align-items:center;gap:8px;padding:10px 0;cursor:pointer;">
              <input v-model="form.isActive" type="checkbox" style="width:18px;height:18px;" />
              <span style="font-size:14px;color:#374151;">Produto ativo</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div style="display:flex;gap:12px;margin-top:20px;">
        <button
          type="submit"
          :disabled="saving"
          style="padding:12px 28px;background:#111827;color:#fff;border:none;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;"
          :style="saving ? 'opacity:0.6;cursor:not-allowed' : ''"
        >
          {{ saving ? 'Salvando...' : 'Salvar Produto' }}
        </button>
        <NuxtLink to="/admin/produtos" style="padding:12px 28px;background:#f3f4f6;color:#374151;border-radius:8px;font-size:14px;font-weight:500;text-decoration:none;">
          Cancelar
        </NuxtLink>
      </div>
    </form>
  </div>
</template>
