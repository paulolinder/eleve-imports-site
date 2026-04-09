<script setup lang="ts">
const benefits = [
  {
    icon: 'ph:shield-check',
    title: '100% Originais',
    description: 'Todos os produtos são importados diretamente de fornecedores verificados e autorizados. Sem falsificações.',
  },
  {
    icon: 'ph:truck',
    title: 'Entrega Segura',
    description: 'Embalagem reforçada, rastreamento completo e seguro incluso. Seu pedido chega intacto e pontual.',
  },
  {
    icon: 'ph:certificate',
    title: 'Garantia Inclusa',
    description: 'iPhones com garantia Apple. Perfumes com certificado de autenticidade. Sua compra protegida.',
  },
  {
    icon: 'ph:headset',
    title: 'Suporte via WhatsApp',
    description: 'Atendimento humano, rápido e personalizado. Tire dúvidas antes, durante e depois da compra.',
  },
  {
    icon: 'ph:credit-card',
    title: 'Pagamento Facilitado',
    description: 'Pix, transferência e diversas formas de pagamento. Consulte disponibilidade e condições.',
  },
  {
    icon: 'ph:handshake',
    title: 'Relação de Confiança',
    description: 'Centenas de clientes satisfeitos. Avaliações reais, transparência total no processo.',
  },
]
</script>

<template>
  <section id="diferenciais" class="section-padding relative overflow-hidden" :style="`background: var(--bg-secondary)`" aria-labelledby="benefits-heading">
    <div class="container-site relative z-10">
      <div class="mb-14 text-center">
        <span
          class="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4"
          :style="`background: var(--chip-bg); border: 1px solid var(--chip-border)`"
        >
          <Icon name="ph:medal" class="size-4 text-gold-600" />
          <span class="text-xs font-medium tracking-wider uppercase" :style="`color: var(--text-secondary)`">
            Por que escolher a Eleve
          </span>
        </span>
        <h2 id="benefits-heading" class="font-display text-3xl font-bold sm:text-4xl" :style="`color: var(--text-primary)`">
          Qualidade e <span class="gradient-gold-text">confiança</span>
          <br class="hidden sm:block" />
          em cada produto.
        </h2>
      </div>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="benefit in benefits"
          :key="benefit.title"
          class="group flex flex-col gap-4 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
          :style="`background: var(--bg-card); border: 1px solid var(--border-primary); box-shadow: var(--shadow-sm)`"
        >
          <div
            class="flex size-12 items-center justify-center rounded-xl"
            style="background: rgba(184,134,11,0.08); border: 1px solid rgba(184,134,11,0.12)"
          >
            <Icon :name="benefit.icon" class="size-6 text-gold-600" />
          </div>
          <div>
            <h3 class="mb-1.5 font-semibold" :style="`color: var(--text-primary)`">{{ benefit.title }}</h3>
            <p class="text-sm leading-relaxed" :style="`color: var(--text-secondary)`">{{ benefit.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
