<script setup lang="ts">
import { h, resolveComponent, ref, onMounted } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import { useTransactionStore } from '#imports'

const transactionStore = useTransactionStore()

const UButton = resolveComponent('UButton')

// ✅ estados separados (corrige mistura entre tabelas)
const expandedInputCategories = ref({})
const expandedOutputCategories = ref({})

const expandedInputMonths = ref({})
const expandedOutputMonths = ref({})

onMounted(async () => {
  await transactionStore.fetchCategorySummary()
})

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

type TransactionItem = {
  id: number
  amount: number
  date: string
  description?: string
}

type CategoryMonth = {
  month: number
  total: number
  transactions: TransactionItem[]
}

type CategorySummary = {
  categoryId: number
  categoryName: string
  months: CategoryMonth[]
  yearTotal: number
}

const columns: TableColumn<CategorySummary>[] = [
  {
    id: 'expand',
    cell: ({ row }) =>
      h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        icon: 'i-lucide-chevron-down',
        square: true,
        ui: {
          leadingIcon: [
            'transition-transform',
            row.getIsExpanded() ? 'duration-200 rotate-180' : ''
          ]
        },
        onClick: () => row.toggleExpanded()
      })
  },
  {
    accessorKey: 'categoryName',
    header: 'Categoria'
  },
  {
    accessorKey: 'yearTotal',
    header: 'Total Anual',
    cell: ({ row }) =>
      new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(row.getValue('yearTotal'))
  }
]

const monthColumns: TableColumn<CategoryMonth>[] = [
  {
    id: 'expand',
    cell: ({ row }) =>
      h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        icon: 'i-lucide-chevron-down',
        square: true,
        ui: {
          leadingIcon: [
            'transition-transform',
            row.getIsExpanded() ? 'duration-200 rotate-180' : ''
          ]
        },
        onClick: () => row.toggleExpanded()
      })
  },
  {
    accessorKey: 'month',
    header: 'Mês',
    cell: ({ row }) => monthNames[row.getValue('month')]
  },
  {
    accessorKey: 'total',
    header: 'Total do mês',
    cell: ({ row }) =>
      new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(row.getValue('total'))
  }
]
</script>

<template>
  <UContainer class="py-4">

    <UPageGrid class="gap-6">

      <!-- ================= ENTRADAS ================= -->
      <UPageCard class="w-full">

        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold text-green-600">
              Entradas
            </h2>

            <UBadge color="success" variant="subtle">
              {{ transactionStore.InputsCategories.length }}
            </UBadge>
          </div>
        </template>

        <UTable
          v-model:expanded="expandedInputCategories"
          :data="transactionStore.InputsCategories"
          :columns="columns"
        >
          <template #expanded="{ row }">
            <div class="p-4">

              <UTable
                v-model:expanded="expandedInputMonths"
                :data="row.original.months"
                :columns="monthColumns"
              >

                <template #expanded="{ row: monthRow }">
                  <div class="p-4">

                    <div
                      v-if="monthRow.original.transactions.length"
                      class="space-y-2"
                    >
                      <div
                        v-for="transaction in monthRow.original.transactions"
                        :key="transaction.id"
                        class="flex items-center justify-between border rounded-lg p-3"
                      >
                        <div>
                          <p class="font-medium">
                            {{ transaction.description || 'Sem descrição' }}
                          </p>

                          <p class="text-xs text-gray-500">
                            {{ new Date(transaction.date).toLocaleDateString('pt-BR') }}
                          </p>
                        </div>

                        <div class="font-bold">
                          {{
                            new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL'
                            }).format(transaction.amount)
                          }}
                        </div>
                      </div>
                    </div>

                    <div v-else class="text-sm text-gray-400">
                      Nenhuma transação neste mês
                    </div>

                  </div>
                </template>

              </UTable>

            </div>
          </template>

        </UTable>

      </UPageCard>

      <!-- ================= DESPESAS ================= -->
      <UPageCard>

        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold text-red-600">
              Despesas
            </h2>

            <UBadge color="error" variant="subtle">
              {{ transactionStore.OutputsCategories.length }}
            </UBadge>
          </div>
        </template>

        <UTable
          v-model:expanded="expandedOutputCategories"
          :data="transactionStore.OutputsCategories"
          :columns="columns"
        >
          <template #expanded="{ row }">
            <div class="p-4">

              <UTable
                v-model:expanded="expandedOutputMonths"
                :data="row.original.months"
                :columns="monthColumns"
              >

                <template #expanded="{ row: monthRow }">
                  <div class="p-4">

                    <div
                      v-if="monthRow.original.transactions.length"
                      class="space-y-2"
                    >
                      <div
                        v-for="transaction in monthRow.original.transactions"
                        :key="transaction.id"
                        class="flex items-center justify-between border rounded-lg p-3"
                      >
                        <div>
                          <p class="font-medium">
                            {{ transaction.description || 'Sem descrição' }}
                          </p>

                          <p class="text-xs text-gray-500">
                            {{ new Date(transaction.date).toLocaleDateString('pt-BR') }}
                          </p>
                        </div>

                        <div class="font-bold">
                          {{
                            new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL'
                            }).format(transaction.amount)
                          }}
                        </div>
                      </div>
                    </div>

                    <div v-else class="text-sm text-gray-400">
                      Nenhuma transação neste mês
                    </div>

                  </div>
                </template>

              </UTable>

            </div>
          </template>

        </UTable>

      </UPageCard>

      <!-- ================= FUTURO ================= -->
      <UPageCard class="opacity-60 border-dashed">

        <template #header>
          <h2 class="text-lg font-bold text-gray-400">
            Em breve
          </h2>
        </template>

        <div class="p-6 text-sm text-gray-400">
          Espaço reservado para futuros relatórios:
          <ul class="mt-2 list-disc pl-4">
            <li>Investimentos</li>
          </ul>
        </div>

      </UPageCard>

    </UPageGrid>

  </UContainer>
</template>