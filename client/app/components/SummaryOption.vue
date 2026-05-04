<script setup lang="ts">
const option = ref<'month' | 'year'>('month')

const options = [
  { label: 'Mês', value: 'month' },
  { label: 'Ano', value: 'year' }
]
</script>

<template>
  <div>
    <USelect
      v-model="option"
      :items="options"
    />
  </div>
</template>