<script setup lang="ts">
const summary = {
  income: {
    percent: 70,
    name: 'Salário',
    value: 2400
  },
  output: {
    name: 'Gasolina',
    value: 600
  },
  investment: {
    value: 300
  }
}
</script>

<template>
    <UPageCard
      title="Resumo de Categorias"
      description="Categorias com maior movimentação"
      icon="i-lucide-bar-chart-3"
    >
      <div class="flex flex-col gap-4 mt-4 text-sm">

        <!-- Receita -->
        <div class="flex justify-between items-center">
          <span class="text-muted">Maior Receita</span>
          <span class="font-medium text-success">
            {{ summary.income.percent }}% • {{ summary.income.name }}:
            {{
              new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(summary.income.value)
            }}
          </span>
        </div>

        <!-- Maior gasto -->
        <div class="flex justify-between items-center">
          <span class="text-muted">Maior Gasto</span>
          <span class="font-medium text-error">
            {{ summary.output.name }}:
            {{
              new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(summary.output.value)
            }}
          </span>
        </div>

        <!-- Investimento -->
        <div class="flex justify-between items-center">
          <span class="text-muted">Maior Investimento</span>
          <span class="font-medium text-primary">
            {{
              new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(summary.investment.value)
            }}
          </span>
        </div>

        <UButton class="justify-center" color="primary" variant="soft">Resumo Completo</UButton>
      </div>
    </UPageCard>
</template>


