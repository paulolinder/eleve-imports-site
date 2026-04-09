<script setup lang="ts">
const iphones = [
  {
    name: 'iPhone 16 Pro Max',
    storage: '256GB',
    color: 'Desert Titanium',
    highlights: ['Chip A18 Pro', 'Câmera 48MP', 'Tela 6.9"', 'USB-C'],
    differentials: ['Desbloqueado para qualquer operadora', 'Face ID + Dynamic Island', 'Garantia Apple 12 meses', 'Bateria de longa duração'],
    image: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=600&h=750&fit=crop&q=85',
    badge: 'Mais vendido',
    badgeStyle: 'gold',
    stock: { label: 'Última unidade', style: 'red' },
    waMessage: 'Olá! Tenho interesse no iPhone 16 Pro Max 256GB. Pode me passar disponibilidade e valor?',
  },
  {
    name: 'iPhone 16',
    storage: '128GB',
    color: 'Preto',
    highlights: ['Chip A18', 'Câmera 48MP', 'Tela 6.1"', 'USB-C'],
    differentials: ['Desbloqueado para qualquer operadora', 'Camera Control exclusivo', 'Garantia Apple 12 meses', 'iOS atualizado'],
    image: 'https://images.unsplash.com/photo-1632633173522-47456de71b76?w=600&h=750&fit=crop&q=85',
    badge: 'Novo',
    badgeStyle: 'blue',
    stock: { label: '2 unidades', style: 'amber' },
    waMessage: 'Olá! Tenho interesse no iPhone 16 128GB. Pode me passar disponibilidade e valor?',
  },
  {
    name: 'iPhone 15 Pro',
    storage: '256GB',
    color: 'Titânio Natural',
    highlights: ['Chip A17 Pro', 'Dynamic Island', 'Tela 6.1"', 'USB-C'],
    differentials: ['Desbloqueado para qualquer operadora', 'Titânio — mais leve e resistente', 'Garantia Apple 12 meses', 'ProRAW e ProRes'],
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=750&fit=crop&q=85',
    badge: null,
    badgeStyle: null,
    stock: { label: 'Pronta entrega', style: 'green' },
    waMessage: 'Olá! Tenho interesse no iPhone 15 Pro 256GB. Pode me passar disponibilidade e valor?',
  },
]
</script>

<template>
  <section
    id="iphones"
    class="section-padding relative overflow-hidden"
    :style="`background: var(--bg-primary)`"
    aria-labelledby="iphones-heading"
  >
    <div class="container-site relative z-10">
      <div class="mb-14 text-center">
        <span
          class="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4"
          :style="`background: var(--chip-bg); border: 1px solid var(--chip-border)`"
        >
          <Icon name="ph:device-mobile" class="size-4" :style="`color: var(--text-primary)`" />
          <span class="text-xs font-medium tracking-wider uppercase" :style="`color: var(--text-secondary)`">Apple — 100% Originais</span>
        </span>
        <h2 id="iphones-heading" class="font-display text-3xl font-bold sm:text-4xl lg:text-5xl" :style="`color: var(--text-primary)`">
          iPhones
          <span class="gradient-gold-text">desbloqueados</span>
          <br class="hidden sm:block" />
          com garantia Apple.
        </h2>
        <p class="mt-4 text-base max-w-xl mx-auto" :style="`color: var(--text-secondary)`">
          Importados direto, nota fiscal inclusa. Funcionam em qualquer operadora
          do Brasil — Claro, Vivo, TIM, Oi.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="phone in iphones"
          :key="phone.name"
          class="group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1"
          :style="`background: var(--bg-card); border: 1px solid var(--border-primary); box-shadow: var(--shadow-sm)`"
        >
          <div v-if="phone.badge" class="absolute left-3 top-3 z-10">
            <span
              v-if="phone.badgeStyle === 'gold'"
              class="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold"
              style="background: rgba(184,134,11,0.12); color: rgb(184,134,11); border: 1px solid rgba(184,134,11,0.2)"
            >
              <Icon name="ph:star-fill" class="size-2.5" />{{ phone.badge }}
            </span>
            <span
              v-else-if="phone.badgeStyle === 'blue'"
              class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold"
              style="background: rgba(59,130,246,0.1); color: rgb(59,130,246); border: 1px solid rgba(59,130,246,0.2)"
            >
              {{ phone.badge }}
            </span>
          </div>

          <div class="absolute right-3 top-3 z-10">
            <span
              v-if="phone.stock.style === 'red'"
              class="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold"
              style="background: rgba(239,68,68,0.1); color: rgb(220,38,38); border: 1px solid rgba(239,68,68,0.2)"
            >
              <span class="size-1.5 rounded-full animate-pulse" style="background: rgb(239,68,68)" />
              {{ phone.stock.label }}
            </span>
            <span
              v-else-if="phone.stock.style === 'amber'"
              class="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold"
              style="background: rgba(245,158,11,0.1); color: rgb(180,83,9); border: 1px solid rgba(245,158,11,0.2)"
            >
              <span class="size-1.5 rounded-full animate-pulse" style="background: rgb(245,158,11)" />
              {{ phone.stock.label }}
            </span>
            <span
              v-else-if="phone.stock.style === 'green'"
              class="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold"
              style="background: rgba(34,197,94,0.1); color: rgb(21,128,61); border: 1px solid rgba(34,197,94,0.2)"
            >
              <span class="size-1.5 rounded-full" style="background: rgb(34,197,94)" />
              {{ phone.stock.label }}
            </span>
          </div>

          <div class="aspect-[4/5] overflow-hidden" :style="`background: var(--card-img-bg)`">
            <img :src="phone.image" :alt="phone.name" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" width="400" height="500" />
          </div>

          <div class="flex flex-col flex-1 p-5">
            <span class="text-xs font-medium mb-1 text-gold-600">{{ phone.storage }} · {{ phone.color }}</span>
            <h3 class="font-semibold text-lg mb-3 leading-tight" :style="`color: var(--text-primary)`">{{ phone.name }}</h3>

            <div class="flex flex-wrap gap-1.5 mb-4">
              <span
                v-for="h in phone.highlights"
                :key="h"
                class="rounded-full px-2.5 py-0.5 text-xs"
                :style="`background: var(--spec-bg); color: var(--spec-text); border: 1px solid var(--spec-border)`"
              >
                {{ h }}
              </span>
            </div>

            <ul class="flex flex-col gap-1.5 mb-5">
              <li v-for="d in phone.differentials" :key="d" class="flex items-start gap-2 text-xs" :style="`color: var(--text-secondary)`">
                <Icon name="ph:check" class="size-3.5 text-green-500 shrink-0 mt-0.5" />
                {{ d }}
              </li>
            </ul>

            <a
              :href="`https://wa.me/5565996881272?text=${encodeURIComponent(phone.waMessage)}`"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-auto flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-green-400 hover:shadow-lg hover:shadow-green-500/20 active:scale-95"
            >
              <Icon name="ph:whatsapp-logo-fill" class="size-4" />
              Tenho interesse
            </a>
          </div>
        </article>
      </div>

      <p class="mt-8 text-center text-sm" :style="`color: var(--text-tertiary)`">
        <Icon name="ph:info" class="size-3.5 inline -mt-0.5 mr-1" />
        Estoque limitado. Consulte disponibilidade antes de reservar.
      </p>
    </div>
  </section>
</template>
