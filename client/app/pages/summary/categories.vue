<script setup lang="ts">
import { useReportStore, useGlobalStore } from '#imports';
import CategoryTableOutputsSummary from '~/components/tables/CategoryTableOutputsSummary.vue';

const reportStore = useReportStore()
const globalStore = useGlobalStore()

onMounted(async () => {
  await reportStore.fetchReports()
})

watch(
  () => [globalStore.year],
  async () => {
    await reportStore.fetchReports()
  }
)


const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value || 0)
}
</script>
<template>
  <UPageCard>
    <div>
      <UIcon name="i-lucide-chart-column" class="text-primary mr-2" />
      <span class="font-semibold italic mr-4 text-gray-400">
        Categorias
      </span>
      <YearSelected />
      <UButton class="ml-4" variant="soft" color="warning">Emitir PDF</UButton>
    </div>
    <!-- HEADER -->
    <UCard class="border border-gray-800 bg-gray-900" :ui="{ body: 'p-2 sm:p-2' }">
      <div class="flex items-center justify-between">

      <div class="flex items-center">
        <p class="flex items-center gap-1 italic text-green-400">
          <UIcon name="i-lucide-arrow-up" class="text-green-400" />
          Entradas
        </p>
      </div>
    
        <div class="flex items-center gap-4">
            <p class="italic text-gray-400">
            Fixas: <span class="text-green-400">{{  formatCurrency(reportStore.totalInputsFixedYear) }}</span>
            </p>
            <p class="italic text-gray-400">
            Variavel: <span class="text-green-400">{{  formatCurrency(reportStore.totalInputsVariableYear) }}</span>
          </p>
     
        </div>
        <div class="flex items-center gap-4">
     
          <p class="italic text-primary">
            Total: {{ formatCurrency(reportStore.totalInputsYear) }}
          </p>
        </div>
      </div>
    </UCard>
    <CategoryTableInputsSummary />
    
    <!-- HEADER -->
    <UCard class="border border-gray-800 bg-gray-900 mt-10" :ui="{ body: 'p-2 sm:p-2' }">
      <div class="flex items-center justify-between">

    <div class="flex items-center">
      <p class="flex items-center gap-1 italic text-red-400">
        <UIcon name="i-lucide-arrow-down" class="text-red-400" />
        Saídas
      </p>
    </div>

        <div class="flex items-center gap-4">
          <p class="italic text-gray-400">
            Fixo a.a: <span class="text-red-400">{{  formatCurrency(reportStore.totalOutputsFixedYear) }}</span>
            </p>
            <p class="italic text-gray-400">
            Variaáveis a.a: <span class="text-red-400">{{  formatCurrency(reportStore.totalOutputsVariableYear) }}</span>
          </p>
     
        </div>

        <div class="flex items-center gap-4">
          <p class="italic text-error">
            {{ formatCurrency(reportStore.totalOutputsYear) }}
          </p>
        </div>
      </div>
    </UCard>

    <CategoryTableOutputsSummary />
  </UPageCard>
</template>