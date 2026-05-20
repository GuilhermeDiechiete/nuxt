<script setup lang="ts">
import { useGlobalStore } from '#imports'

// Funções do componente HUB

// 1 - Alterar os hubs entre mobile e desktop (valor está em globalStore.isMobile)
// 2 - Alterar os hubs para o usuário, conforme o dashboard (outputs, inputs, reports and investiments)

const globalStore = useGlobalStore()

// recebe table da página
const props = defineProps<{
  table?: any
}>()

// filtro (v-model)
const filter = defineModel<string>('filter', { default: '' })

</script>

<template>

  <!--HUB MOBILE-->
  <div v-if="globalStore.isMobile">
    <div class="flex items-center gap-3 py-3.5 px-4">
      <YearSelected class="w-full"/>
      <MonthSelected class="w-full"/>
      <SummaryOption/>
    </div>
        <FilterTable v-model="filter" class="w-full mb-4" v-if="globalStore.navegation !== 'summary'"/>
        <TransactionForm class="w-full justify-center mb-4" v-if="globalStore.navegation !== 'summary'"/>

        <!-- No Mobile, Categorias, forma de pagamento e fornecedores, vai para o Menu -->
  </div>

  <!--HUB DESKTOP-->
  <div v-else>

    <!--DeshBoard Relatórios-->
    <div class="flex items-center gap-3 px-4 py-3.5 border-b border-accented" v-if="globalStore.navegation === 'summary'">
      <YearSelected />
      <MonthSelected />
      <SummaryOption/>
    </div>

    <!--DeshBoard Saídas-->
    <div class="flex items-center gap-3 px-4 py-3.5 border-b border-accented" v-if="globalStore.navegation === 'outputs'">

      <FilterTable v-model="filter"/>
      <YearSelected />
      <MonthSelected />
      <CategoryForm />
      <PaymentsForm />
      <SupplierForm v-if="globalStore.client_type === 'PJ'"/>
      <TransactionForm />

    </div>

    <!--DeshBoard Entradas-->
    <div class="flex items-center gap-3 px-4 py-3.5 border-b border-accented" v-if="globalStore.navegation === 'inputs'">

      <FilterTable v-model="filter"/>
      <YearSelected />
      <MonthSelected />
      <CategoryForm />
      <PaymentsForm />
      <SupplierForm v-if="globalStore.client_type === 'PJ'"/>
      <TransactionForm />

    </div>

  </div>
</template>