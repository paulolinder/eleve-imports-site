<script setup lang="ts">
const isVisible = ref(false)

onMounted(() => {
  const observer = () => {
    isVisible.value = window.scrollY > 300
  }
  window.addEventListener('scroll', observer, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', observer))
})
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 scale-75 translate-y-4"
    enter-to-class="opacity-100 scale-100 translate-y-0"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 scale-100 translate-y-0"
    leave-to-class="opacity-0 scale-75 translate-y-4"
  >
    <a
      v-if="isVisible"
      href="https://wa.me/5565996881272?text=Olá! Tenho interesse em produtos da Eleve Imports."
      target="_blank"
      rel="noopener noreferrer"
      class="group fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-green-500 pl-5 pr-4 py-3.5 text-white shadow-xl shadow-green-500/30 transition-all duration-300 hover:bg-green-400 hover:shadow-2xl hover:shadow-green-500/40 active:scale-95"
      aria-label="Conversar no WhatsApp"
    >
      <!-- Anel de pulso -->
      <span class="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20 pointer-events-none" />

      <span class="relative text-sm font-semibold whitespace-nowrap">Consultar agora</span>
      <div class="relative flex size-8 shrink-0 items-center justify-center rounded-full bg-white/20">
        <Icon name="ph:whatsapp-logo-fill" class="size-5" />
      </div>
    </a>
  </Transition>
</template>
