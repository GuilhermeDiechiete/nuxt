<script setup lang="ts">
const items = ref(['2025', '2026', '2027', '2028'])
const value = ref('2025')
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
    class="w-48"
  />
</template>
