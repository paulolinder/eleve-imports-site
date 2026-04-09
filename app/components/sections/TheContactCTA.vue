<script setup lang="ts">
// Seção de CTA final — WhatsApp + localização
</script>

<template>
  <section id="contato" class="section-padding relative overflow-hidden" :style="`background: var(--bg-secondary)`" aria-labelledby="cta-heading">
    <div class="container-site">
      <div
        class="relative overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-12 md:py-20"
        style="background: linear-gradient(135deg, #111827 0%, #1f2937 100%)"
      >
        <div class="absolute inset-0 pointer-events-none">
          <div class="absolute -top-20 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-green-500/10 blur-3xl" />
        </div>

        <div class="relative z-10 max-w-2xl mx-auto">
          <span class="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6" style="background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.2)">
            <span class="size-1.5 rounded-full bg-green-400 animate-pulse" />
            <span class="text-xs font-medium tracking-wider uppercase" style="color: rgba(134,239,172,0.9)">
              Online agora
            </span>
          </span>

          <h2
            id="cta-heading"
            class="font-display text-3xl font-bold sm:text-4xl md:text-5xl mb-4"
            style="color: #fff"
          >
            Pronto para
            <span class="gradient-gold-text">elevar seu estilo?</span>
          </h2>

          <p class="text-base mb-10 leading-relaxed max-w-lg mx-auto" style="color: rgba(255,255,255,0.55)">
            Entre em contato pelo WhatsApp. Respondemos rápido, tiramos todas as
            dúvidas e cuidamos de tudo para você.
          </p>

          <a
            href="https://wa.me/5565996881272?text=Ol%C3%A1!%20Tenho%20interesse%20em%20produtos%20da%20Eleve%20Imports."
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-3 rounded-xl bg-green-500 px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-green-400 hover:shadow-xl hover:shadow-green-500/30 active:scale-95"
          >
            <Icon name="ph:whatsapp-logo-fill" class="size-6" />
            Chamar no WhatsApp
          </a>

          <div class="mt-10 flex flex-wrap items-center justify-center gap-6">
            <div class="flex items-center gap-2" style="color: rgba(255,255,255,0.4)">
              <Icon name="ph:map-pin-fill" class="size-4" style="color: rgba(184,134,11,0.7)" />
              <span class="text-sm">Campo Novo do Parecis — MT</span>
            </div>
            <div class="flex items-center gap-2" style="color: rgba(255,255,255,0.4)">
              <Icon name="ph:clock-fill" class="size-4" style="color: rgba(184,134,11,0.7)" />
              <span class="text-sm">Seg–Sáb, 8h–19h</span>
            </div>
            <div class="flex items-center gap-2" style="color: rgba(255,255,255,0.4)">
              <Icon name="ph:shield-check-fill" class="size-4" style="color: rgba(184,134,11,0.7)" />
              <span class="text-sm">100% Originais</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
