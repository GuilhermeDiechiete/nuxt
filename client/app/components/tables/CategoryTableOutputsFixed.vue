<script setup lang="ts">
import {
  ref,
  computed,
  resolveComponent,
  onMounted
} from 'vue'

import type {
  TableColumn
} from '@nuxt/ui'

import {
  getGroupedRowModel
} from '@tanstack/vue-table'

import type {
  GroupingOptions
} from '@tanstack/vue-table'

import {
  useReportStore
} from '#imports'

const reportStore = useReportStore()

const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')

// ======================================
// TYPES
// ======================================

type Transaction = {
  id: number
  category_name: string
  month: string
  description: string
  current_installment: number
  total_installment: number
  amount: number
  date: string
}

// ======================================
// FETCH
// ======================================

onMounted(async () => {
  await reportStore.fetchReports()
})

// ======================================
// MONTH LABELS
// ======================================

const monthLabels: Record<number, string> = {

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

// ======================================
// TABLE DATA
// ======================================

const data = computed<Transaction[]>((() => {

  const result: Transaction[] = []

  reportStore.outputsFixedMonths.forEach(
    (monthGroup: any) => {

      monthGroup.transactions.forEach(
        (transaction: any) => {

          result.push({

            id: transaction.id,

            category_name:
              transaction.category_name,

            month:
              monthLabels[
                monthGroup.month
              ],

            description:
              transaction.description,

            current_installment:
              transaction.current_installment,

            total_installment:
              transaction.total_installment,

            amount:
              Number(transaction.amount),

            date:
              transaction.date
          })
        }
      )
    }
  )

  return result
}))

// ======================================
// HELPERS
// ======================================

const formatCurrency = (
  value: number
) => {

  return new Intl.NumberFormat(
    'pt-BR',
    {
      style: 'currency',
      currency: 'BRL'
    }
  ).format(value)
}

// ======================================
// COLUMNS
// ======================================

const columns: TableColumn<Transaction>[] = [

  {
    id: 'title',
    header: 'Gastos FIXOS'
  },

  {
    id: 'category_name',
    accessorKey: 'category_name'
  },

  {
    id: 'month',
    accessorKey: 'month'
  },

  {
    accessorKey: 'description',
    header: 'Descrição',

    meta: {
      class: {
        td: 'w-full'
      }
    }
  },

  {
    accessorKey: 'current_installment',
    header: 'Parcela Atual'
  },

  {
    accessorKey: 'total_installment',
    header: 'Total Parcelas'
  },

  {
    accessorKey: 'date',
    header: 'Data',

    cell: ({ row }) => {

      return new Date(
        row.getValue('date')
      ).toLocaleDateString('pt-BR')
    }
  },

  {
    accessorKey: 'amount',
    header: 'Valor',

    meta: {
      class: {
        th: 'text-right',
        td: 'text-right font-medium'
      }
    },

    cell: ({ row }) => {

      return formatCurrency(
        Number(row.getValue('amount'))
      )
    },

    aggregationFn: 'sum'
  }
]

// ======================================
// GROUP OPTIONS
// ======================================

const grouping_options =
  ref<GroupingOptions>({
    groupedColumnMode: 'remove',
    getGroupedRowModel:
      getGroupedRowModel()
  })
</script>

<template>

  <div class="space-y-4">

    <UTable
      :data="data"
      :columns="columns"
      :grouping="['category_name', 'month']"
      :grouping-options="grouping_options"
    >

      <template #title-cell="{ row }">

        <div
          v-if="row.getIsGrouped()"
          class="flex items-center"
        >

          <span
            class="inline-block"
            :style="{
              width: `calc(${row.depth} * 1rem)`
            }"
          />

          <UButton
            variant="ghost"
            color="neutral"
            class="mr-2"
            size="xs"
            :icon="
              row.getIsExpanded()
                ? 'i-lucide-chevron-down'
                : 'i-lucide-chevron-right'
            "
            @click="row.toggleExpanded()"
          />

          <div
            v-if="
              row.groupingColumnId ===
              'category_name'
            "
            class="flex items-center gap-3"
          >

            <strong>
              {{ row.original.category_name }}
            </strong>

          </div>

          <div
            v-else-if="
              row.groupingColumnId ===
              'month'
            "
            class="font-medium"
          >

            {{ row.original.month }}

          </div>

        </div>

      </template>

    </UTable>

  </div>

</template>