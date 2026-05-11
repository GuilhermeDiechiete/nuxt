<script setup lang="ts">
import { reactive } from 'vue'
import { useSessionStore } from '#imports'
import type { FormSubmitEvent } from '@nuxt/ui'
import * as v from 'valibot'

// Schema login
const loginSchema = v.object({
  email: v.pipe(
    v.string(),
    v.nonEmpty('Informe o e-mail'),
    v.email('E-mail inválido')
  ),
  password: v.pipe(
    v.string(),
    v.nonEmpty('Informe a senha'),
    v.minLength(6, 'Senha inválida')
  )
})

type LoginSchema = v.InferOutput<typeof loginSchema>

const sessionStore = useSessionStore()

const form = reactive<LoginSchema>({
  email: '',
  password: ''
})

async function submit(event: FormSubmitEvent<LoginSchema>) {
  const data = event.data

  const res = await sessionStore.login(data)

  if (res) {
    setTimeout(() => navigateTo('/dashboard/panel'), 3000)
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <UCard class="w-full max-w-md">

      <template #header>
        <h1 class="flex items-center text-xl font-bold"><Favicon/>Login</h1>
        <p class="text-sm text-gray-500">
          Entre com sua conta
        </p>
      </template>

      <UForm
        :schema="loginSchema"
        :state="form"
        class="space-y-4"
        @submit="submit"
      >
        <UFormField label="E-mail" name="email">
          <UInput
            v-model="form.email"
            type="email"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Senha" name="password">
          <UInput
            v-model="form.password"
            type="password"
            class="w-full"
          />
        </UFormField>

        <UButton type="submit" block>
          Entrar
        </UButton>

        <div class="text-center text-sm">
          <NuxtLink
            to="/user/register"
            class="text-primary hover:underline"
          >
            Criar conta
          </NuxtLink>
        </div>
      </UForm>

    </UCard>
  </div>
</template>