<script setup lang="ts">
import { useGlobalStore } from '#imports'
const globalStore = useGlobalStore()
onMounted(() => {
  
  globalStore.initResponsive()
  globalStore.initDate()
})
 globalStore.initDate()
</script>

<template>
  <UApp>
      <NuxtPage />
      <MessageBox/>
  </UApp>
</template>
