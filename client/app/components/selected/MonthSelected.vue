<script setup lang="ts">
const items = ref(['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maaio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'])
const value = ref('Abril')
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
