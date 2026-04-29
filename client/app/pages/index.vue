<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'

const links = ref<ButtonProps[]>([
  {
    label: 'Login',
    to: '//session/login',
    icon: 'i-lucide-square-play'
  },
  {
    label: 'Cadastre-se',
    to: '/user/register',
    color: 'neutral',
    variant: 'subtle',
    trailingIcon: 'i-lucide-arrow-right'
  }
])

const cards = ref([
  {
    title: 'Entradas',
    description: 'Registre e acompanhe todas as receitas, como salários, vendas e rendimentos recebidos.',
    icon: 'i-lucide-arrow-down-circle',
    to: '/entries'
  },
  {
    title: 'Saídas',
    description: 'Controle seus gastos diários, despesas fixas e variáveis para manter sua organização financeira.',
    icon: 'i-lucide-arrow-up-circle',
    to: '/expenses'
  },
  {
    title: 'Investimentos',
    description: 'Acompanhe a evolução do seu patrimônio com aportes e rendimentos ao longo do tempo.',
    icon: 'i-lucide-trending-up',
    to: '/investments'
  }
])
</script>

<template>
  <UCard>
      <UPageHero
        title="TCF"
        :ui="{ title: 'text-orange-500' }"
        description="Gerencie suas receitas, despesas e investimentos de forma organizada e prática."
        :links="links"
      />

    <UPageGrid>
      <UPageCard v-for="(card, index) in cards" :key="index" v-bind="card" />
    </UPageGrid>
  </UCard>
</template>

