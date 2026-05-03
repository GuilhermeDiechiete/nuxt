<script setup lang="ts">
import { useGlobalStore } from '#imports'

const globalStore = useGlobalStore()
const clientType = ref('pj')
// recebe table da página
const props = defineProps<{
  table?: any
}>()

// filtro (v-model)
const filter = defineModel<string>('filter', { default: '' })
</script>

<template>
  <div v-if="globalStore.isMobile">
    <div class="flex items-center gap-3 py-3.5 ">
      
      <YearSelected class="w-full"/>
      <MonthSelected class="w-full"/>
    </div>
        <FilterTable v-model="filter" class="w-full mb-4"/>
        <TransactionForm class="w-full justify-center mb-4"/>

        <!-- No Mobile, Categorias, forma de pagamento e fornecedores, vai para o Menu -->
  </div>

  <div v-else>
    <div class="flex items-center gap-3 px-4 py-3.5 border-b border-accented">

      <FilterTable v-model="filter" />
      <YearSelected />
      <MonthSelected />
      <CategoryForm/>
      <PaymentsForm/>
      <SuppliersForm v-if="clientType === 'pj'"/>
      <TransactionForm/>

    </div>
  </div>
</template>