<script setup lang="ts">
import { ref, computed, resolveComponent, h, onMounted } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import { useTransactionStore } from '#imports'

const transactionStore = useTransactionStore()

const UButton = resolveComponent('UButton')

onMounted(async () => {
  await transactionStore.fetchCategorySummary()
})

// pegar a categoria que mais gastou 
const highestCategoryId = computed(() => {
  if (!data.value.length) return null

  return data.value.reduce((highest: any, current: any) => {
    return current.yearTotal > highest.yearTotal
      ? current
      : highest
  }).categoryId
})

const expandedCategories = ref<Record<number, boolean>>({})
const expandedMonths = ref<Record<string, boolean>>({})

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value || 0)
}

const monthNames: Record<number, string> = {
  1: 'Janeiro',
  2: 'Fevereiro',
  3: 'Março',
  4: 'Abril',
  5: 'Maio',
  6: 'Junho',
  7: 'Julho',
  8: 'Agosto',
  9: 'Setembro',
  10: 'Outubro',
  11: 'Novembro',
  12: 'Dezembro'
}

const data = computed(() => {
  return transactionStore.OutputsCategories
})
</script>

<template>
  <UCard class="space-y-4">

    <UCard variant="outline">Despesas</UCard>
    <!-- CATEGORIAS -->
    <div
      v-for="category in data"
      :key="category.categoryId"
      class="my-2 overflow-hidden"
    >

      <!-- HEADER CATEGORIA -->

    <div
      class="flex items-center justify-between p-4 cursor-pointer rounded-lg transition-colors"
      :class="
        category.categoryId === highestCategoryId
          ? 'bg-red-100 dark:bg-red-950 border border-red-300 dark:border-red-800'
          : 'bg-gray-100 dark:bg-gray-800'
      "
      @click="
        expandedCategories[category.categoryId] =
          !expandedCategories[category.categoryId]
      "
    >
        <div class="flex items-center gap-2">

          <UButton
            size="xs"
            variant="ghost"
            color="neutral"
            :icon="
              expandedCategories[category.categoryId]
                ? 'i-lucide-chevron-down'
                : 'i-lucide-chevron-right'
            "
          />

          <strong>
            {{ category.categoryName }}
          </strong>
        </div>

        <div class="font-bold">
          {{ formatCurrency(category.yearTotal) }}
        </div>
      </div>

      <!-- MESES -->
      <div
        v-if="expandedCategories[category.categoryId]"
        class="p-4 space-y-3"
      >

        <div
          v-for="month in category.months"
          :key="month.month"
          class="border-b border-gray-200 dark:border-gray-600"
        >

          <!-- HEADER MÊS -->
          <div
            class="flex items-center justify-between p-1 bg-gray-50 dark:bg-gray-900 cursor-pointer"
            @click="
              expandedMonths[
                `${category.categoryId}-${month.month}`
              ] =
              !expandedMonths[
                `${category.categoryId}-${month.month}`
              ]
            "
          >

            <div class="flex items-center gap-2">

              <UButton
                size="xs"
                variant="ghost"
                color="neutral"
                :icon="
                  expandedMonths[
                    `${category.categoryId}-${month.month}`
                  ]
                    ? 'i-lucide-chevron-down'
                    : 'i-lucide-chevron-right'
                "
              />

              <span>
                {{ monthNames[month.month] }}
              </span>
            </div>

            <div class="font-medium">
              {{ formatCurrency(month.total) }}
            </div>
          </div>

          <!-- TRANSAÇÕES -->
          <div
            v-if="
              expandedMonths[
                `${category.categoryId}-${month.month}`
              ]
            "
            class="p-3"
          >

            <UTable
              :data="month.transactions"
              :columns="[
                {
                  accessorKey: 'date',
                  header: 'Data'
                },
                {
                  accessorKey: 'description',
                  header: 'Descrição'
                },
                {
                  accessorKey: 'amount',
                  header: 'Valor',
                  cell: ({ row }) =>
                    formatCurrency(row.original.amount)
                }
              ]"
            />

          </div>
        </div>
      </div>
    </div>
  </UCard>
</template>