<script setup lang="ts">
import { ref, watch } from 'vue'
import { useSessionStore } from '#imports'

const session = useSessionStore()

// booleano que indica mudança no token
const tokenChanged = ref(false)

watch(
  () => session.token,
  () => {
    navigateTo('/session/login')
  }
)

if(session.token === '') {
    console.log('Estou aquiiiiiii')
 navigateTo('/session/login')
}
</script>

<template></template>