<script setup lang="ts">
import { useGlobalStore } from '#imports'

const globalStore = useGlobalStore()

const options = [
  { label: 'Mês', value: 'month' },
  { label: 'Ano', value: 'year' }
]
</script>

<template>
  <div>
    <USelect
      v-model="globalStore.summaryOption"
      :items="options"
    />
  </div>
</template>