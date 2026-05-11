
<script setup lang="ts">
import { h, resolveComponent, computed } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { Supplier } from '~/interfaces/Supplier'
import { useSupplierStore, useGlobalStore } from '#imports'

const UButton = resolveComponent('UButton')
const supplierStore = useSupplierStore()
const globalStore = useGlobalStore()

const data = supplierStore.listSuppliers

// Apresentação da Tabela
const columns: TableColumn<Supplier>[] = [
  {
    accessorKey: 'tradeName',
    header: 'Nome'
  },
  {
    id: 'delete',
    header: 'Excluir',
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
    <UTable :data="data" :columns="columns" class="flex-1 h-[70vh] overflow-y-auto" :ui="{
  thead: 'sticky top-0 z-10'}"/>
</template>