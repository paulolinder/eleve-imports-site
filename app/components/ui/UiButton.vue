<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  as?: 'button' | 'a' | 'NuxtLink'
  href?: string
  to?: string
  disabled?: boolean
  loading?: boolean
  external?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  as: 'button',
})

const variantClasses: Record<string, string> = {
  primary:
    'bg-gold-500 text-dark-500 font-semibold hover:bg-gold-400 hover:shadow-lg hover:shadow-gold-500/25 active:scale-95',
  secondary:
    'bg-dark-500 text-white font-semibold hover:bg-dark-400 border border-white/10 hover:border-white/20',
  ghost: 'text-white/70 hover:text-white hover:bg-white/5',
  outline:
    'border border-gold-500/50 text-gold-400 hover:border-gold-500 hover:bg-gold-500/5',
}

const sizeClasses: Record<string, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-lg gap-1.5',
  md: 'px-5 py-2.5 text-sm rounded-lg gap-2',
  lg: 'px-7 py-3.5 text-base rounded-xl gap-2.5',
}

const baseClasses =
  'inline-flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 disabled:opacity-50 disabled:pointer-events-none'

const classes = computed(
  () => `${baseClasses} ${variantClasses[props.variant]} ${sizeClasses[props.size]}`,
)

const tag = computed(() => {
  if (props.to) return resolveComponent('NuxtLink')
  if (props.href) return 'a'
  return 'button'
})
</script>

<template>
  <component
    :is="tag"
    :class="classes"
    :href="href"
    :to="to"
    :disabled="disabled || loading"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
  >
    <Icon v-if="loading" name="ph:spinner" class="animate-spin" />
    <slot />
  </component>
</template>
