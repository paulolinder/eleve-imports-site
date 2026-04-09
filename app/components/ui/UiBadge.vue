<script setup lang="ts">
interface Props {
  variant?: 'gold' | 'green' | 'red' | 'dark' | 'new'
}

withDefaults(defineProps<Props>(), { variant: 'gold' })

const variantClasses: Record<string, string> = {
  gold: 'bg-gold-100 text-gold-800 border border-gold-200',
  green: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  red: 'bg-red-100 text-red-700 border border-red-200',
  dark: 'bg-dark-500/80 text-white/90 border border-white/10',
  new: 'bg-blue-100 text-blue-700 border border-blue-200',
}
</script>

<template>
  <span
    class="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold"
    :class="variantClasses[variant]"
  >
    <slot />
  </span>
</template>
