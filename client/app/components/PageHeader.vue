<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'

const links = ref<ButtonProps[]>([
  {
    label: 'Login',
    color: 'neutral',
    to: '/session/login'
  },
  {
    label: 'Cadastre-se',
    color: 'neutral',
    variant: 'subtle',
    trailingIcon: 'i-lucide-arrow-right',
    to: '/user/register'
  }
])
</script>

<template>
  <UPageCTA
    title="Terminal de Controle Financeiro"
    description="Ferramenta para lançar suas transações no dia a dia, de forma rapida e facil."
    orientation="horizontal"
    :links="links"
  >
    <img
      src="https://picsum.photos/640/728"
      width="320"
      height="364"
      alt="Illustration"
      class="w-full rounded-lg"
      loading="lazy"
    />
  </UPageCTA>
</template>

