<script setup lang="ts">
import { reactive, onMounted, watch, computed } from 'vue'
import { useUserStore } from '#imports'
import { userSchema, type UserSchema } from '~/validators/user.schema'
import type { FormSubmitEvent } from '@nuxt/ui'

const userStore = useUserStore()
const route = useRoute()

const user = userStore.user
// 👉 modo edit ou create
const isEdit = computed(() => !!route.query.edit)

// FORM
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

/**
 * 🔥 CARREGA USUÁRIO
 */
onMounted(async () => {
  if (isEdit.value) {
    await userStore.getUser()
  }
})

/**
 * 🔥 PREENCHE FORM AUTOMATICAMENTE
 */
watch(
  () => userStore.user,
  (u) => {
    if (!u || !isEdit.value) return

    form.client_type = u.clientType
    form.document = u.document
    form.fullname = u.fullName || ''
    form.username = u.username
    form.birth = u.birth // precisa estar YYYY-MM-DD
    form.phone = u.phone
    form.email = u.email
  },
  { immediate: true }
)

/**
 * reset confirmação senha
 */
watch(
  () => form.password,
  () => {
    form.confirm_password = ''
  }
)

/**
 * SUBMIT
 */
async function submit(event: FormSubmitEvent<UserSchema>) {
  const data = event.data

  const res = isEdit.value
    ? await userStore.update(data)
    : await userStore.create(data)

  if (res && !isEdit.value) {
    setTimeout(() => navigateTo('/session/login'), 3000)
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <UCard class="w-full max-w-md">

      <template #header>
        <h1 class="text-xl font-bold">
          {{ isEdit ? 'Editar usuário' : 'Cadastro' }}
        </h1>
        <p class="text-sm text-gray-500">
          {{ isEdit ? 'Atualize seus dados' : 'Preencha seus dados' }}
        </p>
      </template>

      <UForm
        :schema="userSchema"
        :state="form"
        class="space-y-4"
        @submit="submit"
      >

        <UFormField label="Documento" name="document">
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

        <!-- senha só no create -->
        <UFormField v-if="!isEdit" label="Senha" name="password">
          <UInput v-model="form.password" type="password" class="w-full" />
        </UFormField>

        <UFormField v-if="!isEdit" label="Confirmar senha" name="confirm_password">
          <UInput v-model="form.confirm_password" type="password" class="w-full" />
        </UFormField>

        <UButton type="submit" block>
          {{ isEdit ? 'Atualizar' : 'Cadastrar' }}
        </UButton>

      </UForm>

    </UCard>
  </div>
</template>