<script setup lang="ts">
import { useTransactionStore } from '#imports';
const transactionStore = useTransactionStore()
</script>

<template>
  <Hub/>
  <UCard>
    <GridReport/>
    <UPageGrid class="gap-4 mt-4">
      <SummaryCategory/>
      <SummarySupplier/>
      <SummaryPayment/>
    </UPageGrid>
</UCard>
</template>

