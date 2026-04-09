<script setup lang="ts">
function scrollToSection(hash: string) {
  const el = document.querySelector(hash)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <section
    id="hero"
    class="relative min-h-[90vh] overflow-hidden flex items-center"
    style="background: linear-gradient(135deg, #0d0d1a 0%, #1a1a2e 50%, #0d0d1a 100%)"
    aria-label="Hero - Eleve Imports"
  >
    <!-- Fundo decorativo -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-gold-500/8 blur-3xl" />
      <div class="absolute bottom-0 -left-20 h-[400px] w-[400px] rounded-full bg-gold-500/5 blur-3xl" />
      <div class="absolute top-1/2 right-1/3 h-[300px] w-[300px] rounded-full bg-blue-500/4 blur-3xl" />
    </div>

    <div class="container-site relative z-10 py-20 lg:py-24">
      <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">

        <!-- Coluna de texto -->
        <div class="text-center lg:text-left">
          <!-- Chip -->
          <div class="inline-flex items-center gap-2 rounded-full border border-gold-500/20 bg-gold-500/5 px-4 py-1.5 mb-8">
            <span class="size-1.5 rounded-full bg-gold-400 animate-pulse" />
            <span class="text-xs font-medium text-gold-300 tracking-wider uppercase">
              Campo Novo do Parecis - MT
            </span>
          </div>

          <h1 class="font-display text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
            Produtos
            <span class="gradient-gold-text">exclusivos,</span>
            <br />
            entrega em<br class="hidden lg:block" /> Campo Novo.
          </h1>

          <p class="mt-6 text-base leading-relaxed sm:text-lg max-w-xl mx-auto lg:mx-0" style="color: rgba(255,255,255,0.5)">
            iPhones originais desbloqueados e perfumes árabes exclusivos.
            Atendemos pelo WhatsApp com entrega em Campo Novo do Parecis.
          </p>

          <!-- CTAs -->
          <div class="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href="https://wa.me/5565996881272?text=Olá! Quero conhecer os produtos da Eleve Imports."
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2.5 rounded-xl bg-green-500 px-7 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-green-400 hover:shadow-lg hover:shadow-green-500/25 active:scale-95 w-full sm:w-auto justify-center"
            >
              <Icon name="ph:whatsapp-logo-fill" class="size-5" />
              Falar no WhatsApp
            </a>
            <a
              href="#iphones"
              class="inline-flex items-center gap-2.5 rounded-xl px-7 py-4 text-base font-semibold transition-all duration-200 active:scale-95 w-full sm:w-auto justify-center"
              style="color: #fff; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.15);"
              @click.prevent="scrollToSection('#iphones')"
            >
              <Icon name="ph:storefront" class="size-5" />
              Ver produtos
            </a>
          </div>

          <!-- Stats de prova social -->
          <div class="mt-12 flex flex-wrap items-center justify-center gap-6 lg:justify-start">
            <div class="text-center">
              <p class="font-display text-2xl font-bold text-white">200+</p>
              <p class="text-xs" style="color: rgba(255,255,255,0.4)">Clientes atendidos</p>
            </div>
            <div class="w-px h-8" style="background: rgba(255,255,255,0.1)" />
            <div class="text-center">
              <p class="font-display text-2xl font-bold text-white">100%</p>
              <p class="text-xs" style="color: rgba(255,255,255,0.4)">Produtos originais</p>
            </div>
            <div class="w-px h-8" style="background: rgba(255,255,255,0.1)" />
            <div class="text-center">
              <p class="font-display text-2xl font-bold gradient-gold-text">5★</p>
              <p class="text-xs" style="color: rgba(255,255,255,0.4)">Avaliação média</p>
            </div>
          </div>
        </div>

        <!-- Coluna visual — produto em destaque -->
        <div class="relative hidden lg:flex items-center justify-center">
          <!-- Glow atrás do produto -->
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div class="h-[500px] w-[500px] rounded-full bg-gold-500/10 blur-3xl" />
          </div>

          <!-- Imagem do produto -->
          <div class="relative">
            <img
              src="https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=480&h=600&fit=crop&q=90"
              alt="iPhone 16 Pro Max — Eleve Imports"
              class="relative z-10 rounded-3xl shadow-2xl"
              style="height: 520px; width: auto; object-fit: cover;"
              width="416"
              height="520"
            />

            <!-- Badge flutuante — Garantia -->
            <div
              class="absolute -left-8 top-16 z-20 flex items-center gap-2.5 rounded-2xl px-4 py-3 shadow-xl"
              style="background: rgba(13,13,26,0.95); border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(12px);"
            >
              <div class="flex size-9 items-center justify-center rounded-xl bg-gold-500/15">
                <Icon name="ph:shield-check-fill" class="size-5 text-gold-400" />
              </div>
              <div>
                <p class="text-xs font-semibold text-white leading-none mb-0.5">Garantia Apple</p>
                <p class="text-xs" style="color: rgba(255,255,255,0.45)">12 meses inclusa</p>
              </div>
            </div>

            <!-- Badge flutuante — Desbloqueado -->
            <div
              class="absolute -right-8 bottom-24 z-20 flex items-center gap-2.5 rounded-2xl px-4 py-3 shadow-xl"
              style="background: rgba(13,13,26,0.95); border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(12px);"
            >
              <div class="flex size-9 items-center justify-center rounded-xl bg-green-500/15">
                <Icon name="ph:cell-signal-full" class="size-5 text-green-400" />
              </div>
              <div>
                <p class="text-xs font-semibold text-white leading-none mb-0.5">Desbloqueado</p>
                <p class="text-xs" style="color: rgba(255,255,255,0.45)">Qualquer operadora</p>
              </div>
            </div>

            <!-- Badge flutuante — Original -->
            <div
              class="absolute -right-6 top-12 z-20 flex items-center gap-2 rounded-xl px-3 py-2 shadow-xl"
              style="background: rgba(184,134,11,0.15); border: 1px solid rgba(184,134,11,0.3); backdrop-filter: blur(12px);"
            >
              <Icon name="ph:certificate-fill" class="size-4 text-gold-400" />
              <p class="text-xs font-semibold text-gold-300">100% Original</p>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Borda inferior dourada sutil -->
    <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
  </section>
</template>
