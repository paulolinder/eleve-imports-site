<script setup lang="ts">
// Seção de CTA final — WhatsApp + contato
</script>

<template>
  <section class="section-padding bg-cream-50 relative overflow-hidden" aria-labelledby="cta-heading">
    <div class="container-site">
      <div
        class="relative overflow-hidden rounded-4xl gradient-dark px-8 py-16 text-center sm:px-12 md:py-20"
      >
        <!-- Glow decorativo -->
        <div class="absolute inset-0 pointer-events-none">
          <div class="absolute -top-20 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-gold-500/10 blur-3xl" />
        </div>

        <div class="relative z-10 max-w-2xl mx-auto">
          <span class="inline-flex items-center gap-2 rounded-full border border-gold-500/20 bg-gold-500/5 px-4 py-1.5 mb-6">
            <Icon name="ph:whatsapp-logo" class="size-4 text-gold-400" />
            <span class="text-xs font-medium text-gold-300 tracking-wider uppercase">
              Atendimento rápido
            </span>
          </span>

          <h2
            id="cta-heading"
            class="font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl mb-4"
          >
            Encontrou o que<br />
            <span class="gradient-gold-text">estava procurando?</span>
          </h2>

          <p class="text-base text-white/60 mb-10 leading-relaxed max-w-lg mx-auto">
            Consulte disponibilidade, tire dúvidas ou faça seu pedido diretamente pelo WhatsApp.
            Resposta rápida, atendimento personalizado.
          </p>

          <div class="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <UiButton
              href="https://wa.me/5511999999999?text=Olá! Tenho interesse em produtos da Eleve Imports."
              size="lg"
              variant="primary"
              external
              class="w-full sm:w-auto"
            >
              <Icon name="ph:whatsapp-logo" class="size-5" />
              Chamar no WhatsApp
            </UiButton>
            <UiButton to="/catalogo" size="lg" variant="outline" class="w-full sm:w-auto">
              Ver catálogo completo
            </UiButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
