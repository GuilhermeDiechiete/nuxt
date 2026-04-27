<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { useGlobalStore } from '#imports'

const globalStore = useGlobalStore()

const topItems: NavigationMenuItem[] = [
  {
    label: 'Support',
    icon: 'i-lucide-message-circle'
  },
  {
    label: 'Profile',
    icon: 'i-lucide-user'
  }
]

const bottomItems = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Reports',
    icon: 'i-lucide-chart-column',
    active: globalStore.navegation === 'reports',
    onClick: () => (globalStore.navegation = 'reports')
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
  <div class="pt-16">
    <!-- TOP HEADER -->
    <div class="fixed top-0 left-0 right-0 z-50">
      <UNavigationMenu
        :items="topItems"
        :ui="{
          root: 'justify-around border-b border-default py-2 min-h-16',
          item: 'py-0',
          link: 'flex-col gap-1 px-3',
          linkLeadingIcon: 'size-5',
          linkLabel: 'text-[10px]/3 font-normal'
        }"
        class="w-full"
      />
    </div>

    <!-- BOTTOM MENU -->
    <div class="fixed bottom-0 left-0 right-0 z-50">
      <UNavigationMenu
        :items="bottomItems"
        :ui="{
          root: 'justify-around border-t border-default py-2 min-h-16',
          item: 'py-0',
          link: 'flex-col gap-1 px-3',
          linkLeadingIcon: 'size-5',
          linkLabel: 'text-[10px]/3 font-normal'
        }"
        class="w-full"
      />
    </div>
  </div>
</template>