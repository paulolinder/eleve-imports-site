<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const { databases } = useAppwriteClient()
const DB = 'eleve_imports_db'

const stats = ref({ products: 0, testimonials: 0, configs: 0 })

onMounted(async () => {
  try {
    const [products, testimonials, configs] = await Promise.allSettled([
      databases.listDocuments(DB, 'homepage_products'),
      databases.listDocuments(DB, 'testimonials'),
      databases.listDocuments(DB, 'site_config'),
    ])
    stats.value = {
      products: products.status === 'fulfilled' ? products.value.total : 0,
      testimonials: testimonials.status === 'fulfilled' ? testimonials.value.total : 0,
      configs: configs.status === 'fulfilled' ? configs.value.total : 0,
    }
  } catch {}
})
</script>

<template>
  <div>
    <h1 style="font-size:24px;font-weight:700;color:#111827;margin-bottom:8px;">Dashboard</h1>
    <p style="font-size:14px;color:#6b7280;margin-bottom:32px;">Visão geral do site Eleve Imports</p>

    <!-- Stats cards -->
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-bottom:32px;">
      <div style="background:#fff;border-radius:12px;padding:24px;border:1px solid #e5e7eb;">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
          <div style="width:40px;height:40px;border-radius:10px;background:rgba(184,134,11,0.08);display:flex;align-items:center;justify-content:center;">
            <Icon name="ph:package" style="width:20px;height:20px;color:#b8860b;" />
          </div>
          <span style="font-size:13px;color:#6b7280;">Produtos</span>
        </div>
        <p style="font-size:28px;font-weight:700;color:#111827;margin:0;">{{ stats.products }}</p>
      </div>

      <div style="background:#fff;border-radius:12px;padding:24px;border:1px solid #e5e7eb;">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
          <div style="width:40px;height:40px;border-radius:10px;background:rgba(124,58,237,0.08);display:flex;align-items:center;justify-content:center;">
            <Icon name="ph:chat-circle-text" style="width:20px;height:20px;color:#7c3aed;" />
          </div>
          <span style="font-size:13px;color:#6b7280;">Depoimentos</span>
        </div>
        <p style="font-size:28px;font-weight:700;color:#111827;margin:0;">{{ stats.testimonials }}</p>
      </div>

      <div style="background:#fff;border-radius:12px;padding:24px;border:1px solid #e5e7eb;">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
          <div style="width:40px;height:40px;border-radius:10px;background:rgba(34,197,94,0.08);display:flex;align-items:center;justify-content:center;">
            <Icon name="ph:gear" style="width:20px;height:20px;color:#22c55e;" />
          </div>
          <span style="font-size:13px;color:#6b7280;">Configurações</span>
        </div>
        <p style="font-size:28px;font-weight:700;color:#111827;margin:0;">{{ stats.configs }}</p>
      </div>
    </div>

    <!-- Quick actions -->
    <h2 style="font-size:16px;font-weight:600;color:#111827;margin-bottom:16px;">Ações rápidas</h2>
    <div style="display:flex;flex-wrap:wrap;gap:12px;">
      <NuxtLink
        to="/admin/produtos"
        style="display:flex;align-items:center;gap:8px;padding:12px 20px;background:#fff;border:1px solid #e5e7eb;border-radius:10px;font-size:14px;font-weight:500;color:#374151;text-decoration:none;transition:all 0.15s;"
      >
        <Icon name="ph:plus" style="width:16px;height:16px;" />
        Gerenciar Produtos
      </NuxtLink>
      <NuxtLink
        to="/admin/depoimentos"
        style="display:flex;align-items:center;gap:8px;padding:12px 20px;background:#fff;border:1px solid #e5e7eb;border-radius:10px;font-size:14px;font-weight:500;color:#374151;text-decoration:none;transition:all 0.15s;"
      >
        <Icon name="ph:chat-circle-text" style="width:16px;height:16px;" />
        Gerenciar Depoimentos
      </NuxtLink>
      <NuxtLink
        to="/admin/configuracoes"
        style="display:flex;align-items:center;gap:8px;padding:12px 20px;background:#fff;border:1px solid #e5e7eb;border-radius:10px;font-size:14px;font-weight:500;color:#374151;text-decoration:none;transition:all 0.15s;"
      >
        <Icon name="ph:gear" style="width:16px;height:16px;" />
        Configurações do Site
      </NuxtLink>
      <a
        href="/"
        target="_blank"
        style="display:flex;align-items:center;gap:8px;padding:12px 20px;background:#fff;border:1px solid #e5e7eb;border-radius:10px;font-size:14px;font-weight:500;color:#374151;text-decoration:none;transition:all 0.15s;"
      >
        <Icon name="ph:eye" style="width:16px;height:16px;" />
        Ver Site
      </a>
    </div>
  </div>
</template>
