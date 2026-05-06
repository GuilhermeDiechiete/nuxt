<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'

const links = ref<ButtonProps[]>([
  {
    label: 'Entrar',
    to: '/session/login',
    icon: 'i-lucide-log-in'
  },
  {
    label: 'Criar conta',
    to: '/user/register',
    color: 'neutral',
    variant: 'subtle',
    trailingIcon: 'i-lucide-arrow-right'
  }
])

const cards = ref([
  {
    title: 'Receitas',
    description: 'Lançamento de rendas, adicione suas categorias e contas.',
    icon: 'i-lucide-smile',
    to: '/docs/getting-started/integrations/icons'
  },
  {
    title: 'Despesas',
    description: 'Lançamento de despesas, com categoria, forma de pagamento, dia de vencimento.',
    icon: 'i-lucide-a-large-small',
    to: '/docs/getting-started/integrations/fonts'
  },
  {
    title: 'Investimentos',
    description: 'Organize seus aportes, acompanhe a rentabilidade de seus investimentos.',
    icon: 'i-lucide-sun-moon',
    to: '/docs/getting-started/integrations/color-mode'
  }
])
</script>

<template>
  <UPageCTA
    title="BeeFinance"
    description="Gerencie entradas, saídas e investimentos em um só lugar, de forma simples e eficiente."
    orientation="horizontal"
    reverse
    :links="links"
  >
    <img
      src="/beemain.png"
      alt="Bee Finance"
      class="md:w-52 lg:w-64 object-contain mx-auto"
      loading="lazy"
    />
  </UPageCTA>
    <UPageGrid class="gap-4 m-4">
    <UPageCard
      v-for="(card, index) in cards"
      :key="index"
      v-bind="card"
      class=""
    />
  </UPageGrid>
</template>


