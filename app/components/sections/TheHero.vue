<script setup lang="ts">
// Hero principal da homepage
</script>

<template>
  <section
    class="relative min-h-[90vh] overflow-hidden gradient-dark flex items-center"
    aria-label="Hero - Eleve Imports"
  >
    <!-- Fundo decorativo -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-gold-500/5 blur-3xl"
      />
      <div
        class="absolute -bottom-40 -left-20 h-[500px] w-[500px] rounded-full bg-gold-500/3 blur-3xl"
      />
      <!-- Grid decorativo -->
      <div
        class="absolute inset-0 opacity-[0.03]"
        style="background-image: linear-gradient(rgba(201,168,76,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.3) 1px, transparent 1px); background-size: 60px 60px"
      />
    </div>

    <div class="container-site relative z-10 py-24 lg:py-32">
      <div class="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        <!-- Conteúdo textual -->
        <div class="text-center lg:text-left">
          <!-- Chip / tag -->
          <div class="inline-flex items-center gap-2 rounded-full border border-gold-500/20 bg-gold-500/5 px-4 py-1.5 mb-6">
            <span class="size-1.5 rounded-full bg-gold-400 animate-pulse" />
            <span class="text-xs font-medium text-gold-300 tracking-wider uppercase">
              Importados Premium
            </span>
          </div>

          <h1 class="font-display text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
            Produtos
            <span class="block gradient-gold-text">importados</span>
            com qualidade
            <span class="text-white/60">garantida.</span>
          </h1>

          <p class="mt-6 text-base leading-relaxed text-white/60 sm:text-lg max-w-lg mx-auto lg:mx-0">
            iPhones originais desbloqueados e perfumes árabes exclusivos, importados com segurança
            e entregues em todo o Brasil.
          </p>

          <!-- CTAs -->
          <div class="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <UiButton to="/catalogo" size="lg" variant="primary">
              <Icon name="ph:storefront" class="size-5" />
              Ver catálogo
            </UiButton>
            <UiButton
              href="https://wa.me/5511999999999"
              size="lg"
              variant="outline"
              external
            >
              <Icon name="ph:whatsapp-logo" class="size-5" />
              Falar no WhatsApp
            </UiButton>
          </div>

          <!-- Social proof -->
          <div class="mt-12 flex flex-wrap items-center justify-center gap-6 lg:justify-start">
            <div class="flex items-center gap-2 text-white/50">
              <Icon name="ph:shield-check" class="size-5 text-gold-500" />
              <span class="text-sm">100% Originais</span>
            </div>
            <div class="flex items-center gap-2 text-white/50">
              <Icon name="ph:truck" class="size-5 text-gold-500" />
              <span class="text-sm">Entrega Segura</span>
            </div>
            <div class="flex items-center gap-2 text-white/50">
              <Icon name="ph:star" class="size-5 text-gold-500" />
              <span class="text-sm">Garantia Inclusa</span>
            </div>
          </div>
        </div>

        <!-- Visual / Hero image area -->
        <div class="relative hidden lg:flex items-center justify-center">
          <div class="relative">
            <!-- Glow -->
            <div class="absolute inset-0 rounded-3xl bg-gold-500/10 blur-2xl scale-110" />

            <!-- Placeholder para imagem real do hero -->
            <div
              class="relative z-10 h-[520px] w-[400px] rounded-3xl border border-gold-500/10 bg-white/5 backdrop-blur-sm flex items-center justify-center overflow-hidden"
            >
              <div class="text-center text-white/20">
                <Icon name="ph:image" class="size-20 mx-auto mb-4" />
                <p class="text-sm">Hero Image</p>
                <p class="text-xs mt-1">1200×1600px recomendado</p>
              </div>
            </div>

            <!-- Floating cards -->
            <div
              class="absolute -left-16 top-16 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-md shadow-xl"
            >
              <div class="flex items-center gap-3">
                <div class="flex size-10 items-center justify-center rounded-xl bg-gold-500">
                  <Icon name="ph:device-mobile" class="size-5 text-dark-500" />
                </div>
                <div>
                  <p class="text-xs font-semibold text-white">iPhone 16 Pro Max</p>
                  <p class="text-xs text-white/50">A partir de R$ 9.499</p>
                </div>
              </div>
            </div>

            <div
              class="absolute -right-10 bottom-20 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-md shadow-xl"
            >
              <div class="flex items-center gap-3">
                <div class="flex size-10 items-center justify-center rounded-xl bg-gold-500">
                  <Icon name="ph:sparkle" class="size-5 text-dark-500" />
                </div>
                <div>
                  <p class="text-xs font-semibold text-white">Oud Royal</p>
                  <p class="text-xs text-white/50">Parfum 100ml</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
