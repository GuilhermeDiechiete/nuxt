<script setup lang="ts">
import { useGlobalStore } from '#imports';
const globalStore = useGlobalStore()

</script>

<template>
    <div>
        <NavBarMobile v-if="globalStore.isMobile" />
        <NavBarDesktop v-else />
        
        <Hub/>
        <template v-if="globalStore.navegation === 'summary'">
            <UCard>
                <GridSummary/>
                <UPageGrid class="gap-4 mt-4">
                    <GridCategory/>
                    <GridSupplier/>
                    <GridPayment/>
                </UPageGrid>
            </UCard>
        </template>
        
        <OutputsTable v-if="globalStore.navegation === 'outputs'"/>
        <InputsTable v-if="globalStore.navegation === 'inputs'"/>
        <InvestmentsTable v-if="globalStore.navegation === 'investments'"/>
    </div>
</template>



