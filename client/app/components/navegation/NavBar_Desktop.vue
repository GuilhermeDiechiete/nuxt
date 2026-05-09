<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { useGlobalStore } from '#imports'

const globalStore = useGlobalStore()

const Items: NavigationMenuItem[] = [
  {
    label: 'Suporte',
    icon: 'i-lucide-message-circle'
  },
  {
    label: 'Meu Perfil',
    icon: 'i-lucide-user'
  }
]

const bottomItems = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Reports',
    icon: 'i-lucide-chart-column',
    active: globalStore.navegation === 'summary',
    onClick: () => (globalStore.navegation = 'summary')
  },
  {
    label: 'Expenses',
    icon: 'i-lucide-arrow-down',
    active: globalStore.navegation === 'outputs',
    onClick: () => (globalStore.navegation = 'outputs')
  },
  {
    label: 'Incomes',
    icon: 'i-lucide-arrow-up',
    active: globalStore.navegation === 'inputs',
    onClick: () => (globalStore.navegation = 'inputs')
  },
  {
    label: 'Investments',
    icon: 'i-lucide-trending-up',
    active: globalStore.navegation === 'investments',
    onClick: () => (globalStore.navegation = 'investments')
  }
])
</script>

<template>
  <div class="pb-16">

    <!-- TOP MENU -->
    <div class="fixed top-0 left-0 right-0 z-50">
      
      <div class="flex items-center justify-between border-b border-default min-h-16 px-2 bg-default">
      
       <img src="/favicon.ico" alt="Logo" class="h-14 w-auto" />

      <UNavigationMenu
        :items="bottomItems"
        :ui="{
          root: 'justify-around border-b border-default min-h-16',
          item: 'py-0',
        }"
        class="w-full"
      />
        <MenuDesktop/>
   
      </div>

    </div>
  </div>
</template>