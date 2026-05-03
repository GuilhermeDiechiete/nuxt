<script setup lang="ts">
const cards = ref([
  {
    title: 'R$ 4.500,00',
    description: 'Entradas',
    icon: 'i-lucide-smile',
    to: '/docs/getting-started/integrations/color-mode',
    ui: 'bg-primary-50 dark:bg-primary-700/20'
  },
  {
    title: 'R$ 3.000,00',
    description: 'Despesas',
    icon: 'i-lucide-a-large-small',
    to: '/docs/getting-started/integrations/color-mode',
    ui: 'bg-red-50 dark:bg-red-700/20'
  },
  {
    title: 'R$ 800,00',
    description: 'Investimentos',
    icon: 'i-lucide-sun-moon',
    to: '/docs/getting-started/integrations/color-mode',
    ui: 'bg-yellow-50 dark:bg-yellow-600/20'
    
  },
  {
    title: 'R$ 800,00',
    description: 'Investimentos',
    icon: 'i-lucide-sun-moon',
    to: '/docs/getting-started/integrations/color-mode',
    ui: 'bg-yellow-50 dark:bg-yellow-600/20'
    
  }
])
</script>

<template>
  <UPageGrid>
    <UPageCard
      v-for="(card, index) in cards"
      :key="index"
      v-bind="card"
        :ui="{
    root: card.ui
  }"
    />
  </UPageGrid>
</template>

