<script setup lang="ts">
import { useGlobalStore, useSessionStore } from '#imports';
const globalStore = useGlobalStore()
const sessionStore = useSessionStore()

</script>
<template>
  <USlideover side="left">
    <UButton icon="i-lucide-menu" color="primary" variant="outline" class="mr-4" />

    <template #content>
<Placeholder class="h-full m-4 flex flex-col justify-between">
  
  <!-- TOPO -->
  <div>
    <div class="mb-2">
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
      <CategoryForm class="w-full justify-center"/>
    </div>
    <div class="my-2">
      <PaymentsForm class="w-full justify-center"/>
    </div>
    <div class="my-2">
      <SupplierForm class="w-full justify-center" v-if="globalStore.client_type === 'PJ'"/>
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
