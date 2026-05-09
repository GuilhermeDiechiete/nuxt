<script setup lang="ts">
import { useTransactionStore } from '#imports';
const transactionStore = useTransactionStore()

defineProps<{
  id: number
}>()
</script>

<template>
  <UModal title="Excluir despesas">
    <UButton icon="i-lucide-trash" color="error" variant="outline" />

    <template #body>
      <div class="h-14">
        <UButton class="m-2" label="Excluir despesa atual" color="error" variant="outline"  @click="transactionStore.deleteTransaction(id, false)"/>
        <UButton class="m-2" label="Excluir todas as despesas futuras" color="error" variant="outline"  @click="transactionStore.deleteTransaction(id, true)"/>
      </div>
    </template>
  </UModal>
</template>