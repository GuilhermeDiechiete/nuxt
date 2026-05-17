<script setup lang="ts">
import { useReportStore, useGlobalStore } from '#imports';
import CategoryTableOutputsSummary from '../tables/CategoryTableOutputsSummary.vue';

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
  <div class="space-y-2">
    <!-- HEADER -->
    <UCard class="border border-gray-800 bg-gray-900">
      <div class="flex items-center justify-between">

        <div class="flex items-center">
          <p class="text-primary mr-2"> Entradas: Receitas</p>
          <YearSelected />
        </div>
    
        <div class="flex items-center gap-4">
            <p class="italic text-primary">
            Fixas: {{  formatCurrency(reportStore.totalInputsFixedYear) }}
            </p>
            <p class="italic text-primary">
            Variavel: {{  formatCurrency(reportStore.totalInputsVariableYear) }}
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
    <UCard class="border border-gray-800 bg-gray-900">
      <div class="flex items-center justify-between">

        <div class="flex items-center">
          <p class="font-semibold text-error mr-2"> Despesas</p>
          <YearSelected />
        </div>

        <div class="flex items-center gap-4">
          <p class="italic text-error">
            Fixas: {{  formatCurrency(reportStore.totalOutputsFixedYear) }}
            </p>
            <p class="italic text-error">
            Variavel: {{  formatCurrency(reportStore.totalOutputsVariableYear) }}
          </p>
     
        </div>

        <div class="flex items-center gap-4">
          <p class="italic text-error">
            Total: {{ formatCurrency(reportStore.totalOutputsYear) }}
          </p>
        </div>
      </div>
    </UCard>

    <CategoryTableOutputsSummary />
   

  </div>

</template>