<script setup lang="ts">
import { pageLinks } from '#build/ui';
import type { ButtonProps, AuthFormField } from '@nuxt/ui'

const providers = ref<ButtonProps[]>([
  {
    label: 'Google',
    icon: 'i-simple-icons-google',
    color: 'neutral',
    variant: 'subtle'
  },
  {
    label: 'GitHub',
    icon: 'i-simple-icons-github',
    color: 'neutral',
    variant: 'subtle'
  }
])
const fields = ref<AuthFormField[]>([
  {
    name: 'email',
    type: 'text',
    label: 'Email'
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password'
  }
])
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <UCard>
      <UAuthForm
        title="Login"
        description="Enter your credentials to access your account."
        icon="i-lucide-user"
        :providers="providers"
        :fields="fields"
        class="max-w-md w-full"
      />
    </UCard>
  </div>
</template>
