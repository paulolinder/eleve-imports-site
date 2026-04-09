<script setup lang="ts">
const isVisible = ref(false)

onMounted(() => {
  // Aparece após scroll de 300px para não poluir na entrada
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
      href="https://wa.me/5565999999999?text=Olá! Tenho interesse em produtos da Eleve Imports."
      target="_blank"
      rel="noopener noreferrer"
      class="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/30 transition-all duration-200 hover:scale-110 hover:bg-green-400 hover:shadow-xl hover:shadow-green-500/40 active:scale-95 sm:size-16"
      aria-label="Conversar no WhatsApp"
    >
      <Icon name="ph:whatsapp-logo-fill" class="size-7 sm:size-8" />
    </a>
  </Transition>
</template>
