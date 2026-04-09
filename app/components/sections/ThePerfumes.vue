<script setup lang="ts">
const perfumes = [
  {
    name: 'Lattafa Musamam',
    volume: '100ml',
    origin: 'Emirados Árabes',
    brand: 'Lattafa',
    type: 'Unissex',
    notes: ['Açafrão', 'Mandarina', 'Lavanda', 'Cedro', 'Incenso'],
    description: 'Fragrância amadeirada e aromática unissex. Açafrão, cedro e incenso criam uma aura sofisticada e marcante.',
    image: 'https://lattafa.com/wp-content/uploads/2024/05/3-118.jpg',
    badge: 'Premium',
    badgeStyle: 'gold',
    waMessage: 'Olá! Tenho interesse no perfume Lattafa Musamam 100ml. Pode me passar disponibilidade e valor?',
  },
  {
    name: 'Lattafa Yara Moi',
    volume: '100ml',
    origin: 'Emirados Árabes',
    brand: 'Lattafa',
    type: 'Feminino',
    notes: ['Pêssego', 'Abacaxi', 'Rosa', 'Freesia', 'Patchouli'],
    description: 'Versão gourmand e floral do Yara. Notas de pêssego e rosa com base almiscarada irresistível.',
    image: 'https://www.lattafa-usa.com/cdn/shop/files/Yara-Moi-1_81ec2a74-066f-45ef-b35a-465dfda22eac.png?v=1747422182',
    badge: null,
    badgeStyle: null,
    waMessage: 'Olá! Tenho interesse no perfume Lattafa Yara Moi 100ml. Pode me passar disponibilidade e valor?',
  },
  {
    name: 'Lattafa Yara Elixir',
    volume: '100ml',
    origin: 'Emirados Árabes',
    brand: 'Lattafa',
    type: 'Feminino',
    notes: ['Frutas Vermelhas', 'Orquídea', 'Baunilha', 'Âmbar', 'Musk'],
    description: 'A versão mais intensa e sensual da linha Yara. Notas profundas de orquídea e baunilha com toque ambarado.',
    image: 'https://www.lattafa-usa.com/cdn/shop/files/YaraElixirBottle.png?v=1760805808',
    badge: 'Novo',
    badgeStyle: 'blue',
    waMessage: 'Olá! Tenho interesse no perfume Lattafa Yara Elixir 100ml. Pode me passar disponibilidade e valor?',
  },
  {
    name: 'Lattafa Yara',
    volume: '100ml',
    origin: 'Emirados Árabes',
    brand: 'Lattafa',
    type: 'Feminino',
    notes: ['Mandarina', 'Maçã Verde', 'Jasmim', 'Musk', 'Baunilha'],
    description: 'Fragrância feminina sofisticada com frutas cítricas e florais delicados. Sillage marcante e duração excepcional.',
    image: 'https://lattafa.com/wp-content/uploads/2024/05/2-78.jpg',
    badge: 'Mais pedido',
    badgeStyle: 'gold',
    waMessage: 'Olá! Tenho interesse no perfume Lattafa Yara 100ml. Pode me passar disponibilidade e valor?',
  },
  {
    name: 'Mawwal Basir',
    volume: '100ml',
    origin: 'Árabe',
    brand: 'Mawwal Arabia',
    type: 'Unissex',
    notes: ['Flor de Laranjeira', 'Jasmim', 'Tuberosa', 'Cacau', 'Tabaco'],
    description: 'Oriental floral unissex com flor de laranjeira, tuberosa e cacau. Sofisticado e envolvente.',
    image: 'https://mawwal.com.br/cdn/shop/files/BASIR_4dc8b678-d55e-430a-b43b-91459ba3d3eb.png?v=1758025193',
    badge: null,
    badgeStyle: null,
    waMessage: 'Olá! Tenho interesse no perfume Mawwal Basir 100ml. Pode me passar disponibilidade e valor?',
  },
  {
    name: 'Britney Spears Fantasy',
    volume: '100ml',
    origin: 'EUA',
    brand: 'Britney Spears',
    type: 'Feminino',
    notes: ['Lichia', 'Kiwi', 'Jasmim', 'Chocolate Branco', 'Musk'],
    description: 'Fragrância feminina icônica com mix de frutas e chocolate branco. Doce, envolvente e inesquecível.',
    image: 'https://luxuryperfume.com/cdn/shop/products/9428_c62b4591-3118-41fc-a294-e66675b21718.jpg?v=1757443720',
    badge: null,
    badgeStyle: null,
    waMessage: 'Olá! Tenho interesse no perfume Britney Spears Fantasy 100ml. Pode me passar disponibilidade e valor?',
  },
  {
    name: '212 VIP Rosé Elixir',
    volume: '80ml',
    origin: 'Espanha',
    brand: 'Carolina Herrera',
    type: 'Feminino',
    notes: ['Lichia', 'Cassis', 'Rosa', 'Flor de Pêssego', 'Baunilha'],
    description: 'Interpretação mais intensa do 212 VIP Rosé. Frasco rosa degradê com glitter. Sensual e sofisticada.',
    image: 'https://www.scentsangel.com/cdn/shop/files/1_e0190163-c25a-4f0c-99d1-e10284da2b74.png?v=1772159808',
    badge: 'Exclusivo',
    badgeStyle: 'gold',
    waMessage: 'Olá! Tenho interesse no perfume Carolina Herrera 212 VIP Rosé Elixir 80ml. Pode me passar disponibilidade e valor?',
  },
  {
    name: 'Club de Nuit Imperiale',
    volume: '105ml',
    origin: 'Emirados Árabes',
    brand: 'Armaf',
    type: 'Feminino',
    notes: ['Lichia', 'Bergamota', 'Rosa Turca', 'Baunilha', 'Cashmeran'],
    description: 'Elegante e duradoura com rosa turca e baunilha. Apresentação luxuosa e performance impressionante.',
    image: 'https://armaf.com/cdn/shop/files/CDN_Imperiale_105ml_bottle.jpg?v=1759963186&width=1000',
    badge: null,
    badgeStyle: null,
    waMessage: 'Olá! Tenho interesse no perfume Armaf Club de Nuit Imperiale 105ml. Pode me passar disponibilidade e valor?',
  },
  {
    name: 'Sabah Al Ward Sugar',
    volume: '100ml',
    origin: 'Árabe',
    brand: 'Al Wataniah',
    type: 'Feminino',
    notes: ['Rosa', 'Cítricos', 'Açúcar', 'Musk', 'Baunilha'],
    description: 'Floral doce e feminina com notas de rosa e açúcar. Suave, romântica e com duração surpreendente.',
    image: 'https://smellsplus.com/cdn/shop/files/al-wataniah-sabah-al-ward-sugar-100ml-perfume-pink-4225909.png?v=1759178542',
    badge: null,
    badgeStyle: null,
    waMessage: 'Olá! Tenho interesse no perfume Al Wataniah Sabah Al Ward Sugar 100ml. Pode me passar disponibilidade e valor?',
  },
]
</script>

