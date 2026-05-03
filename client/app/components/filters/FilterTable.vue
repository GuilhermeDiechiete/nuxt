<script setup lang="ts">
const model = defineModel<string>({ default: '' })
</script>

<template>
  <UInput
    v-model="model"
    placeholder="Pesquisar..."
    icon="i-lucide-search"
  />
</template>