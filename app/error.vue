<script setup lang="ts">
interface Props {
  error: {
    statusCode: number
    statusMessage: string
    message: string
  }
}

const props = defineProps<Props>()

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="gradient-dark min-h-screen flex items-center justify-center px-4">
    <div class="text-center max-w-lg">
      <p class="text-8xl font-bold gradient-gold-text mb-4">
        {{ props.error.statusCode }}
      </p>
      <h1 class="font-display text-3xl font-bold text-white mb-4">
        {{ props.error.statusCode === 404 ? 'Página não encontrada' : 'Algo deu errado' }}
      </h1>
      <p class="text-white/50 mb-10">
        {{
          props.error.statusCode === 404
            ? 'A página que você buscou não existe ou foi movida.'
            : 'Ocorreu um erro inesperado. Tente novamente em breve.'
        }}
      </p>
      <div class="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <UiButton size="lg" variant="primary" @click="handleError">
          <Icon name="ph:house" class="size-5" />
          Voltar ao início
        </UiButton>
        <UiButton to="/catalogo" size="lg" variant="outline">
          Ver catálogo
        </UiButton>
      </div>
    </div>
  </div>
</template>
