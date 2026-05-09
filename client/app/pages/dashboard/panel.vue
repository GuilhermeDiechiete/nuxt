<script setup lang="ts">
import { useGlobalStore } from '#imports';
const globalStore = useGlobalStore()

</script>

<template>
    <div>
        <NavBarMobile v-if="globalStore.isMobile" />
        <NavBarDesktop v-else />
        

        <Summary v-if="globalStore.navegation === 'summary'"/>
        <Outputs v-if="globalStore.navegation === 'outputs'"/>
        <Inputs v-if="globalStore.navegation === 'inputs'"/>
        <Investments v-if="globalStore.navegation === 'investments'"/>
    </div>
</template>



