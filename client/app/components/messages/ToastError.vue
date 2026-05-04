<script setup lang="ts">
import { watch } from 'vue'
import { useGlobalStore } from '#imports'

const globalStore = useGlobalStore()
const toast = useToast()

watch(
  () => globalStore.msg_error,
  (message) => {
    if (message) {
      toast.add({
        title: message,
        color: 'error',
        'duration': 2000,
      })

      // limpa a mensagem depois de exibir
      globalStore.msg_error = ''
    }
  }
)
</script>

<template>
  <div /> <!-- obrigatório -->
</template>
