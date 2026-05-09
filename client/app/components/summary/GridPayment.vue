<script setup lang="ts">
const payments = [
  {
    name: 'Cartão Sicredi',
    value: 3200
  },
  {
    name: 'CC Sicredi',
    value: 1200
  },
  {
    name: 'Dinheiro em espécie',
    value: 400
  }
]
</script>

<template>
  <UPageCard
    title="Formas de Pagamento"
    description="De onde saiu mais dinheiro"
    icon="i-lucide-credit-card"
  >
    <div class="flex flex-col gap-4 mt-4 text-sm">

      <!-- Lista -->
      <div
        v-for="(payment, index) in payments"
        :key="index"
        class="flex justify-between items-center"
      >
        <span class="text-muted">
          {{ index + 1 }}º {{ payment.name }}
        </span>

        <span class="font-medium text-error">
          {{
            new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(payment.value)
          }}
        </span>
      </div>

      <!-- Botão -->
      <UButton
        to="/summary/payments"
        class="justify-center"
        color="primary"
        variant="soft"
      >
        Ver Detalhes
      </UButton>

    </div>
  </UPageCard>
</template>