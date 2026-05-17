<script setup lang="ts">
import { reactive } from 'vue'
import { 
  useGlobalStore, 
  useCategoryStore, 
  useTransactionStore,
  usePaymentStore,
  useSupplierStore } from '#imports'

import type { FormSubmitEvent } from '@nuxt/ui'
import { transactionSchema, type TransactionSchema } from '~/validators/transaction.schema'

const globalStore = useGlobalStore()
const categoryStore = useCategoryStore()
const transactionStore = useTransactionStore()
const paymentStore = usePaymentStore()
const supplierStore = useSupplierStore()

const form = reactive({
  transaction_type: globalStore.navegation,
  date: '',
  description: '',
  category: '',
  category_name: '',
  supplier: '',
  payment: '',
  current_installment: 1,
  total_installment: 1,
  amount: 0,
  status: 'pending' as const
})

// Formatação do Input amout para moeda BR
const amountFormatted = ref('')
const handleInput = (e: Event) => {
  const input = e.target as HTMLInputElement
  const raw = input.value.replace(/\D/g, '')
  const numberValue = Number(raw) / 100
  form.amount = numberValue

  amountFormatted.value = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(numberValue)
}

const categoryOptions = computed(() =>
  (globalStore.navegation === 'outputs'
    ? categoryStore.outputs
    : categoryStore.inputs
  ).map(c => ({
    label: c.name,
    value: c.name,
    categoryType: c.category
  }))
)
const paymentOptions = computed(() =>
  (globalStore.navegation === 'outputs'
    ? paymentStore.outputs
    : paymentStore.inputs
  ).map(c => ({
    label: c.name,
    value: c.name
  }))
)

const supplierOptions = computed(() =>
  supplierStore.listSuppliers.map(c => ({
    label: c.tradeName,
    value: c.tradeName
  }))
)

async function fetch() {
    await categoryStore.fetchCategories()
    await paymentStore.fetchPayments()
    await supplierStore.fetchSuppliers()
}

async function submit(event: FormSubmitEvent<TransactionSchema>) {
  const { id, ...dataWithoutId } = event.data as any
  const res = await transactionStore.create(dataWithoutId)
  if (res) await transactionStore.fetchTransaction()
  
}
watch(
  () => form.category_name,
  (value) => {

    const selected = categoryOptions.value.find(
      item => item.value === value
    )

    if (selected) {
      form.category = selected.categoryType
    }
  }
)
</script>

<template>
  <USlideover  side="right" :transition="true" title="Adicionar Transação">
    <UButton label="ADICIONAR" color="success" variant="outline" @click="fetch"/>

    <template #title>
      <HeaderForm title="Adicionar Transação"/>
    </template>
    <template #body>
      <UForm
      :schema="transactionSchema"
        :state="form"
        class="space-y-4"
        @submit="submit"
      >
        <UFormField label="Dia de compra / vencimento" name="date">
          <UInput v-model="form.date" type="date" class="w-full" />
        </UFormField>
    
        <UFormField label="Descrição" name="description">
          <UInput v-model="form.description" class="w-full" />
        </UFormField>

        <UFormField label="Categoria" name="category">
          <USelect v-model="form.category_name" :items="categoryOptions" placeholder="Selecione" class="w-full"/>
        </UFormField>

        <UFormField label="Fornecedor" name="supplier" v-if="globalStore.client_type === 'PJ'">
          <USelect v-model="form.supplier" :items="supplierOptions" placeholder="Selecione" class="w-full"/>
        </UFormField>

        <UFormField label="Forma de pagamento" name="payment">
          <USelect v-model="form.payment" :items="paymentOptions" placeholder="Selecione" class="w-full"/>
        </UFormField>

        <UFormField label="Parcela Atual" name="current_installment">
          <UInputNumber color="neutral" variant="outline" v-model="form.current_installment" placeholder="Parcela Atual" class="w-full"/>
        </UFormField>  
       
        <UFormField label="Total de parcelas" name="total_installment">
          <UInputNumber color="neutral" variant="outline" v-model="form.total_installment" placeholder="Total de Parcela" class="w-full"/>
        </UFormField>
          
        

        <UFormField label="Valor" name="amount">
          <UInput type="text" :value="amountFormatted" @input="handleInput" placeholder="0,00" class="w-full"/>
        </UFormField>
        
        <UButton
          type="submit"
          block
        >
          Adicionar
        </UButton>

      </UForm>
    </template>
  </USlideover>
</template>