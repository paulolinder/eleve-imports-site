<script setup lang="ts">
interface Props {
  variant?: 'gold' | 'green' | 'red' | 'dark' | 'new'
}

withDefaults(defineProps<Props>(), { variant: 'gold' })

const variantClasses: Record<string, string> = {
  gold: 'bg-gold-500/10 text-gold-400 border border-gold-500/20',
  green: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  red: 'bg-red-500/10 text-red-400 border border-red-500/20',
  dark: 'bg-dark-500/80 text-white/70 border border-white/10',
  new: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
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
