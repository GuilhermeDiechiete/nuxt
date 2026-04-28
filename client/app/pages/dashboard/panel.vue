<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'
import { useGlobalStore } from '#imports';
import Reports from '~/components/dashboard/Reports.vue';
import Investments from '~/components/dashboard/Investments.vue';
import Inputs from '~/components/dashboard/Inputs.vue';
import Outputs from '~/components/dashboard/Outputs.vue';

const globalStore = useGlobalStore()
const isMobile = useMediaQuery('(max-width: 768px)')

</script>

<template>
    <div>
        <NavBarMobile v-if="isMobile" />
        <NavBarDesktop v-else />

        <Reports v-if="globalStore.navegation === 'reports'"/>
        <TableOutputs v-if="globalStore.navegation === 'outputs'"/>
        <Inputs v-if="globalStore.navegation === 'inputs'"/>
        <Investments v-if="globalStore.navegation === 'investments'"/>
    </div>
</template>



