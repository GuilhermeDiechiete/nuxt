<script setup lang="ts">
import { ref, watch } from 'vue'
import { useGlobalStore } from '#imports';

const globalStore = useGlobalStore()

// estado do select
const value = ref(globalStore.year)

// quando mudar, atualiza o store
watch(value, (newValue) => {
  globalStore.year = newValue
})
const items = [2026, 2027, 2028, 2029, 2030]

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
