<script setup lang="ts">
import { reactive } from 'vue'
import { useGlobalStore, useSupplierStore } from '#imports'
import type { FormSubmitEvent } from '@nuxt/ui'
import { supplierSchema, type SupplierSchema } from '~/validators/supplier.schema'

const supplierStore = useSupplierStore()
const globalStore = useGlobalStore()

// RadioGroup
const items = [
  { label: 'Pessoa Física', value: 'PF' },
  { label: 'Pessoa Jurídica', value: 'PJ' }
]

// 🧠 estado inicial
const initialForm = {
  type: 'PF' as 'PF' | 'PJ',
  transaction_type: globalStore.navegation,
  company_name: '',
  trade_name: '',
  document: '',
  email: '',
  phone: '',
  zip_code: '',
  street: '',
  number: undefined as number | undefined,
  city: '',
  state: '',
  country: '',
  pix_key: '',
  bank: '',
  agency: '',
  account: ''
}

// 🔥 form reativo baseado no estado inicial
const form = reactive({ ...initialForm })

async function fetch() {
  await supplierStore.fetchSuppliers()
}

async function submit(event: FormSubmitEvent<SupplierSchema>) {
  const { id, ...dataWithoutId } = event.data as any
  const res = await supplierStore.create(dataWithoutId)
  if (res) await supplierStore.fetchSuppliers()
    
  
}

const showFullForm = ref(false)
</script>

<template>
  <USlideover  side="right" :transition="true" title="Adicionar Fornecedor">
    <UButton label="Fornecedores" color="neutral" variant="outline" @click="fetch" v-if="globalStore.navegation === 'outputs'"/>
    <UButton label="Clientes" color="neutral" variant="outline" @click="fetch" v-if="globalStore.navegation === 'inputs'"/>
  <template #title>
    <HeaderForm title="Fornecedores - Contas a pagar" v-if="globalStore.navegation === 'outputs'"/>
    <HeaderForm title="Clientes - Contas a Receber" v-if="globalStore.navegation === 'inputs'"/>
  </template>
    <template #body>
      <UButton
        type="button"
        color="warning"
        variant="subtle"
        class="w-full justify-center"
        :label="showFullForm ? 'Ocultar cadastro completo' : 'Cadastro Completo'"
        @click="showFullForm = !showFullForm"
      />
      <UForm
      :schema="supplierSchema"
        :state="form"
        class="space-y-4"
        @submit="submit"
      >
        <UFormField name="type">
          <URadioGroup v-model="form.type" :items="items" />
        </UFormField>

        <UFormField label="Razão Social" name="company_name">
          <UInput v-model="form.company_name" class="w-full" />
        </UFormField>

        <UFormField label="Nome Fantasia" name="trade_name">
          <UInput v-model="form.trade_name" class="w-full" />
        </UFormField>
        
        <UFormField label="Documento: CPF/CNPJ" name="document">
          <UInput v-model="form.document" class="w-full" />
        </UFormField>

        <div v-if="showFullForm">
        <UFormField label="E-mail" name="email">
          <UInput v-model="form.email" class="w-full" type="email"/>
        </UFormField>

        <UFormField label="Telefone" name="phone">
          <UInput v-model="form.phone" class="w-full" type="phone"/>
        </UFormField>

        <UFormField label="CEP" name="zip_code">
          <UInput v-model="form.zip_code" class="w-full" />
        </UFormField>

        <UFormField label="Rua" name="street">
          <UInput v-model="form.street" class="w-full" />
        </UFormField>

        <UFormField label="Número" name="number">
          <UInputNumber v-model="form.number" class="w-full" />
        </UFormField>

        <UFormField label="Cidade" name="city">
          <UInput v-model="form.city" class="w-full" />
        </UFormField>

        <UFormField label="Estado" name="state">
          <UInput v-model="form.state" class="w-full" />
        </UFormField>

        <UFormField label="País" name="country">
          <UInput v-model="form.country" class="w-full" />
        </UFormField>

        <UFormField label="Chave PIX" name="pix_key">
          <UInput v-model="form.pix_key" class="w-full" />
        </UFormField>

        <UFormField label="Banco" name="bank">
          <UInput v-model="form.bank" class="w-full" />
        </UFormField>

        <UFormField label="Agência" name="agency">
          <UInput v-model="form.agency" class="w-full" />
        </UFormField>

        <UFormField label="Conta" name="account">
          <UInput v-model="form.account" class="w-full" />
        </UFormField>
        </div>
        <UButton color="warning" variant="subtle" class="w-full justify-center"
          :label="showFullForm ? 'Ocultar cadastro completo' : 'Cadastro Completo'"
          @click="showFullForm = !showFullForm" />
        <UButton
          type="submit"
          block
        >
          Adicionar
        </UButton>

      </UForm>
      <SupplierTable/>
    </template>
  </USlideover>
</template>
