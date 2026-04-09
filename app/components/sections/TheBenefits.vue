<script setup lang="ts">
const benefits = [
  {
    icon: 'ph:shield-check',
    title: '100% Originais',
    description:
      'Todos os produtos são importados diretamente de fornecedores verificados e autorizados. Sem falsificações.',
  },
  {
    icon: 'ph:truck',
    title: 'Entrega Segura',
    description:
      'Embalagem reforçada, rastreamento completo e seguro incluso. Seu pedido chega intacto e pontual.',
  },
  {
    icon: 'ph:certificate',
    title: 'Garantia Inclusa',
    description:
      'iPhones com garantia Apple. Perfumes com certificado de autenticidade. Sua compra protegida.',
  },
  {
    icon: 'ph:headset',
    title: 'Suporte via WhatsApp',
    description:
      'Atendimento humano, rápido e personalizado. Tire dúvidas antes, durante e depois da compra.',
  },
  {
    icon: 'ph:credit-card',
    title: 'Pagamento Facilitado',
    description:
      'Pix, transferência e diversas formas de pagamento. Consulte disponibilidade e condições.',
  },
  {
    icon: 'ph:handshake',
    title: 'Relação de Confiança',
    description:
      'Centenas de clientes satisfeitos. Avaliações reais, transparência total no processo.',
  },
]
</script>

<template>
  <section class="section-padding gradient-dark relative overflow-hidden" aria-labelledby="benefits-heading">
    <!-- Decorativo -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/2 bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
    </div>

    <div class="container-site relative z-10">
      <!-- Heading -->
      <div class="mb-14 text-center">
        <span class="text-xs font-semibold uppercase tracking-widest text-gold-400 mb-3 block">
          Por que escolher a Eleve
        </span>
        <h2 id="benefits-heading" class="font-display text-3xl font-bold text-white sm:text-4xl">
          Qualidade e <span class="gradient-gold-text">confiança</span>
          <br class="hidden sm:block" />
          em cada produto.
        </h2>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="benefit in benefits"
          :key="benefit.title"
          class="group flex flex-col gap-4 rounded-2xl border border-white/5 bg-white/3 p-6 transition-all duration-300 hover:border-gold-500/20 hover:bg-white/5"
        >
          <div
            class="flex size-12 items-center justify-center rounded-xl bg-gold-500/10 border border-gold-500/10 transition-colors group-hover:bg-gold-500/15"
          >
            <Icon :name="benefit.icon" class="size-6 text-gold-400" />
          </div>
          <div>
            <h3 class="mb-1.5 font-semibold text-white">{{ benefit.title }}</h3>
            <p class="text-sm text-white/55 leading-relaxed">{{ benefit.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
