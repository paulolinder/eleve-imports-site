<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const { databases } = useAppwriteClient()
const DB = 'eleve_imports_db'
const COLLECTION = 'site_config'

const loading = ref(true)
const saving = ref(false)
const configs = ref<Record<string, { id: string; value: string }>>({})

const sections = [
  {
    title: 'Meta Tags — Página Inicial',
    description: 'Tags que aparecem nos resultados do Google e ao compartilhar no WhatsApp/redes sociais.',
    fields: [
      { key: 'seo_title', label: 'Título (Title Tag)', placeholder: 'Eleve Imports — iPhones e Perfumes Árabes em Campo Novo do Parecis', help: 'Máx. 60 caracteres. Aparece na aba do navegador e nos resultados do Google.', default: 'Eleve Imports — iPhones e Perfumes Árabes em Campo Novo do Parecis' },
      { key: 'seo_description', label: 'Descrição (Meta Description)', placeholder: 'iPhones originais desbloqueados e perfumes árabes exclusivos em Campo Novo do Parecis - MT...', help: 'Máx. 155 caracteres. Texto que aparece abaixo do título no Google.', type: 'textarea', default: 'iPhones originais desbloqueados e perfumes árabes exclusivos em Campo Novo do Parecis - MT. Lattafa, Armaf, Carolina Herrera. Consulte pelo WhatsApp.' },
      { key: 'seo_keywords', label: 'Palavras-chave (para referência)', placeholder: 'iphone campo novo do parecis, perfumes árabes MT, lattafa yara, importados mato grosso', help: 'Google não usa mais, mas ajuda a manter foco no conteúdo.', type: 'textarea', default: 'iphone campo novo do parecis, perfumes árabes MT, lattafa yara, importados mato grosso, perfumes importados, iphone original' },
    ],
  },
  {
    title: 'Open Graph — Compartilhamento Social',
    description: 'Como o site aparece ao ser compartilhado no WhatsApp, Instagram, Facebook.',
    fields: [
      { key: 'og_title', label: 'Título OG', placeholder: 'Eleve Imports — Importados Premium em Campo Novo do Parecis', help: 'Título ao compartilhar link. Máx. 70 caracteres.', default: 'Eleve Imports — Importados Premium em Campo Novo do Parecis' },
      { key: 'og_description', label: 'Descrição OG', placeholder: 'iPhones originais e perfumes árabes exclusivos...', help: 'Descrição ao compartilhar link.', default: 'iPhones originais e perfumes árabes exclusivos. Entrega em Campo Novo do Parecis - MT.' },
      { key: 'og_image', label: 'URL da Imagem OG', placeholder: 'https://eleveimports.com/logo-dark.png', help: 'Imagem que aparece ao compartilhar. Ideal: 1200x630px.', default: 'https://eleveimports.com/logo-dark.png' },
    ],
  },
  {
    title: 'Dados Estruturados — Google (Schema.org)',
    description: 'Informações que ajudam o Google a entender seu negócio e mostrar rich results.',
    fields: [
      { key: 'schema_name', label: 'Nome do Negócio', placeholder: 'Eleve Imports', default: 'Eleve Imports' },
      { key: 'schema_description', label: 'Descrição do Negócio', placeholder: 'Importados premium em Campo Novo do Parecis...', type: 'textarea', default: 'Importados premium em Campo Novo do Parecis: iPhones originais desbloqueados e perfumes árabes exclusivos.' },
      { key: 'schema_telephone', label: 'Telefone (com DDI)', placeholder: '+5565996881272', default: '+5565996881272' },
      { key: 'schema_url', label: 'URL do Site', placeholder: 'https://eleveimports.com', default: 'https://eleveimports.com' },
      { key: 'schema_logo', label: 'URL do Logo', placeholder: 'https://eleveimports.com/logo-dark.png', default: 'https://eleveimports.com/logo-dark.png' },
      { key: 'schema_price_range', label: 'Faixa de Preço', placeholder: '$$', help: 'Use $ a $$$$', default: '$$' },
    ],
  },
  {
    title: 'Endereço — SEO Local',
    description: 'Dados de localização usados pelo Google Maps e busca local.',
    fields: [
      { key: 'schema_street', label: 'Endereço', placeholder: 'Avenida Jatobá, 456', default: 'Avenida Jatobá, 456' },
      { key: 'schema_city', label: 'Cidade', placeholder: 'Campo Novo do Parecis', default: 'Campo Novo do Parecis' },
      { key: 'schema_state', label: 'Estado (sigla)', placeholder: 'MT', default: 'MT' },
      { key: 'schema_country', label: 'País (sigla)', placeholder: 'BR', default: 'BR' },
      { key: 'schema_latitude', label: 'Latitude', placeholder: '-13.6677', help: 'Busque no Google Maps', default: '-13.6677' },
      { key: 'schema_longitude', label: 'Longitude', placeholder: '-57.6897', help: 'Busque no Google Maps', default: '-57.6897' },
    ],
  },
  {
    title: 'Horário de Funcionamento',
    description: 'Exibido no Google ao buscar seu negócio.',
    fields: [
      { key: 'schema_hours_days', label: 'Dias', placeholder: 'Segunda a Sábado', help: 'Ex: Segunda a Sexta, Segunda a Sábado', default: 'Segunda a Sábado' },
      { key: 'schema_hours_open', label: 'Abre às', placeholder: '08:00', default: '08:00' },
      { key: 'schema_hours_close', label: 'Fecha às', placeholder: '19:00', default: '19:00' },
    ],
  },
  {
    title: 'Redes Sociais',
    description: 'Links das redes sociais — Google usa para validar identidade do negócio.',
    fields: [
      { key: 'social_instagram', label: 'URL Instagram', placeholder: 'https://instagram.com/eleveimports', default: 'https://instagram.com/eleveimports' },
      { key: 'social_whatsapp', label: 'URL WhatsApp', placeholder: 'https://wa.me/5565996881272', default: 'https://wa.me/5565996881272' },
      { key: 'social_facebook', label: 'URL Facebook (opcional)', placeholder: 'https://facebook.com/eleveimports' },
    ],
  },
]

