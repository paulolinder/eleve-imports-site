<script setup lang="ts">
const colorMode = useColorMode()
const isMenuOpen = ref(false)
const isScrolled = ref(false)

const isDark = computed(() => colorMode.value === 'dark')

// Quando scrollado no modo claro: fundo branco + texto preto
// Quando scrollado no modo escuro: fundo escuro + texto branco
// No topo (hero): sempre transparente + texto branco
const useDarkNav = computed(() => !isScrolled.value || isDark.value)

const logoSrc = computed(() => '/logo-dark.png')

const headerStyle = computed(() => {
  return 'background:#ffffff;border-bottom:1px solid #e5e7eb;box-shadow:0 1px 3px rgba(0,0,0,0.06);'
})

const linkColor = computed(() => 'color:#000')
const linkMutedColor = computed(() => 'color:#000')

const navLinks = [
  { label: 'Início', to: '#hero' },
  { label: 'iPhones', to: '#iphones' },
  { label: 'Perfumes', to: '#perfumes' },
  { label: 'Diferenciais', to: '#diferenciais' },
  { label: 'Contato', to: '#contato' },
]

function scrollTo(hash: string) {
  isMenuOpen.value = false
  const el = document.querySelector(hash)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function toggleTheme() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

onMounted(() => {
  const onScroll = () => {
    isScrolled.value = window.scrollY > 80
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') isMenuOpen.value = false
  })
})
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full transition-all duration-300"
    :style="headerStyle"
  >
    <div class="container-site">
      <div class="flex h-16 items-center justify-between overflow-hidden md:h-18">
        <!-- Logo -->
        <a href="#hero" class="flex items-center shrink-0" aria-label="Eleve Imports — ir para o início" @click.prevent="scrollTo('#hero')">
          <img
            :src="logoSrc"
            alt="Eleve Imports - iPhones e Perfumes Árabes em Campo Novo do Parecis"
            style="height: 44px; width: auto; display: block;"
            width="75"
            height="44"
          />
        </a>

        <!-- Nav desktop -->
        <nav class="nav-desktop" aria-label="Navegação principal">
          <a
            v-for="link in navLinks"
            :key="link.to"
            :href="link.to"
            style="padding:8px 16px;font-size:14px;font-weight:500;border-radius:8px;cursor:pointer;transition:color 0.2s"
            :style="linkColor"
            @click.prevent="scrollTo(link.to)"
          >
            {{ link.label }}
          </a>
        </nav>

        <!-- CTA + Theme Toggle + Mobile Menu -->
        <div class="flex items-center gap-2">
          <!-- Theme toggle -->
          <button
            class="header-theme-toggle"
            :style="linkColor"
            aria-label="Alternar tema claro/escuro"
            @click="toggleTheme"
          >
            <Icon :name="colorMode.value === 'dark' ? 'ph:sun' : 'ph:moon'" style="width:20px;height:20px" />
          </button>

          <a
            href="https://wa.me/5565996881272?text=Olá! Quero saber mais sobre os produtos da Eleve Imports."
            target="_blank"
            rel="noopener noreferrer"
            class="header-wa-btn"
          >
            <Icon name="ph:whatsapp-logo-fill" style="width:16px;height:16px" />
            WhatsApp
          </a>

          <!-- Botão mobile menu -->
          <button
            class="header-hamburger"
            :style="linkColor"
            :aria-expanded="isMenuOpen"
            aria-controls="mobile-menu"
            aria-label="Abrir menu"
            @click="isMenuOpen = !isMenuOpen"
          >
            <Icon :name="isMenuOpen ? 'ph:x' : 'ph:list'" style="width:24px;height:24px" />
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
        class="lg:hidden"
        :style="isDark
          ? 'background:rgba(15,17,23,0.98);border-top:1px solid rgba(255,255,255,0.06);backdrop-filter:blur(12px)'
          : 'background:rgba(255,255,255,0.98);border-top:1px solid rgba(0,0,0,0.06);backdrop-filter:blur(12px)'"
      >
        <nav class="container-site py-4" aria-label="Navegação mobile">
          <ul class="flex flex-col gap-1">
            <li v-for="link in navLinks" :key="link.to">
              <a
                :href="link.to"
                class="flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors"
                :style="isDark ? 'color:rgba(255,255,255,0.7)' : 'color:rgba(55,65,81,0.85)'"
                @click.prevent="scrollTo(link.to)"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
          <div class="mt-4 pt-4" :style="isDark ? 'border-top:1px solid rgba(255,255,255,0.06)' : 'border-top:1px solid rgba(0,0,0,0.06)'">
            <a
              href="https://wa.me/5565996881272?text=Olá! Quero saber mais sobre os produtos da Eleve Imports."
              target="_blank"
              rel="noopener noreferrer"
              class="flex w-full items-center justify-center gap-2 rounded-lg bg-green-500 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-400"
            >
              <Icon name="ph:whatsapp-logo-fill" class="size-5" />
              Falar no WhatsApp
            </a>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>
