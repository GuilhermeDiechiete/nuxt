<script setup lang="ts">
import { useGlobalStore } from '#imports';
const globalStore = useGlobalStore()

defineProps<{
  title: string
}>()
</script>

<template>
  <div class="flex items-center gap-2">

    <Favicon />

    <span>
      {{ title }} >
      {{ globalStore.navegation === 'outputs' ? 'Despesas' : 'Receitas' }}
    </span>

  </div>
</template>