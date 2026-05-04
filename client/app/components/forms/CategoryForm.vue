<script setup lang="ts">
import { reactive } from 'vue'
import { useGlobalStore, useCategoryStore } from '#imports'
import type { FormSubmitEvent } from '@nuxt/ui'
import { categorySchema, type CategorySchema } from '~/validators/category.schema'

const categoryStore = useCategoryStore()
const globalStore = useGlobalStore()

const form = reactive({
  name: '',
  type: globalStore.navegation
})

async function fetch() {
    await categoryStore.fetchCategories()
}

async function submit(event: FormSubmitEvent<CategorySchema>) {
  const { id, ...dataWithoutId } = event.data as any
  const res = await categoryStore.create(dataWithoutId)
  if (res) await categoryStore.fetchCategories()
  form.name = ''
}
</script>

<template>
  <USlideover  side="right" :transition="true" title="Adicionar Categoria">
    <UButton label="Categorias" color="neutral" variant="outline" @click="fetch"/>

    <template #body>
      <UForm
      :schema="categorySchema"
        :state="form"
        class="space-y-4"
        @submit="submit"
      >

        <UFormField label="Nome da categoria" name="name">
          <UInput v-model="form.name" class="w-full" />
        </UFormField>

        <UButton
          type="submit"
          block
        >
          Adicionar
        </UButton>

      </UForm>
      <CategoryTable/>
    </template>
  </USlideover>
</template>
