<script setup lang="ts">
import { useGlobalStore } from '#imports';
const globalStore = useGlobalStore()

const items = [
      { label: 'Janeiro', value: 1 },
      { label: 'Fevereiro', value: 2 },
      { label: 'Março', value: 3 },
      { label: 'Abril', value: 4 },
      { label: 'Maio', value: 5 },
      { label: 'Junho', value: 6 },
      { label: 'Julho', value: 7 },
      { label: 'Agosto', value: 8 },
      { label: 'Setembro', value: 9 },
      { label: 'Outubro', value: 10 },
      { label: 'Novembro', value: 11 },
      { label: 'Dezembro', value: 12 }
    ]

const value = ref(globalStore.month)
</script>

<template>
  <USelect
    v-model="value"
    :content="{
      align: 'center',
      side: 'bottom',
      sideOffset: 8
    }"
    :items="items"
    class="min-w-24"
  />
</template>
