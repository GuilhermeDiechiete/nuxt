<script setup lang="ts">
import { ref } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import { useReportStore } from '#imports'

const reportStore = useReportStore()

type TotalByMonth = {
  1: number
  2: number
  3: number
  4: number
  5: number
  6: number
  7: number
  8: number
  9: number
  10: number
  11: number
  12: number
}

type Categories = {
  id: number
  category: string
  category_name: string
  months: {
    1: number
    2: number
    3: number
    4: number
    5: number
    6: number
    7: number
    8: number
    9: number
    10: number
    11: number
    12: number
  }
  totalYear: number
}

const totalsByMonth = computed<TotalByMonth>(() => {
  return reportStore.totalInputsByMonth as TotalByMonth
})

const data = computed<Categories[]>(() => {
  return reportStore.inputsCategoriesSummary as Categories[]
})

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

const columns: TableColumn<Categories>[] = [
  {
    accessorKey: 'category',
    header: 'Categoria',
    footer: () => 'TOTAL'
  },

  {
    accessorKey: 'category_name',
    header: 'Nome',
    footer: () => '-'
  },

  {
    id: 'jan',
    header: 'Janeiro',
    cell: ({ row }) => formatCurrency(row.original.months[1] || 0),
    footer: () => formatCurrency(totalsByMonth.value[1])
  },

  {
    id: 'fev',
    header: 'Fevereiro',
    cell: ({ row }) => formatCurrency(row.original.months[2] || 0),
    footer: () => formatCurrency(totalsByMonth.value[2])
  },

  {
    id: 'mar',
    header: 'Março',
    cell: ({ row }) => formatCurrency(row.original.months[3] || 0),
    footer: () => formatCurrency(totalsByMonth.value[3])
  },

  {
    id: 'abr',
    header: 'Abril',
    cell: ({ row }) => formatCurrency(row.original.months[4] || 0),
    footer: () => formatCurrency(totalsByMonth.value[4])
  },

  {
    id: 'mai',
    header: 'Maio',
    cell: ({ row }) => formatCurrency(row.original.months[5] || 0),
    footer: () => formatCurrency(totalsByMonth.value[5])
  },

  {
    id: 'jun',
    header: 'Junho',
    cell: ({ row }) => formatCurrency(row.original.months[6] || 0),
    footer: () => formatCurrency(totalsByMonth.value[6])
  },

  {
    id: 'jul',
    header: 'Julho',
    cell: ({ row }) => formatCurrency(row.original.months[7] || 0),
    footer: () => formatCurrency(totalsByMonth.value[7])
  },

  {
    id: 'ago',
    header: 'Agosto',
    cell: ({ row }) => formatCurrency(row.original.months[8] || 0),
    footer: () => formatCurrency(totalsByMonth.value[8])
  },

  {
    id: 'set',
    header: 'Setembro',
    cell: ({ row }) => formatCurrency(row.original.months[9] || 0),
    footer: () => formatCurrency(totalsByMonth.value[9])
  },

  {
    id: 'out',
    header: 'Outubro',
    cell: ({ row }) => formatCurrency(row.original.months[10] || 0),
    footer: () => formatCurrency(totalsByMonth.value[10])
  },

  {
    id: 'nov',
    header: 'Novembro',
    cell: ({ row }) => formatCurrency(row.original.months[11] || 0),
    footer: () => formatCurrency(totalsByMonth.value[11])
  },

  {
    id: 'dez',
    header: 'Dezembro',
    cell: ({ row }) => formatCurrency(row.original.months[12] || 0),
    footer: () => formatCurrency(totalsByMonth.value[12])
  },

  {
    accessorKey: 'totalYear',
    header: 'Total A.A',

    meta: {
      class: {
        th: 'text-right',
        td: 'text-right  text-success'
      }
    },

    cell: ({ row }) => formatCurrency(row.original.totalYear),

    footer: () => formatCurrency(reportStore.totalInputsYear)
  }
]
</script>

<template>
<UTable
  :data="data"
  :columns="columns"
  class="flex-1 text-xs"

  :ui="{
    td: 'text-gray-400',
    th: 'text-green-700'
  }"
/>
</template>