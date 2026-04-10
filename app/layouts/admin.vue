<script setup lang="ts">
const route = useRoute()

const menuItems = [
  { label: 'Dashboard', to: '/admin', icon: 'ph:house' },
  { label: 'Produtos', to: '/admin/produtos', icon: 'ph:package' },
  { label: 'Catálogo', to: '/admin/catalogo', icon: 'ph:storefront' },
  { label: 'Depoimentos', to: '/admin/depoimentos', icon: 'ph:chat-circle-text' },
  { label: 'SEO', to: '/admin/seo', icon: 'ph:magnifying-glass' },
  { label: 'Configurações', to: '/admin/configuracoes', icon: 'ph:gear' },
]

const isSidebarOpen = ref(true)

async function logout() {
  try {
    const { Account } = await import('appwrite')
    const { client } = useAppwriteClient()
    const account = new Account(client)
    await account.deleteSession('current')
  } catch {}
  navigateTo('/admin/login')
}
</script>

<template>
  <div style="display:flex;min-height:100vh;background:#f3f4f6;">
    <!-- Sidebar -->
    <aside
      style="width:260px;background:#111827;display:flex;flex-direction:column;position:fixed;top:0;bottom:0;left:0;z-index:40;"
    >
      <!-- Logo -->
      <div style="padding:20px 24px;border-bottom:1px solid rgba(255,255,255,0.06);">
        <div style="display:flex;align-items:center;gap:10px;">
          <img src="/logo.png" alt="Eleve" style="height:32px;width:auto;" />
          <span style="font-size:11px;font-weight:600;color:rgba(255,255,255,0.4);letter-spacing:1px;text-transform:uppercase;">Admin</span>
        </div>
      </div>

      <!-- Menu -->
      <nav style="flex:1;padding:16px 12px;display:flex;flex-direction:column;gap:4px;">
        <NuxtLink
          v-for="item in menuItems"
          :key="item.to"
          :to="item.to"
          style="display:flex;align-items:center;gap:12px;padding:10px 14px;border-radius:8px;font-size:14px;font-weight:500;transition:all 0.15s;text-decoration:none;"
          :style="route.path === item.to || (item.to !== '/admin' && route.path.startsWith(item.to))
            ? 'background:rgba(255,255,255,0.08);color:#fff;'
            : 'color:rgba(255,255,255,0.5);'"
        >
          <Icon :name="item.icon" style="width:20px;height:20px;" />
          {{ item.label }}
        </NuxtLink>
      </nav>

      <!-- Footer -->
      <div style="padding:16px 12px;border-top:1px solid rgba(255,255,255,0.06);">
        <button
          style="display:flex;align-items:center;gap:10px;width:100%;padding:10px 14px;border-radius:8px;font-size:13px;color:rgba(255,255,255,0.4);background:none;border:none;cursor:pointer;transition:color 0.15s;"
          @click="logout"
        >
          <Icon name="ph:sign-out" style="width:18px;height:18px;" />
          Sair
        </button>
        <NuxtLink
          to="/"
          style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:8px;font-size:13px;color:rgba(255,255,255,0.4);text-decoration:none;margin-top:2px;"
        >
          <Icon name="ph:arrow-left" style="width:18px;height:18px;" />
          Ver site
        </NuxtLink>
      </div>
    </aside>

    <!-- Main content -->
    <main style="flex:1;margin-left:260px;padding:32px;">
      <slot />
    </main>
  </div>
</template>
