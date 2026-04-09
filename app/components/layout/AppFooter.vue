<script setup lang="ts">
const currentYear = new Date().getFullYear()

const footerLinks = {
  catalogo: [
    { label: 'Todos os Produtos', to: '/catalogo' },
    { label: 'iPhones', to: '/catalogo?categoria=iphones' },
    { label: 'Perfumes Árabes', to: '/catalogo?categoria=perfumes-arabes' },
    { label: 'Destaques', to: '/catalogo?destaque=true' },
  ],
  empresa: [
    { label: 'Sobre a Eleve', to: '/sobre' },
    { label: 'Contato', to: '/contato' },
  ],
  contato: [
    { label: 'WhatsApp', href: 'https://wa.me/5511999999999', external: true },
    { label: 'Instagram', href: 'https://instagram.com/eleveimports', external: true },
  ],
}
</script>

<template>
  <footer class="gradient-dark text-white">
    <!-- Main footer -->
    <div class="container-site py-16">
      <div class="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
        <!-- Marca -->
        <div class="lg:col-span-1">
          <NuxtLink to="/" class="inline-flex items-center gap-2 mb-4">
            <span class="font-display text-2xl font-bold gradient-gold-text">Eleve</span>
            <span class="text-2xl font-light text-white/70">Imports</span>
          </NuxtLink>
          <p class="text-sm text-white/60 leading-relaxed max-w-xs">
            Importados premium com qualidade garantida. iPhones originais e perfumes árabes
            exclusivos, entregues com segurança em todo o Brasil.
          </p>
          <div class="flex items-center gap-3 mt-6">
            <a
              href="https://instagram.com/eleveimports"
              target="_blank"
              rel="noopener noreferrer"
              class="flex size-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all hover:border-gold-500/50 hover:text-gold-400"
              aria-label="Instagram da Eleve Imports"
            >
              <Icon name="ph:instagram-logo" class="size-5" />
            </a>
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              class="flex size-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all hover:border-gold-500/50 hover:text-gold-400"
              aria-label="WhatsApp da Eleve Imports"
            >
              <Icon name="ph:whatsapp-logo" class="size-5" />
            </a>
          </div>
        </div>

        <!-- Catálogo -->
        <div>
          <h3 class="mb-4 text-sm font-semibold uppercase tracking-widest text-gold-400">
            Catálogo
          </h3>
          <ul class="flex flex-col gap-2">
            <li v-for="link in footerLinks.catalogo" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="text-sm text-white/60 transition-colors hover:text-white"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Empresa -->
        <div>
          <h3 class="mb-4 text-sm font-semibold uppercase tracking-widest text-gold-400">
            Empresa
          </h3>
          <ul class="flex flex-col gap-2">
            <li v-for="link in footerLinks.empresa" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="text-sm text-white/60 transition-colors hover:text-white"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contato / CTA -->
        <div>
          <h3 class="mb-4 text-sm font-semibold uppercase tracking-widest text-gold-400">
            Fale Conosco
          </h3>
          <p class="mb-4 text-sm text-white/60">
            Tire dúvidas, faça pedidos ou consulte disponibilidade diretamente pelo WhatsApp.
          </p>
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 rounded-lg bg-gold-500 px-4 py-2.5 text-sm font-semibold text-dark-500 transition-all hover:bg-gold-400 hover:shadow-lg hover:shadow-gold-500/20"
          >
            <Icon name="ph:whatsapp-logo" class="size-4" />
            Chamar no WhatsApp
          </a>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="border-t border-white/10">
      <div class="container-site flex flex-col items-center justify-between gap-2 py-6 sm:flex-row">
        <p class="text-xs text-white/40">
          &copy; {{ currentYear }} Eleve Imports. Todos os direitos reservados.
        </p>
        <p class="text-xs text-white/30">
          Importados premium com qualidade e segurança
        </p>
      </div>
    </div>
  </footer>
</template>
