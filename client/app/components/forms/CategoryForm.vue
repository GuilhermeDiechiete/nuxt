<script setup lang="ts">
import { reactive, ref, nextTick } from 'vue'
import { useGlobalStore, useCategoryStore } from '#imports'
import type { FormSubmitEvent } from '@nuxt/ui'
import { categorySchema, type CategorySchema } from '~/validators/category.schema'

const categoryStore = useCategoryStore()
const globalStore = useGlobalStore()

const inputRef = ref()

const items = [
  { label: 'Fixa', value: 'fixed' },
  { label: 'Variavel', value: 'variable' }
]

const form = reactive({
  category: 'fixed',
  transaction_type: globalStore.navegation,
  name: ''
  
})

async function fetch() {
  await categoryStore.fetchCategories()
}

async function submit(event: FormSubmitEvent<CategorySchema>) {

  const { id, ...dataWithoutId } = event.data as any

  const res = await categoryStore.create(dataWithoutId)

  if (res) {

    await categoryStore.fetchCategories()

    form.name = ''
    form.category = 'fixed'
    
    await nextTick()

    inputRef.value?.focus()
  }
}
</script>

<template>
  <USlideover
  side="right"
  :transition="true"
  >
<template #title>
    <HeaderForm title="Categorias"/>
   </template>
    <UButton
      label="Categorias"
      color="neutral"
      variant="outline"
      @click="fetch"
    />

    <template #body>

      <UForm
        :schema="categorySchema"
        :state="form"
        class="space-y-4"
        @submit="submit"
      >
        <UFormField label="" name="category">
          <URadioGroup v-model="form.category" :items="items" />
        </UFormField>

        <UFormField label="Nome da categoria" name="name">
          <UInput
            ref="inputRef"
            v-model="form.name"
            class="w-full"/>
        </UFormField>

        <UButton
          type="submit"
          block
        >
          Adicionar
        </UButton>

      </UForm>

      <CategoryTable />

    </template>
  </USlideover>
</template>
