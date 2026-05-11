
<script setup lang="ts">
import { h, resolveComponent, computed } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { Category } from '~/interfaces/category'
import { useCategoryStore, useGlobalStore } from '#imports'

const UButton = resolveComponent('UButton')
const categoryStore = useCategoryStore()
const globalStore = useGlobalStore()

const data = computed<Category[]>(() => {
  if (globalStore.navegation === 'investments') { 
    return categoryStore.investments 
  }

  if (globalStore.navegation === 'outputs') {
    return categoryStore.outputs
  }

  return categoryStore.inputs
})

// Apresentação da Tabela
const columns: TableColumn<Category>[] = [
  {
    accessorKey: 'category',
    header: 'Categoria',

    cell: ({ row }) => {
      const value = row.original.category

      return value === 'fixed'
        ? 'Fixo'
        : value === 'variable'
          ? 'Variável'
          : value
    }
  },
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
        onClick: () => categoryStore.deleteCategory(Number(row.original.id))
      })
  }
]
</script>


<template>
    <UTable sticky
    :data="data" 
    :columns="columns" 
    class="flex-1 h-[60vh] overflow-y-auto mt-4" />
    
</template>