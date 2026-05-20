<script setup lang="ts">
import {
  computed,
  watch,
  ref,
  h,
  resolveComponent
} from 'vue'

import type { TableColumn } from '@nuxt/ui'
import type { Column } from '@tanstack/vue-table'

import {
  useReportStore,
  useGlobalStore
} from '#imports'

const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')

const reportStore = useReportStore()
const globalStore = useGlobalStore()

watch(
  () => globalStore.year,
  async () => {
    await reportStore.fetchReports()
  }
)

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
  }).format(value || 0)
}

function getHeader(
  column: Column<Categories>,
  label: string
) {
  const isSorted = column.getIsSorted()

  return h(
    UDropdownMenu,
    {
      content: {
        align: 'start'
      },

      items: [
        {
          label: 'Asc',
          type: 'checkbox',

          icon: 'i-lucide-arrow-up-narrow-wide',

          checked: isSorted === 'asc',

          onSelect: () => {
            if (isSorted === 'asc') {
              column.clearSorting()
            } else {
              column.toggleSorting(false)
            }
          }
        },

        {
          label: 'Desc',
          type: 'checkbox',

          icon: 'i-lucide-arrow-down-wide-narrow',

          checked: isSorted === 'desc',

          onSelect: () => {
            if (isSorted === 'desc') {
              column.clearSorting()
            } else {
              column.toggleSorting(true)
            }
          }
        }
      ]
    },

    () =>
      h(UButton, {
        color: 'neutral',

        variant: 'ghost',

        label,

        icon: isSorted
          ? isSorted === 'asc'
            ? 'i-lucide-arrow-up-narrow-wide'
            : 'i-lucide-arrow-down-wide-narrow'
          : 'i-lucide-arrow-up-down',

        class: '-mx-2.5 text-gray-400 italic'
      })
  )
}

const columns: TableColumn<Categories>[] = [
  {
    accessorKey: 'category',

    header: ({ column }) =>
      getHeader(column, 'Categoria'),

    cell: ({ row }) => {
      const type = row.original.category

      return type === 'fixed'
        ? 'Fixo'
        : 'Variável'
    },

    footer: () => 'TOTAL A.M'
  },

  {
    accessorKey: 'category_name',

    header: ({ column }) =>
      getHeader(column, 'Nome'),

    footer: () => '-'
  },

  {
    id: 'jan',

    accessorFn: (row) => row.months[1],

    header: ({ column }) =>
      getHeader(column, 'Janeiro'),

    cell: ({ row }) =>
      formatCurrency(row.original.months[1]),

    footer: () =>
      formatCurrency(totalsByMonth.value[1])
  },

  {
    id: 'fev',

    accessorFn: (row) => row.months[2],

    header: ({ column }) =>
      getHeader(column, 'Fevereiro'),

    cell: ({ row }) =>
      formatCurrency(row.original.months[2]),

    footer: () =>
      formatCurrency(totalsByMonth.value[2])
  },

  {
    id: 'mar',

    accessorFn: (row) => row.months[3],

    header: ({ column }) =>
      getHeader(column, 'Março'),

    cell: ({ row }) =>
      formatCurrency(row.original.months[3]),

    footer: () =>
      formatCurrency(totalsByMonth.value[3])
  },

  {
    id: 'abr',

    accessorFn: (row) => row.months[4],

    header: ({ column }) =>
      getHeader(column, 'Abril'),

    cell: ({ row }) =>
      formatCurrency(row.original.months[4]),

    footer: () =>
      formatCurrency(totalsByMonth.value[4])
  },

  {
    id: 'mai',

    accessorFn: (row) => row.months[5],

    header: ({ column }) =>
      getHeader(column, 'Maio'),

    cell: ({ row }) =>
      formatCurrency(row.original.months[5]),

    footer: () =>
      formatCurrency(totalsByMonth.value[5])
  },

  {
    id: 'jun',

    accessorFn: (row) => row.months[6],

    header: ({ column }) =>
      getHeader(column, 'Junho'),

    cell: ({ row }) =>
      formatCurrency(row.original.months[6]),

    footer: () =>
      formatCurrency(totalsByMonth.value[6])
  },

  {
    id: 'jul',

    accessorFn: (row) => row.months[7],

    header: ({ column }) =>
      getHeader(column, 'Julho'),

    cell: ({ row }) =>
      formatCurrency(row.original.months[7]),

    footer: () =>
      formatCurrency(totalsByMonth.value[7])
  },

  {
    id: 'ago',

    accessorFn: (row) => row.months[8],

    header: ({ column }) =>
      getHeader(column, 'Agosto'),

    cell: ({ row }) =>
      formatCurrency(row.original.months[8]),

    footer: () =>
      formatCurrency(totalsByMonth.value[8])
  },

  {
    id: 'set',

    accessorFn: (row) => row.months[9],

    header: ({ column }) =>
      getHeader(column, 'Setembro'),

    cell: ({ row }) =>
      formatCurrency(row.original.months[9]),

    footer: () =>
      formatCurrency(totalsByMonth.value[9])
  },

  {
    id: 'out',

    accessorFn: (row) => row.months[10],

    header: ({ column }) =>
      getHeader(column, 'Outubro'),

    cell: ({ row }) =>
      formatCurrency(row.original.months[10]),

    footer: () =>
      formatCurrency(totalsByMonth.value[10])
  },

  {
    id: 'nov',

    accessorFn: (row) => row.months[11],

    header: ({ column }) =>
      getHeader(column, 'Novembro'),

    cell: ({ row }) =>
      formatCurrency(row.original.months[11]),

    footer: () =>
      formatCurrency(totalsByMonth.value[11])
  },

  {
    id: 'dez',

    accessorFn: (row) => row.months[12],

    header: ({ column }) =>
      getHeader(column, 'Dezembro'),

    cell: ({ row }) =>
      formatCurrency(row.original.months[12]),

    footer: () =>
      formatCurrency(totalsByMonth.value[12]),
      
  },

  {
    accessorKey: 'totalYear',

    header: ({ column }) =>
      getHeader(column, 'Total A.A'),

    meta: {
      class: {
        th: 'text-right',

        td: 'text-right text-green-400'
      }
    },

    cell: ({ row }) =>
      formatCurrency(row.original.totalYear),

    footer: () =>
      formatCurrency(reportStore.totalInputsYear)
  }
]

const sorting = ref([
  {
    id: 'totalYear',
    desc: true
  }
])
</script>

<template>
  <UTable
    v-model:sorting="sorting"
    :data="data"
    :columns="columns"

    :ui="{
      th: 'text-green-400',
      td: 'text-gray-400',
    }"
  />
</template>