<script setup lang="ts">
import { onMounted, watch } from 'vue'
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

// FORMAT
const formatCurrency = (
  value: number
) => {

  return new Intl.NumberFormat(
    'pt-BR',
    {
      style: 'currency',
      currency: 'BRL'
    }
  ).format(value || 0)
}
</script>

<template>

  <UPageCard
    title="Resumo de Categorias"
    description="Maiores movimentações por categoria"
    icon="i-lucide-bar-chart-3">

    <!-- YEAR -->
    <div
      v-if="globalStore.summaryOption === 'year'"
      class="flex flex-col gap-4 mt-4 text-sm">

      <!-- BIGGEST OUTPUT YEAR -->
      <div class="flex justify-between items-center">

        <span class="text-muted">
          Maior saída (A.A)
        </span>

        <span class="font-medium text-error">

          {{
            reportStore.topCategories
              ?.outputs
              ?.year
              ?.category_name
          }} :

          {{
            formatCurrency(
              reportStore.topCategories
                ?.outputs
                ?.year
                ?.totalYear || 0
            )
          }}
        </span>
      </div>

      <!-- BIGGEST INPUT YEAR -->
      <div class="flex justify-between items-center">

        <span class="text-muted">
          Maior entrada (A.A)
        </span>

        <span class="font-medium text-success">

          {{
            reportStore.topCategories
              ?.inputs
              ?.year
              ?.category_name
          }} :

          {{
            formatCurrency(
              reportStore.topCategories
                ?.inputs
                ?.year
                ?.totalYear || 0
            )
          }}
        </span>
      </div>
    </div>

    <!-- MONTH -->
    <div
      v-if="globalStore.summaryOption === 'month'"
      class="flex flex-col gap-4 mt-4 text-sm">

      <!-- BIGGEST OUTPUT MONTH -->
      <div class="flex justify-between items-center">

        <span class="text-muted">
          Maior saída (A.M)
        </span>

        <span class="font-medium text-error">

          {{
            reportStore.topCategories
              ?.outputs
              ?.month
              ?.category_name
          }} :

          {{
            formatCurrency(
              reportStore.topCategories
                ?.outputs
                ?.month
                ?.totalMonth || 0
            )
          }}
        </span>
      </div>

      <!-- BIGGEST INPUT MONTH -->
      <div class="flex justify-between items-center">

        <span class="text-muted">
          Maior entrada (A.M)
        </span>

        <span class="font-medium text-success">

          {{
            reportStore.topCategories
              ?.inputs
              ?.month
              ?.category_name
          }} :

          {{
            formatCurrency(
              reportStore.topCategories
                ?.inputs
                ?.month
                ?.totalMonth || 0
            )
          }}
        </span>
      </div>
    </div>

    <UButton
      to="/summary/categories"
      class="justify-center mt-4"
      color="primary"
      variant="soft">

      Resumo Completo
    </UButton>

  </UPageCard>

</template>