const allFields = sections.flatMap(s => s.fields)

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

function getValue(key: string) {
  if (configs.value[key]?.value) return configs.value[key].value
  // Retorna default se existir
  const field = allFields.find(f => f.key === key)
  return (field as any)?.default || ''
}

function setValue(key: string, value: string) {
  if (!configs.value[key]) {
    configs.value[key] = { id: '', value }
  } else {
    configs.value[key].value = value
  }
}

function charCount(key: string) {
  return getValue(key).length
}

async function save() {
  saving.value = true
  try {
    for (const field of allFields) {
      const existing = configs.value[field.key]
      const value = existing?.value || ''
      if (existing?.id) {
        await databases.updateDocument(DB, COLLECTION, existing.id, { value })
      } else if (value) {
        await databases.createDocument(DB, COLLECTION, 'unique()', {
          key: field.key,
          value,
          type: 'string',
          description: field.label,
        })
      }
    }
    alert('Configurações de SEO salvas!')
  } catch (e: any) {
    alert('Erro: ' + e.message)
  }
  saving.value = false
}

onMounted(load)
</script>

<template>
  <div>
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;">
      <div>
        <h1 style="font-size:24px;font-weight:700;color:#111827;margin-bottom:4px;">SEO & Metadados</h1>
        <p style="font-size:14px;color:#6b7280;">Otimização para Google, redes sociais e busca local</p>
      </div>
      <button
        :disabled="saving"
        style="padding:10px 24px;background:#111827;color:#fff;border:none;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;"
        :style="saving ? 'opacity:0.6' : ''"
        @click="save"
      >
        {{ saving ? 'Salvando...' : 'Salvar Tudo' }}
      </button>
    </div>

    <div v-if="loading" style="text-align:center;padding:60px;color:#6b7280;">Carregando...</div>

    <div v-else style="display:flex;flex-direction:column;gap:24px;max-width:750px;">
      <!-- Google Preview -->
      <div style="background:#fff;border-radius:12px;border:1px solid #e5e7eb;padding:24px;">
        <h2 style="font-size:14px;font-weight:600;color:#111827;margin-bottom:16px;">
          <span style="display:inline-flex;align-items:center;gap:6px;">
            <Icon name="ph:magnifying-glass" style="width:16px;height:16px;" />
            Preview no Google
          </span>
        </h2>
        <div style="background:#f9fafb;border-radius:8px;padding:16px;">
          <p style="font-size:14px;color:#1a0dab;margin:0 0 4px;font-family:arial,sans-serif;">
            {{ getValue('seo_title') || 'Eleve Imports — iPhones e Perfumes Árabes' }}
          </p>
          <p style="font-size:12px;color:#006621;margin:0 0 4px;font-family:arial,sans-serif;">
            https://eleveimports.com
          </p>
          <p style="font-size:13px;color:#545454;margin:0;font-family:arial,sans-serif;line-height:1.5;">
            {{ getValue('seo_description') || 'iPhones originais e perfumes árabes em Campo Novo do Parecis...' }}
          </p>
        </div>
        <div style="margin-top:8px;display:flex;gap:16px;">
          <span style="font-size:11px;color:#9ca3af;">
            Título: {{ charCount('seo_title') }}/60 caracteres
          </span>
          <span style="font-size:11px;color:#9ca3af;">
            Descrição: {{ charCount('seo_description') }}/155 caracteres
          </span>
        </div>
      </div>

      <!-- Sections -->
      <div
        v-for="section in sections"
        :key="section.title"
        style="background:#fff;border-radius:12px;border:1px solid #e5e7eb;padding:24px;"
      >
        <h2 style="font-size:16px;font-weight:600;color:#111827;margin-bottom:4px;">{{ section.title }}</h2>
        <p style="font-size:13px;color:#6b7280;margin-bottom:20px;">{{ section.description }}</p>

        <div style="display:flex;flex-direction:column;gap:16px;">
          <div v-for="field in section.fields" :key="field.key">
            <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:6px;">
              {{ field.label }}
            </label>
            <textarea
              v-if="field.type === 'textarea'"
              :value="getValue(field.key)"
              @input="setValue(field.key, ($event.target as HTMLTextAreaElement).value)"
              rows="3"
              style="width:100%;padding:10px 14px;border:1px solid #d1d5db;border-radius:8px;font-size:14px;box-sizing:border-box;color:#111827;background:#fff;resize:vertical;"
              :placeholder="field.placeholder"
            />
            <input
              v-else
              :value="getValue(field.key)"
              @input="setValue(field.key, ($event.target as HTMLInputElement).value)"
              style="width:100%;padding:10px 14px;border:1px solid #d1d5db;border-radius:8px;font-size:14px;box-sizing:border-box;color:#111827;background:#fff;"
              :placeholder="field.placeholder"
            />
            <p v-if="field.help" style="font-size:12px;color:#9ca3af;margin:4px 0 0;">{{ field.help }}</p>
          </div>
        </div>
      </div>

      <!-- SEO Checklist -->
      <div style="background:#fff;border-radius:12px;border:1px solid #e5e7eb;padding:24px;">
        <h2 style="font-size:16px;font-weight:600;color:#111827;margin-bottom:16px;">
          <span style="display:inline-flex;align-items:center;gap:6px;">
            <Icon name="ph:check-square" style="width:18px;height:18px;" />
            Checklist SEO (Google)
          </span>
        </h2>
        <div style="display:flex;flex-direction:column;gap:10px;">
          <div v-for="item in [
            { done: true, text: 'Title tag único e descritivo em cada página' },
            { done: true, text: 'Meta description com até 155 caracteres' },
            { done: true, text: 'Structured data (LocalBusiness, WebSite, WebPage)' },
            { done: true, text: 'Open Graph tags para WhatsApp/redes sociais' },
            { done: true, text: 'robots.txt configurado (bloqueia /api/ e /admin/)' },
            { done: true, text: 'Sitemap XML gerado automaticamente' },
            { done: true, text: 'Tag canonical na homepage' },
            { done: true, text: 'Idioma pt-BR definido no HTML' },
            { done: true, text: 'Imagens com alt text descritivo' },
            { done: true, text: 'HTTPS habilitado' },
            { done: true, text: 'Mobile-first responsive design' },
            { done: true, text: 'Prerender/SSG nas páginas principais' },
            { done: true, text: 'Geo tags para SEO local (geo.region, geo.placename)' },
            { done: true, text: 'Horário de funcionamento no Schema.org' },
            { done: true, text: 'Coordenadas geográficas no Schema.org' },
            { done: true, text: 'Links de redes sociais (sameAs) no Schema.org' },
            { done: true, text: 'Telefone no Schema.org' },
            { done: true, text: 'Favicon SVG configurado' },
          ]" :key="item.text" style="display:flex;align-items:center;gap:8px;">
            <span style="width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;" :style="item.done ? 'background:#dcfce7;color:#16a34a;' : 'background:#fef2f2;color:#dc2626;'">
              {{ item.done ? '✓' : '✗' }}
            </span>
            <span style="font-size:13px;color:#374151;">{{ item.text }}</span>
          </div>
        </div>
      </div>

      <!-- Save bottom -->
      <div style="padding-bottom:40px;">
        <button
          :disabled="saving"
          style="padding:12px 28px;background:#111827;color:#fff;border:none;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;"
          :style="saving ? 'opacity:0.6' : ''"
          @click="save"
        >
          {{ saving ? 'Salvando...' : 'Salvar Configurações de SEO' }}
        </button>
      </div>
    </div>
  </div>
</template>
