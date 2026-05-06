<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useTransactionStore, useGlobalStore } from '#imports'

const transactionStore = useTransactionStore()
const globalStore = useGlobalStore()

/**
 * Resumo dinâmico (mês ou ano)
 */
const summary = computed(() => {
  const month = Number(globalStore.month)
  const option = globalStore.summaryOption

  return {
    inputs:
      option === 'year'
        ? transactionStore.TotalInputsSum
        : transactionStore.TotalInputs[month] || 0,

    outputs:
      option === 'year'
        ? transactionStore.TotalOutputsSum
        : transactionStore.TotalOutputs[month] || 0,

    investments: 0 // se adicionar depois, segue o mesmo padrão
  }
})

/**
 * Saldo
 */
const balance = computed(() => {
  return summary.value.inputs - summary.value.outputs - summary.value.investments
})

/**
 * Formatação moeda
 */
function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

/**
 * Cards
 */
const cards = computed(() => [
  {
    title: formatCurrency(summary.value.inputs),
    description:
      globalStore.summaryOption === 'year' ? 'Entradas (Ano)' : 'Entradas',
    icon: 'i-lucide-trending-up',
    ui: 'bg-primary-50 dark:bg-primary-700/20'
  },
  {
    title: formatCurrency(summary.value.outputs),
    description:
      globalStore.summaryOption === 'year' ? 'Despesas (Ano)' : 'Despesas',
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
    description:
      globalStore.summaryOption === 'year' ? 'Saldo (Ano)' : 'Saldo',
    icon: 'i-lucide-wallet',
    ui: 'bg-green-50 dark:bg-green-700/20'
  }
])

/**
 * Carregar dados
 */
onMounted(async () => {
  await transactionStore.fetchTotalTransactions()
})

/**
 * Atualizar quando mudar mês/ano/opção
 */
watch(
  () => [globalStore.month, globalStore.year, globalStore.summaryOption],
  async () => {
    await transactionStore.fetchTotalTransactions()
  }
)
</script>

<template>
  <UPageGrid class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <UPageCard
      v-for="(card, index) in cards"
      :key="index"
      v-bind="card"
      :ui="{ root: card.ui }"
    />
  </UPageGrid>
</template>
