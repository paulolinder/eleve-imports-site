<script setup lang="ts">
const currentYear = new Date().getFullYear()

function scrollTo(hash: string) {
  const el = document.querySelector(hash)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <footer :style="`background: var(--footer-bg)`">
    <div class="container-site py-14">
      <div class="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
        <!-- Marca -->
        <div class="lg:col-span-1">
          <a href="#hero" class="inline-block mb-4 cursor-pointer" @click.prevent="scrollTo('#hero')">
            <img src="/logo.png" alt="Eleve Imports - Importados Premium em Campo Novo do Parecis" style="height: 44px; width: auto; display: block;" />
          </a>
          <p class="text-sm leading-relaxed max-w-xs" :style="`color: var(--footer-text)`">
            Importados premium em Campo Novo do Parecis. iPhones originais e perfumes árabes
            exclusivos com qualidade garantida.
          </p>
          <p class="text-xs mt-2 flex items-center gap-1" :style="`color: var(--footer-text-muted)`">
            <Icon name="ph:map-pin" class="size-3" />
            Campo Novo do Parecis - MT
          </p>
          <div class="flex items-center gap-3 mt-6">
            <a
              href="https://instagram.com/eleveimports"
              target="_blank"
              rel="noopener noreferrer"
              class="flex size-10 items-center justify-center rounded-full transition-all"
              :style="`color: var(--footer-text); border: 1px solid rgba(255,255,255,0.1)`"
              aria-label="Instagram da Eleve Imports"
            >
              <Icon name="ph:instagram-logo" class="size-5" />
            </a>
            <a
              href="https://wa.me/5565996881272"
              target="_blank"
              rel="noopener noreferrer"
              class="flex size-10 items-center justify-center rounded-full transition-all"
              :style="`color: var(--footer-text); border: 1px solid rgba(255,255,255,0.1)`"
              aria-label="WhatsApp da Eleve Imports"
            >
              <Icon name="ph:whatsapp-logo" class="size-5" />
            </a>
          </div>
        </div>

        <!-- Navegação -->
        <div>
          <h3 class="mb-4 text-sm font-semibold uppercase tracking-widest text-gold-400">
            Navegação
          </h3>
          <ul class="flex flex-col gap-2.5">
            <li>
              <a href="#iphones" class="text-sm transition-colors cursor-pointer" :style="`color: var(--footer-text)`" @click.prevent="scrollTo('#iphones')">iPhones</a>
            </li>
            <li>
              <a href="#perfumes" class="text-sm transition-colors cursor-pointer" :style="`color: var(--footer-text)`" @click.prevent="scrollTo('#perfumes')">Perfumes Árabes</a>
            </li>
            <li>
              <a href="#diferenciais" class="text-sm transition-colors cursor-pointer" :style="`color: var(--footer-text)`" @click.prevent="scrollTo('#diferenciais')">Diferenciais</a>
            </li>
            <li>
              <a href="#contato" class="text-sm transition-colors cursor-pointer" :style="`color: var(--footer-text)`" @click.prevent="scrollTo('#contato')">Contato</a>
            </li>
          </ul>
        </div>

        <!-- CTA -->
        <div>
          <h3 class="mb-4 text-sm font-semibold uppercase tracking-widest text-gold-400">
            Fale Conosco
          </h3>
          <p class="mb-4 text-sm" :style="`color: var(--footer-text)`">
            Tire dúvidas, faça pedidos ou consulte disponibilidade diretamente pelo WhatsApp.
          </p>
          <a
            href="https://wa.me/5565996881272?text=Ol%C3%A1!%20Tenho%20interesse%20em%20produtos%20da%20Eleve%20Imports."
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-green-400 hover:shadow-lg hover:shadow-green-500/20"
          >
            <Icon name="ph:whatsapp-logo-fill" class="size-4" />
            Chamar no WhatsApp
          </a>
        </div>
      </div>
    </div>

    <div style="border-top: 1px solid rgba(255,255,255,0.08)">
      <div class="container-site flex flex-col items-center justify-between gap-2 py-6 sm:flex-row">
        <p class="text-xs" :style="`color: var(--footer-text-muted)`">
          &copy; {{ currentYear }} Eleve Imports. Todos os direitos reservados.
        </p>
        <p class="text-xs" :style="`color: var(--footer-text-muted)`">
          Campo Novo do Parecis — MT
        </p>
      </div>
    </div>
  </footer>
</template>
