<script setup lang="ts">
import { ref, computed, resolveComponent, h, onMounted } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import { useTransactionStore } from '#imports'

const transactionStore = useTransactionStore()

const UButton = resolveComponent('UButton')

onMounted(async () => {
  await transactionStore.fetchCategorySummary()
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
  return transactionStore.InputsCategories
})
</script>

<template>
  <UCard variant="outline">

    <div>
      <UCard variant="outline">Receitas</UCard>
    <!-- CATEGORIAS -->
    <div
      v-for="category in data"
      :key="category.categoryId"
      class=" overflow-hidden"
    >

      <!-- HEADER CATEGORIA -->
      <div
        class="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 cursor-pointer"
        @click="expandedCategories[category.categoryId] = !expandedCategories[category.categoryId]"
      >
        <div class="flex items-center gap-2">

          <UButton
            size="xs"
            variant="ghost"
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
        class=""
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
  </div>
  </UCard>
</template>