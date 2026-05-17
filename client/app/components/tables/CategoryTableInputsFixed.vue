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

  // SALÁRIO

  {
    id: 1,
    category: 'Salário',
    month: 'Janeiro',
    description: 'Salário Empresa',
    amount: 4500,
    date: '2026-01-05',
    categoryType: 'fixed'
  },

  {
    id: 2,
    category: 'Salário',
    month: 'Fevereiro',
    description: 'Salário Empresa',
    amount: 4500,
    date: '2026-02-05',
    categoryType: 'fixed'
  },

  {
    id: 3,
    category: 'Salário',
    month: 'Março',
    description: 'Salário Empresa',
    amount: 4500,
    date: '2026-03-05',
    categoryType: 'fixed'
  },

  // FREELANCER

  {
    id: 4,
    category: 'Freelancer',
    month: 'Janeiro',
    description: 'Projeto Landing Page',
    amount: 1200,
    date: '2026-01-15',
    categoryType: 'variable'
  },

  {
    id: 5,
    category: 'Freelancer',
    month: 'Fevereiro',
    description: 'Sistema Financeiro',
    amount: 3200,
    date: '2026-02-20',
    categoryType: 'variable'
  },

  {
    id: 6,
    category: 'Freelancer',
    month: 'Abril',
    description: 'Consultoria',
    amount: 800,
    date: '2026-04-02',
    categoryType: 'variable'
  },

  // INVESTIMENTOS

  {
    id: 7,
    category: 'Investimentos',
    month: 'Março',
    description: 'Dividendos',
    amount: 540,
    date: '2026-03-10',
    categoryType: 'variable'
  },

  {
    id: 8,
    category: 'Investimentos',
    month: 'Abril',
    description: 'Rendimento CDI',
    amount: 320,
    date: '2026-04-10',
    categoryType: 'variable'
  },

  // ALUGUEL RECEBIDO

  {
    id: 9,
    category: 'Aluguel',
    month: 'Janeiro',
    description: 'Aluguel Apartamento',
    amount: 1800,
    date: '2026-01-08',
    categoryType: 'fixed'
  },

  {
    id: 10,
    category: 'Aluguel',
    month: 'Fevereiro',
    description: 'Aluguel Apartamento',
    amount: 1800,
    date: '2026-02-08',
    categoryType: 'fixed'
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
    variable: 'success'
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

  {
    id: 'title',
    header: 'Receitas Fixas'
  },

  {
    id: 'category',
    accessorKey: 'category'
  },

  {
    id: 'month',
    accessorKey: 'month'
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
    accessorKey: 'description',
    header: 'Descrição',

    meta: {
      class: {
        td: 'w-full'
      }
    }
  },

  {
    id: 'payment',
    accessorKey: 'payment',
     header: 'Parcelas',
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
