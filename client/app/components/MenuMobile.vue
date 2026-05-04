<template>
  <USlideover side="left">
    <UButton icon="i-lucide-menu" color="primary" variant="outline" class="mr-4" />

    <template #content>
<Placeholder class="h-full m-4 flex flex-col justify-between">
  
  <!-- TOPO -->
  <div>
    <div class="my-2">
      
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
      <SupplierForm class="w-full justify-center"/>
    </div>
  </div>


  <!-- FINAL -->
  <div>
    <div class="my-4">
      <UButton class="w-full justify-center" variant="soft" color="warning">
        Suporte
      </UButton> 
    </div>

    <div class="my-4">
      <UButton class="w-full justify-center" variant="soft" color="error">
        Sair
      </UButton> 
    </div>
  </div>

</Placeholder>
    </template>
  </USlideover>
</template>
