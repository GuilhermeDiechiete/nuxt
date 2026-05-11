<script setup lang="ts">
import { useGlobalStore, useSessionStore } from '#imports'
const globalStore = useGlobalStore()
const sessionStore = useSessionStore()

onMounted(() => {
  globalStore.initResponsive()
  globalStore.initDate()
  sessionStore.validateAuth()
})
 
watch(
  () => sessionStore.token,
  () => {
    sessionStore.validateAuth()
  }
)
</script>

<template>
  <UApp>
      <NuxtPage />
      <MessageBox/>
  </UApp>
</template>
