<script setup lang="ts">
import { reactive } from 'vue'
import { useUserStore } from '#imports'
import { userSchema, type UserSchema } from '~/validators/user.schema'
import type { FormSubmitEvent } from '@nuxt/ui'

const userStore = useUserStore()
// RadioGroup
const items = [
  { label: 'Pessoa Física', value: 'PF' },
  { label: 'Pessoa Jurídica', value: 'PJ' }
]

// State tipado
const form = reactive<UserSchema>({
  client_type: 'PF',
  document: '',
  fullname: '',
  username: '',
  birth: '',
  phone: '',
  email: '',
  password: '',
  confirm_password: ''
})

async function submit(event: FormSubmitEvent<UserSchema>) {
  const data = event.data
  const res = await userStore.create(data)
  if (res) {
    setTimeout(() => navigateTo('/session/login'), 3000)
    }
}
watch(
  () => form.password,
  () => {
    form.confirm_password = ''
  }
)
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <UCard class="w-full max-w-md">
      <template #header>
        <h1 class="text-xl font-bold">Cadastro</h1>
        <p class="text-sm text-gray-500">
          Preencha seus dados
        </p>
      </template>

      <!-- 👇 schema conectado aqui -->
      <UForm
        :schema="userSchema"
        :state="form"
        class="space-y-4"
        @submit="submit"
      >

        <UFormField label="" name="clientType">
          <URadioGroup v-model="form.client_type" :items="items" />
        </UFormField>

        <UFormField label="Documento: CPF/CNPJ" name="document">
          <UInput v-model="form.document" class="w-full" />
        </UFormField>

        <UFormField label="Nome completo" name="fullname">
          <UInput v-model="form.fullname" class="w-full" />
        </UFormField>

        <UFormField label="Usuário" name="username">
          <UInput v-model="form.username" class="w-full" />
        </UFormField>

        <UFormField label="Nascimento" name="birth">
          <UInput v-model="form.birth" type="date" class="w-full" />
        </UFormField>

        <UFormField label="Telefone" name="phone">
          <UInput v-model="form.phone" class="w-full" />
        </UFormField>

        <UFormField label="E-mail" name="email">
          <UInput v-model="form.email" type="email" class="w-full" />
        </UFormField>

        <UFormField label="Senha" name="password">
          <UInput v-model="form.password" type="password" class="w-full" />
        </UFormField>

        <!-- ⚠️ corrigido name -->
        <UFormField label="Confirmar senha" name="confirm_password">
          <UInput v-model="form.confirm_password" type="password" class="w-full" />
        </UFormField>

        <UButton type="submit" block>
          Cadastrar
        </UButton>

      </UForm>
    </UCard>
  </div>
</template>