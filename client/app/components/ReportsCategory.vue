<script setup lang="ts">
import { h, resolveComponent, ref } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { Column } from '@tanstack/vue-table'

const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')

type Category = {
  name: string
  percentual: string
  amount: number
}

/* =========================
   DADOS SEPARADOS
========================= */

const receitas = ref<Category[]>([
  { name: 'Salário', percentual: '100%', amount: 5000 },
  { name: 'Freelance', percentual: '100%', amount: 1200 }
])

const despesas = ref<Category[]>([
  { name: 'Faculdade', percentual: '10%', amount: 594 },
  { name: 'Gasolina', percentual: '10%', amount: 276 },
  { name: 'Alimentação', percentual: '10%', amount: 315 },
  { name: 'Lanches', percentual: '10%', amount: 529 },
  { name: 'Consórcio', percentual: '10%', amount: 639 }
])

const investimentos = ref<Category[]>([
  { name: 'Tesouro Direto', percentual: '100%', amount: 1000 },
  { name: 'CDB', percentual: '100%', amount: 2000 }
])

/* =========================
   COLUMNS (GENÉRICO)
========================= */

const columns: TableColumn<Category>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => getHeader(column, 'Nome'),
    cell: ({ row }) => row.getValue('name')
  },
  {
    accessorKey: 'percentual',
    header: ({ column }) => getHeader(column, 'Percentual'),
    cell: ({ row }) => row.getValue('percentual')
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => getHeader(column, 'Valor'),
    meta: {
      class: {
        th: 'text-right',
        td: 'text-right font-medium'
      }
    },
    cell: ({ row }) => {
      const amount = Number(row.getValue('amount'))

      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(amount)
    }
  }
]

/* =========================
   SORTING
========================= */

const sorting = ref([
  {
    id: 'name',
    desc: false
  }
])

/* =========================
   HEADER SORT
========================= */

function getHeader(column: Column<Category>, label: string) {
  const isSorted = column.getIsSorted()

  return h(
    UDropdownMenu,
    {
      content: { align: 'start' },
      'aria-label': 'Actions dropdown',
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
        class: '-mx-2.5 data-[state=open]:bg-elevated'
      })
  )
}
</script>

<template>
  <UCard class="mt-4" title="Resumo de Categorias">
    <UPageGrid>

      <!-- RECEITAS -->
      <UPageCard title="Receitas" spotlight
    spotlight-color="primary">
        <UTable
          v-model:sorting="sorting"
          :data="receitas"
          :columns="columns"
          class="flex-1"
        />
      </UPageCard>

      <!-- DESPESAS -->
      <UPageCard title="Despesas" spotlight
    spotlight-color="error" >
        <UTable
          v-model:sorting="sorting"
          :data="despesas"
          :columns="columns"
          class="flex-1"
        />
      </UPageCard>

      <!-- INVESTIMENTOS -->
      <UPageCard title="Investimentos" spotlight
    spotlight-color="warning" >
        <UTable
          v-model:sorting="sorting"
          :data="investimentos"
          :columns="columns"
          class="flex-1 "
        />
      </UPageCard>

    </UPageGrid>
  </UCard>
</template>
