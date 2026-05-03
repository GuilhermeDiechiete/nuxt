<script setup lang="ts">
onMounted(() => {
  const globalStore = useGlobalStore()
  globalStore.initResponsive()
  globalStore.initDate()
})
</script>

<template>
  <UApp>
      <NuxtPage />
      <MessageBox/>
  </UApp>
</template>
