<script setup lang="ts">
useSeoMeta({
  titleTemplate: '%s | Eleve Imports',
  ogSiteName: 'Eleve Imports',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <NuxtLoadingIndicator color="#c9a84c" :height="3" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
