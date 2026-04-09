<script setup lang="ts">
const route = useRoute()
const isMenuOpen = ref(false)

const navLinks = [
  { label: 'Início', to: '/' },
  { label: 'Catálogo', to: '/catalogo' },
  { label: 'iPhones', to: '/catalogo?categoria=iphones' },
  { label: 'Perfumes Árabes', to: '/catalogo?categoria=perfumes-arabes' },
  { label: 'Sobre', to: '/sobre' },
  { label: 'Contato', to: '/contato' },
]

// Fecha o menu ao navegar
watch(() => route.path, () => { isMenuOpen.value = false })

// Fecha ao pressionar Escape
onMounted(() => {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') isMenuOpen.value = false
  })
})

function isActive(to: string) {
  if (to === '/') return route.path === '/'
  return route.path.startsWith(to.split('?')[0])
}
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full border-b border-white/10 backdrop-blur-md"
    style="background-color: rgba(13, 13, 26, 0.97)"
  >
    <div class="container-site">
      <div class="flex h-16 items-center justify-between md:h-20">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2 shrink-0" aria-label="Eleve Imports - Página inicial">
          <span class="font-display text-xl font-bold tracking-wide gradient-gold-text md:text-2xl">
            Eleve
          </span>
          <span class="text-xl font-light text-white/80 md:text-2xl">Imports</span>
        </NuxtLink>

        <!-- Nav desktop -->
        <nav class="hidden lg:flex items-center gap-1" aria-label="Navegação principal">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200"
            :class="
              isActive(link.to)
                ? 'text-gold-400 bg-gold-500/10'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            "
          >
            {{ link.label }}
          </NuxtLink>
        </nav>

        <!-- CTA + Mobile Menu -->
        <div class="flex items-center gap-3">
          <a
            href="https://wa.me/5565999999999"
            target="_blank"
            rel="noopener noreferrer"
            class="hidden sm:inline-flex items-center gap-2 rounded-lg bg-gold-500 px-4 py-2 text-sm font-semibold text-dark-500 transition-all duration-200 hover:bg-gold-400 hover:shadow-lg hover:shadow-gold-500/25 active:scale-95"
          >
            <Icon name="ph:whatsapp-logo" class="size-4" />
            Consultar
          </a>

          <!-- Botão mobile menu -->
          <button
            class="flex size-10 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/5 hover:text-white lg:hidden"
            :aria-expanded="isMenuOpen"
            aria-controls="mobile-menu"
            aria-label="Abrir menu de navegação"
            @click="isMenuOpen = !isMenuOpen"
          >
            <Icon :name="isMenuOpen ? 'ph:x' : 'ph:list'" class="size-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Menu mobile -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isMenuOpen"
        id="mobile-menu"
        class="border-t border-white/10 bg-dark-600 lg:hidden"
      >
        <nav class="container-site py-4" aria-label="Navegação mobile">
          <ul class="flex flex-col gap-1">
            <li v-for="link in navLinks" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors"
                :class="
                  isActive(link.to)
                    ? 'bg-gold-500/10 text-gold-400'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                "
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
          <div class="mt-4 border-t border-white/10 pt-4">
            <a
              href="https://wa.me/5565999999999"
              target="_blank"
              rel="noopener noreferrer"
              class="flex w-full items-center justify-center gap-2 rounded-lg bg-gold-500 px-4 py-3 text-sm font-semibold text-dark-500 transition-colors hover:bg-gold-400"
            >
              <Icon name="ph:whatsapp-logo" class="size-5" />
              Falar no WhatsApp
            </a>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>