<template>
  <section
    id="perfumes"
    class="section-padding relative overflow-hidden"
    :style="`background: var(--bg-secondary)`"
    aria-labelledby="perfumes-heading"
  >
    <div class="container-site relative z-10">
      <!-- Heading -->
      <div class="mb-14 text-center">
        <span
          class="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4"
          :style="`background: var(--chip-bg); border: 1px solid var(--chip-border)`"
        >
          <Icon name="ph:drop" class="size-4 text-gold-600" />
          <span class="text-xs font-medium tracking-wider uppercase" :style="`color: var(--text-secondary)`">Perfumaria Premium</span>
        </span>
        <h2 id="perfumes-heading" class="font-display text-3xl font-bold sm:text-4xl lg:text-5xl" :style="`color: var(--text-primary)`">
          Fragrâncias
          <span class="gradient-gold-text">exclusivas</span>
          <br class="hidden sm:block" />
          e importadas.
        </h2>
        <p class="mt-4 text-base max-w-xl mx-auto" :style="`color: var(--text-secondary)`">
          Lattafa, Armaf, Carolina Herrera e mais. Perfumes originais com
          longa duração e sillage marcante.
        </p>
      </div>

      <!-- Grid de perfumes -->
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="perfume in perfumes"
          :key="perfume.name"
          class="group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1"
          :style="`background: var(--bg-card); border: 1px solid var(--border-primary); box-shadow: var(--shadow-sm)`"
        >
          <!-- Badge -->
          <div v-if="perfume.badge" class="absolute left-3 top-3 z-10">
            <span
              v-if="perfume.badgeStyle === 'gold'"
              class="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold"
              style="background: rgba(184,134,11,0.15); color: rgb(133,88,0); border: 1px solid rgba(184,134,11,0.25)"
            >
              <Icon name="ph:sparkle" class="size-2.5" />
              {{ perfume.badge }}
            </span>
            <span
              v-else-if="perfume.badgeStyle === 'blue'"
              class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold"
              style="background: rgba(59,130,246,0.15); color: rgb(59,130,246); border: 1px solid rgba(59,130,246,0.25)"
            >
              {{ perfume.badge }}
            </span>
          </div>

          <!-- Tipo (fem/uni) -->
          <div class="absolute right-3 top-3 z-10">
            <span
              class="rounded-full px-2 py-0.5 text-xs font-medium"
              :style="`background: var(--badge-bg); color: var(--badge-text); border: 1px solid var(--badge-border); backdrop-filter: blur(4px);`"
            >
              {{ perfume.type }}
            </span>
          </div>

          <!-- Imagem -->
          <div
            class="aspect-[4/5] overflow-hidden flex items-center justify-center p-8"
            :style="`background: var(--card-img-bg)`"
          >
            <img
              :src="perfume.image"
              :alt="perfume.name"
              class="max-h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              width="400"
              height="500"
            />
          </div>

          <!-- Info -->
          <div class="flex flex-col flex-1 p-5">
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs font-medium text-gold-600">{{ perfume.volume }} · {{ perfume.origin }}</span>
              <span class="text-xs" :style="`color: var(--text-tertiary)`">{{ perfume.brand }}</span>
            </div>
            <h3 class="font-semibold text-lg mb-2 leading-tight" :style="`color: var(--text-primary)`">{{ perfume.name }}</h3>
            <p class="text-sm leading-relaxed mb-3 line-clamp-2" :style="`color: var(--text-secondary)`">{{ perfume.description }}</p>

            <!-- Notas olfativas -->
            <div class="flex flex-wrap gap-1.5 mb-4">
              <span
                v-for="note in perfume.notes"
                :key="note"
                class="rounded-full px-2.5 py-0.5 text-xs"
                :style="`background: var(--note-bg); color: var(--note-text); border: 1px solid var(--note-border)`"
              >
                {{ note }}
              </span>
            </div>

            <!-- CTA -->
            <a
              :href="`https://wa.me/5565996881272?text=${encodeURIComponent(perfume.waMessage)}`"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`Tenho interesse no ${perfume.name} ${perfume.volume}`"
              class="mt-auto flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-green-400 hover:shadow-lg hover:shadow-green-500/20 active:scale-95"
            >
              <Icon name="ph:whatsapp-logo-fill" class="size-4" />
              Tenho interesse
            </a>
          </div>
        </article>
      </div>

    </div>
  </section>
</template>
