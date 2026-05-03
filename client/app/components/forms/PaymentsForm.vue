<script setup lang="ts">
import { reactive } from '#imports'
import { useGlobalStore } from '#imports'
import { usePaymentStore } from '~/stores/PaymentStore'
import type { FormSubmitEvent } from '@nuxt/ui'
import { paymentSchema, type PaymentSchema } from '~/validators/payment.schema'

const paymentStore = usePaymentStore()
const globalStore = useGlobalStore()

const form = reactive({
  name: '',
  type: globalStore.navegation,
  group: false,
})

async function fetch() {
    await paymentStore.fetchPayments()
}

async function submit(event: FormSubmitEvent<PaymentSchema>) {
 const { id, ...dataWithoutId } = event.data as any
 const res = await paymentStore.create(dataWithoutId)
 if(res) await paymentStore.fetchPayments()
 form.name = ''
 form.group = false
}


</script>
<template>
  <USlideover  side="left" :transition="true" title="Adicionar Forma de Pagamento">
    <UButton label="Formas de pagamento" color="neutral" variant="outline" @click="fetch"/>
   
    <template #body>
      <UForm
        :schema="paymentSchema"
        :state="form"
        class="space-y-4"
        @submit="submit"
      >
      <UFormField label="Nome da forma de pagamento" name="name">
        <UInput v-model="form.name" placeholder="Cartão TCF - Crédito" class="w-full"/>
      </UFormField>
        
        <div class="flex items-center gap-2">
          <p>Agrupar</p>
          <USwitch v-model="form.group" />
        </div>

        <UButton type="submit" block>Adicionar</UButton>
      </UForm>
      <PaymentTable/>
  </template>
</USlideover>


</template>