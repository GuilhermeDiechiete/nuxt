<script setup lang="ts">
import { ref, watch } from 'vue'
import { useGlobalStore } from '#imports'

const globalStore = useGlobalStore()

// 🔥 estado do select
const value = ref(globalStore.month)

// 🔥 quando mudar, atualiza o store
watch(value, (newValue) => {
  globalStore.month = newValue
})

// opções
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
</script>

<template>
  <USelect
    v-model="value"
    :items="items"
    class="min-w-24"
  />
</template>
