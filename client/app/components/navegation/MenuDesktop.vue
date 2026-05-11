<script setup lang="ts">
import { useSessionStore } from '#imports';
const sessionStore = useSessionStore()

</script>

<template>
  <USlideover side="right">
    <UButton icon="i-lucide-menu" color="primary" variant="outline" class="mr-4" />

    <template #content>
<Placeholder class="h-full m-4 flex flex-col justify-between">
  
  <!-- TOPO -->
  <div>
    <div class="my-2">
      <div class="flex justify-center">
        <Favicon/>
      </div>
      <UButton to="/user/edit" class="w-full justify-center" variant="soft">
        Perfil
      </UButton>
    </div>
  </div>

  <!-- MEIO -->
  <div>
    <div class="my-2">
     
    </div>
    <div class="my-2">
    
    </div>
  </div>

  <!-- FINAL -->
  <div>
    <div class="my-4">
      <UButton class="w-full justify-center" variant="soft" color="warning" to="https://wa.me/message/VZ2G3NRR3QZBF1" target="_blank">
        Suporte
      </UButton> 
    </div>

    <div class="my-4">
      <UButton class="w-full justify-center" variant="soft" color="error" @click="sessionStore.logout()">
        Sair
      </UButton> 
    </div>
  </div>

</Placeholder>
    </template>
  </USlideover>
</template>
