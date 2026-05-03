<script setup lang="ts">
import { useGlobalStore } from '#imports';
const globalStore = useGlobalStore()

const items = ref(['2026', '2027', '2028', '2029', '2030'])
const value = ref(globalStore.year)
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
