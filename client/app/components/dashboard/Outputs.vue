<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import { upperFirst } from 'scule'
import type { TableColumn } from '@nuxt/ui'
import { transactionsMock } from '~/api/mocks/transaction'
import type { Transaction } from '~/interfaces/Transaction'

const data = ref(transactionsMock) // vem os dados do Banco de dados
const UBadge = resolveComponent('UBadge')
const table = useTemplateRef('table')
const globalFilter = ref('')

const center = {
  class: {
    th: 'text-center',
    td: 'text-center'
  }
}

// Cabeçalho da tabela
const columns: TableColumn<Transaction>[] = [
  {
    accessorKey: 'date',
    header: 'Date',
    meta: center
  },
  {
    accessorKey: 'description',
    header: 'Description',
    meta: center
  },
  {
    accessorKey: 'category',
    header: 'Category',
    meta: center
  },
  {
    accessorKey: 'payment',
    header: 'Payment',
    meta: center
  },
  {
    accessorKey: 'current_installment',
    header: 'Installment',
    meta: center,
    cell: ({ row }) =>
      `${row.original.current_installment}-${row.original.total_installment}`
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    meta: {
      class: {
        th: 'text-center',
        td: 'text-center font-medium'
      }
    },
    cell: ({ row }) => {
      const amount = Number(row.getValue('amount'))

      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(amount)
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    meta: center,
    cell: ({ row }) => {
      const color = {
        pending: 'warning',
        paid: 'success',
        failed: 'error'
      }[row.getValue('status') as string]

      return h(
        UBadge,
        { color, variant: 'subtle', class: 'capitalize' },
        () => row.getValue('status')
      )
    }
  }
]
</script>

<template>
  <div class="flex flex-col w-full px-4 h-screen">

    <!-- TOPO -->
    <div class="flex items-center justify-right gap-3 px-4 py-3.5 border-b border-accented shrink-0">
      <UInput
        v-model="globalFilter"
        class="max-w-sm w-full"
        placeholder="Search all fields..."
        icon="i-lucide-search"
      />

      <YearSelected/>
      <MonthSelected/>
      <UDropdownMenu
        :items="
          table?.tableApi
            ?.getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => ({
              label: upperFirst(column.id),
              type: 'checkbox' as const,
              checked: column.getIsVisible(),
              onUpdateChecked(checked: boolean) {
                table?.tableApi
                  ?.getColumn(column.id)
                  ?.toggleVisibility(!!checked)
              },
              onSelect(e: Event) {
                e.preventDefault()
              }
            }))"
          :content="{ align: 'end' }">
        <UButton
          label="Columns"
          color="neutral"
          variant="outline"
          trailing-icon="i-lucide-chevron-down"
        />
      </UDropdownMenu>
    </div>
    <div class="h-[76vh] overflow-y-auto">
      <UTable
      ref="table"
      v-model:global-filter="globalFilter"
      :data="data"
      :columns="columns"
      class="text-center h-[76vh]"
      sticky
    />
    </div>

  </div>
</template>