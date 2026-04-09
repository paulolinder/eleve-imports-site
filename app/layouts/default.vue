<script setup lang="ts">
// Layout padrão do site — header + main + footer
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <a href="#main-content" class="skip-to-content">Pular para conteúdo principal</a>
    <AppHeader />
    <main id="main-content" class="flex-1">
      <slot />
    </main>
    <AppFooter />
    <WhatsAppFloat />
  </div>
</template>
