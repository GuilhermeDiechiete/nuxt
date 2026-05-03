<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import { transactionsMock } from '~/api/mocks/transaction'
import type { Transaction } from '~/interfaces/Transaction'

const data = ref(transactionsMock) // vem os dados do Banco de dados
const UBadge = resolveComponent('UBadge')
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
  },

  {
    accessorKey: 'description',
    header: 'Descrição',
    meta: center
  },
  {
    accessorKey: 'date',
    header: 'Venc.',
    meta: center
  },

  {
    accessorKey: 'category',
    header: 'Categoria',
    meta: center
  },
  {
    accessorKey: 'payment',
    header: 'Forma de Pagamento',
    meta: center
  },
  {
    accessorKey: 'current_installment',
    header: 'Parcelas',
    meta: center,
    cell: ({ row }) =>
      `${row.original.current_installment}-${row.original.total_installment}`
  },
  {
    accessorKey: 'amount',
    header: 'Valor',
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
]
</script>

<template>
  <div class="flex flex-col w-full px-4 h-screen">

    
    <TableFilters
  v-model:filter="globalFilter"
/>


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
