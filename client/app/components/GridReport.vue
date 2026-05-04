<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

/**
 * Estado principal (resumo financeiro)
 */
const summary = ref({
  inputs: 0,
  outputs: 0,
  investments: 0
})

/**
 * Saldo (calculado automaticamente)
 */
const balance = computed(() => {
  return summary.value.inputs - summary.value.outputs - summary.value.investments
})

/**
 * Formatação de moeda (BRL)
 */
function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

/**
 * Cards dinâmicos
 */
const cards = computed(() => [
  {
    title: formatCurrency(summary.value.inputs),
    description: 'Entradas',
    icon: 'i-lucide-trending-up',
    ui: 'bg-primary-50 dark:bg-primary-700/20'
  },
  {
    title: formatCurrency(summary.value.outputs),
    description: 'Despesas',
    icon: 'i-lucide-trending-down',
    ui: 'bg-red-50 dark:bg-red-700/20'
  },
  {
    title: formatCurrency(summary.value.investments),
    description: 'Investimentos',
    icon: 'i-lucide-piggy-bank',
    ui: 'bg-yellow-50 dark:bg-yellow-600/20'
  },
  {
    title: formatCurrency(balance.value),
    description: 'Saldo',
    icon: 'i-lucide-wallet',
    ui: 'bg-green-50 dark:bg-green-700/20'
  }
])

/**
 * Simulação de API (substituir pela sua)
 */
async function fetchResumo() {
  // aqui você chama seu backend
  return {
    inputs: 4500,
    outputs: 3000,
    investments: 800
  }
}

/**
 * Carregar dados ao abrir a página
 */
onMounted(async () => {
  const data = await fetchResumo()

  summary.value = {
    inputs: data.inputs,
    outputs: data.outputs,
    investments: data.investments
  }
})
</script>

<template>
  <UPageGrid class="gap-4">
    <UPageCard
      v-for="(card, index) in cards"
      :key="index"
      v-bind="card"
      :ui="{ root: card.ui }"
    />
  </UPageGrid>
</template>
