<script setup lang="ts">
import { h, resolveComponent, ref } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { Supplier } from '~/interfaces/Supplier'
import { useSupplierStore } from '#imports'

const UButton = resolveComponent('UButton')

const supplierStore = useSupplierStore()
const data = supplierStore.listSuppliers

const expanded = ref({})

// 🧾 colunas principais (só o essencial)
const columns: TableColumn<Supplier>[] = [
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
            row.getIsExpanded() ? 'rotate-180 duration-200' : ''
          ]
        },
        onClick: () => row.toggleExpanded()
      })
  },
  {
    accessorKey: 'companyName',
    header: 'Razão Social'
  },
  {
    accessorKey: 'tradeName',
    header: 'Nome Fantasia'
  },
  {
    accessorKey: 'document',
    header: 'Documento'
  },
  {
    accessorKey: 'email',
    header: 'E-mail'
  },
  {
    accessorKey: 'phone',
    header: 'Telefone'
  },
  {
    id: 'delete',
    header: '',
    cell: ({ row }) =>
      h(UButton, {
        color: 'error',
        variant: 'soft',
        icon: 'i-lucide-trash',
        onClick: () => supplierStore.deleteSupplier(Number(row.original.id))
      })
  }
]
</script>

<template>
  <UTable
    v-model:expanded="expanded"
    :data="data"
    :columns="columns"
    :ui="{ tr: 'data-[expanded=true]:bg-elevated/50' }"
    class="flex-1 h-[70vh] overflow-y-auto"
  >
    <!-- 🔽 conteúdo expandido -->
    <template #expanded="{ row }">
      <div class="p-4 grid grid-cols-3 gap-4 text-sm">

        <div><strong>Rua:</strong> {{ row.original.street }}</div>
        <div><strong>Número:</strong> {{ row.original.number }}</div>
        <div><strong>CEP:</strong> {{ row.original.zip_code }}</div>
        
        
        <div><strong>Cidade:</strong> {{ row.original.city }}</div>
        <div><strong>Estado:</strong> {{ row.original.state }}</div>
        <div><strong>País:</strong> {{ row.original.country }}</div>

        <div><strong>PIX:</strong> {{ row.original.pix_key }}</div>
        <div><strong>Banco:</strong> {{ row.original.bank }}</div>
        <div><strong>Agência:</strong> {{ row.original.agency }}</div>
        <div><strong>Conta:</strong> {{ row.original.account }}</div>

      </div>
    </template>
  </UTable>
</template>