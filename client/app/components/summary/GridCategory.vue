<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useReportStore, useGlobalStore } from '#imports'

const reportStore = useReportStore()
const globalStore = useGlobalStore()

onMounted(async () => {
  await reportStore.fetchReports()
})

watch(
  () => [
    globalStore.month,
    globalStore.year,
    globalStore.summaryOption
  ],

  async () => {
    await reportStore.fetchReports()
  }
)

// SUMMARY
const summary = computed(() => {
  if (globalStore.summaryOption === 'year') {

    return reportStore.ranking?.year || {
      categoryName: '-',
      total: 0
    }
  }
  const currentMonth =
    reportStore.ranking?.months?.find(
      (month: any) =>
        month.month === globalStore.month
    )

  return currentMonth || {
    categoryName: '-',
    total: 0
  }
})

// FORMAT
const formatCurrency = (
  value: number
) => {

  return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value || 0)}

</script>

<template>

  <UPageCard title="Resumo de Categorias" 
  description="Maiores movimentações por categoria"
  icon="i-lucide-bar-chart-3">

    <div class="flex flex-col gap-4 mt-4 text-sm">
      <div class="flex justify-between items-center">
        <span class="text-muted">
          {{
            globalStore.summaryOption === 'year'
              ? 'Maior Gasto (ano)'
              : 'Maior Gasto (mês)'
          }}
        </span>
        <span class="font-medium text-error">
          {{
            summary.categoryName
          }}:
          {{
            formatCurrency(
              summary.total
            )
          }}
        </span>
      </div>

      <UButton
        to="/summary/categories"
        class="justify-center"
        color="primary"
        variant="soft"> Resumo Completo
      </UButton>
    </div>
  </UPageCard>
</template>


