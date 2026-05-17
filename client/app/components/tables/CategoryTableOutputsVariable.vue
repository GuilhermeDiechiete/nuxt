<script setup lang="ts">
import { ref, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import { getGroupedRowModel } from '@tanstack/vue-table'
import type { GroupingOptions } from '@tanstack/vue-table'

const UBadge = resolveComponent('UBadge')

// ======================================
// TYPES
// ======================================

type Transaction = {
  id: number
  category: string
  month: string
  description: string
  amount: number
  date: string
  categoryType: 'fixed' | 'variable'
}

// ======================================
// STATIC DATA
// ======================================

const data = ref<Transaction[]>([
  {
    id: 1,
    category: 'Mercado',
    month: 'Janeiro',
    description: 'Supermercado Atacadão',
    amount: 850,
    date: '2026-01-05',
    categoryType: 'variable'
  },

  {
    id: 2,
    category: 'Mercado',
    month: 'Janeiro',
    description: 'Padaria',
    amount: 120,
    date: '2026-01-12',
    categoryType: 'variable'
  },

  {
    id: 3,
    category: 'Mercado',
    month: 'Fevereiro',
    description: 'Mercado Carrefour',
    amount: 980,
    date: '2026-02-03',
    categoryType: 'variable'
  },

  {
    id: 4,
    category: 'Financiamento',
    month: 'Janeiro',
    description: 'Parcela Casa',
    amount: 2100,
    date: '2026-01-10',
    categoryType: 'fixed'
  },

  {
    id: 5,
    category: 'Financiamento',
    month: 'Fevereiro',
    description: 'Parcela Casa',
    amount: 2100,
    date: '2026-02-10',
    categoryType: 'fixed'
  },

  {
    id: 6,
    category: 'Consórcio',
    month: 'Março',
    description: 'Consórcio Carro',
    amount: 780,
    date: '2026-03-02',
    categoryType: 'fixed'
  },

  {
    id: 7,
    category: 'Eventos',
    month: 'Abril',
    description: 'Show',
    amount: 450,
    date: '2026-04-15',
    categoryType: 'variable'
  },

  {
    id: 8,
    category: 'Eventos',
    month: 'Abril',
    description: 'Churrasco',
    amount: 320,
    date: '2026-04-22',
    categoryType: 'variable'
  }
])

// ======================================
// HELPERS
// ======================================

const getCategoryColor = (
  type: 'fixed' | 'variable'
) => {

  return {
    fixed: 'primary',
    variable: 'neutral'
  }[type]
}

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

  // GROUP COLUMN

  {
    id: 'title',
    header: 'Gastos VARIAVEIS'
  },

  // CATEGORY

  {
    id: 'category',
    accessorKey: 'category'
  },

  // MONTH

  {
    id: 'month',
    accessorKey: 'month'
  },

  // DESCRIPTION

  {
    accessorKey: 'description',
    header: 'Descrição',
    meta: {
      class: {
        td: 'w-full'
      }
    }
  },

  // DATE

  {
    accessorKey: 'date',
    header: 'Data',

    cell: ({ row }) => {

      return new Date(
        row.getValue('date')
      ).toLocaleDateString('pt-BR')
    }
  },

  // AMOUNT

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
      :grouping="['category', 'month']"
      :grouping-options="grouping_options"
      :ui="{
        root: 'min-w-full',
        td: 'py-2',
        th: 'py-2'
      }"
    >

      <!-- GROUP TITLE -->

      <template #title-cell="{ row }">

        <div
          v-if="row.getIsGrouped()"
          class="flex items-center"
        >

          <!-- INDENT -->

          <span
            class="inline-block"
            :style="{
              width: `calc(${row.depth} * 1rem)`
            }"
          />

          <!-- EXPAND -->

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

          <!-- CATEGORY -->

          <div
            v-if="
              row.groupingColumnId === 'category'
            "
            class="flex items-center gap-3"
          >

            <strong>
              {{
                row.original.category
              }}
            </strong>

            <UBadge
              :color="
                getCategoryColor(
                  row.original.categoryType
                )
              "
              variant="soft"
              size="xs"
            >

              {{
                row.original.categoryType
              }}

            </UBadge>

          </div>

          <!-- MONTH -->

          <div
            v-else-if="
              row.groupingColumnId === 'month'
            "
            class="font-medium"
          >

            {{
              row.original.month
            }}

          </div>

        </div>

      </template>

    </UTable>

  </div>

</template>
