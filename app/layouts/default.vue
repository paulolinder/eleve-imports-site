<script setup lang="ts">
// Layout padrão do site — header + main + footer
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
    <WhatsAppFloat />
  </div>
</template>
