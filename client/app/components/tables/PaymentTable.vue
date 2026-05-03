
<script setup lang="ts">
import { h, resolveComponent, computed } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { Payment } from '~/interfaces/payment'

const UButton = resolveComponent('UButton')

import { usePaymentStore, useGlobalStore } from '#imports'
const paymentStore = usePaymentStore()
const globalStore = useGlobalStore()

const data = computed<Payment[]>(() => {
  if (globalStore.navegation === 'investments') { 
    return paymentStore.investments 
  }

  if (globalStore.navegation === 'outputs') {
    return paymentStore.outputs
  }

  return paymentStore.inputs
})



const columns: TableColumn<Payment>[] = [
  {
    accessorKey: 'name',
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
        onClick: () => paymentStore.deletePayment(Number(row.original.id))
      })
  }
]
</script>


<template>
    <UTable :data="data" :columns="columns" class="flex-1 h-[70vh] overflow-y-auto" :ui="{
  thead: 'sticky top-0 z-10'}"/>
</template>