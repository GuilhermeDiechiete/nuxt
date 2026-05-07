<script setup lang="ts">
const topSuppliers = [
  { name: 'Souza Cruz', value: 4000 },
  { name: 'Mercado Livre', value: 3500 },
  { name: 'Magalu', value: 2000 }
]
</script>

<template>
    <UPageCard
      title="Top Fornecedores"
      description="Maiores valores pagos"
      icon="i-lucide-users"
    >
      <div class="flex flex-col gap-4 mt-4 text-sm">

        <div
          v-for="(supplier, index) in topSuppliers"
          :key="index"
          class="flex justify-between items-center"
        >
          <span class="text-muted">
            {{ index + 1 }}º
          </span>

          <span class="flex-1 mx-2 font-medium">
            {{ supplier.name }}
          </span>

          <span class="font-bold text-error">
            {{
              new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(supplier.value)
            }}
          </span>
        </div>
      <UButton to="/reports/suppliers" class="justify-center" color="primary" variant="soft">Resumo Completo</UButton>
      </div>
    </UPageCard>
</template>


