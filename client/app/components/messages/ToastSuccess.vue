<script setup lang="ts">
import { watch } from 'vue'
import { useGlobalStore } from '#imports'

const globalStore = useGlobalStore()
const toast = useToast()

watch(
  () => globalStore.msg_success,
  (message) => {
    if (message) {
      toast.add({
        title: message,
        color: 'success',
        'duration': 3000,
      })

      // limpa a mensagem depois de exibir
      globalStore.msg_success = ''
    }
  }
)
</script>

<template>
  <div /> <!-- obrigatório -->
</template>



