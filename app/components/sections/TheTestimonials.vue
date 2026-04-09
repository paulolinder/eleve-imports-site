<script setup lang="ts">
const testimonials = [
  {
    name: 'Carlos M.',
    city: 'Campo Novo do Parecis - MT',
    avatar: 'C',
    avatarColor: '#1d4ed8',
    product: 'iPhone 16 Pro Max',
    rating: 5,
    text: 'Chegou exatamente como descrito, caixa lacrada, com nota fiscal e garantia Apple. Atendimento muito rápido no WhatsApp, tirou todas as dúvidas antes de eu fechar. Super recomendo!',
  },
  {
    name: 'Amanda S.',
    city: 'Tangará da Serra - MT',
    avatar: 'A',
    avatarColor: '#7c3aed',
    product: 'Lattafa Yara 100ml',
    rating: 5,
    text: 'Que perfume incrível! Totalmente diferente dos que eu encontrava aqui. Duração enorme, recebi vários elogios. O atendimento da Eleve é excelente, produto chegou bem embalado.',
  },
  {
    name: 'Rafael L.',
    city: 'Campo Novo do Parecis - MT',
    avatar: 'R',
    avatarColor: '#059669',
    product: 'iPhone 15 Pro',
    rating: 5,
    text: 'Segundo iPhone que compro com eles. Processo simples, preço justo e produto original. Muito melhor do que arriscar em marketplace. Já indiquei para vários amigos.',
  },
  {
    name: 'Fernanda O.',
    city: 'Diamantino - MT',
    avatar: 'F',
    avatarColor: '#dc2626',
    product: 'Mukhallat Gold 50ml',
    rating: 5,
    text: 'Presente para minha mãe e ela amou! Fragrância muito sofisticada, diferente de tudo que já vi aqui na região. Entrega rápida e embalagem linda. Voltarei com certeza!',
  },
]
</script>

<template>
  <section
    class="section-padding relative overflow-hidden"
    :style="`background: var(--bg-primary)`"
    aria-labelledby="testimonials-heading"
  >
    <div class="container-site relative z-10">
      <div class="mb-12 text-center">
        <span
          class="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4"
          :style="`background: var(--chip-bg); border: 1px solid var(--chip-border)`"
        >
          <Icon name="ph:star-fill" class="size-3.5 text-gold-500" />
          <span class="text-xs font-medium tracking-wider uppercase" :style="`color: var(--text-secondary)`">Avaliações reais</span>
        </span>
        <h2 id="testimonials-heading" class="font-display text-3xl font-bold sm:text-4xl" :style="`color: var(--text-primary)`">
          O que nossos clientes
          <span class="gradient-gold-text">dizem</span>
        </h2>
        <p class="mt-3 max-w-md mx-auto text-sm" :style="`color: var(--text-secondary)`">
          Centenas de clientes satisfeitos em Campo Novo do Parecis e região.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="t in testimonials"
          :key="t.name"
          class="flex flex-col gap-4 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
          :style="`background: var(--bg-card); border: 1px solid var(--border-primary); box-shadow: var(--shadow-sm)`"
        >
          <div class="flex items-center gap-0.5">
            <Icon v-for="i in 5" :key="i" name="ph:star-fill" class="size-4 text-gold-500" />
          </div>

          <p class="text-sm leading-relaxed flex-1" :style="`color: var(--text-secondary)`">
            "{{ t.text }}"
          </p>

          <div class="flex items-center gap-3 pt-2" :style="`border-top: 1px solid var(--border-primary)`">
            <div
              class="flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-bold"
              :style="`background-color: ${t.avatarColor}; color: #fff`"
            >
              {{ t.avatar }}
            </div>
            <div>
              <p class="text-sm font-semibold leading-none mb-1" :style="`color: var(--text-primary)`">{{ t.name }}</p>
              <p class="text-xs" :style="`color: var(--text-tertiary)`">{{ t.city }}</p>
            </div>
          </div>

          <div class="flex items-center gap-1.5 rounded-lg px-3 py-1.5" :style="`background: var(--spec-bg)`">
            <Icon name="ph:check-circle-fill" class="size-3.5 text-green-500 shrink-0" />
            <span class="text-xs" :style="`color: var(--text-secondary)`">Comprou: <span class="font-medium" :style="`color: var(--text-primary)`">{{ t.product }}</span></span>
          </div>
        </div>
      </div>

      <div class="mt-10 text-center">
        <a
          href="https://wa.me/5565996881272?text=Olá! Quero saber mais sobre os produtos da Eleve Imports."
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 rounded-xl bg-green-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-green-400 hover:shadow-lg hover:shadow-green-500/20 active:scale-95"
        >
          <Icon name="ph:whatsapp-logo-fill" class="size-4" />
          Quero ser o próximo cliente satisfeito
        </a>
      </div>
    </div>
  </section>
</template>
