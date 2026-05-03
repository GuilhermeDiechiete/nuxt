import { defineStore } from 'pinia' // Pinia
import { api } from '~/api/server' // arquivo de config de acesso ao backend
import { useGlobalStore, useSessionStore } from '#imports' // UserStore vai enviar mensagem para GlobalStore de msg de success ou error
import type { Category } from '~/interfaces/category'

export const useCategoryStore = defineStore('category', {
  
state: () => ({
  inputs: [] as Category[],
  outputs: [] as Category[],
  investments: [] as Category[]
}),
 

  actions: {
    // CRIAR CATEGORIA
    async create(payload: Category) {

      const globalStore = useGlobalStore()
      const sessionStore = useSessionStore()

      try {
        const res = await $fetch<{ message: string }>(api.routes.categories,  {
          headers: {
            Authorization: `${sessionStore.token}`
          },
          method: 'POST',
          body: payload
        })
        globalStore.msg_success = res.message
        return true

      } catch (error: any) {
          const message = error?.data?.message || 'Erro inesperado'
          globalStore.msg_error = message
        return false
      }
    },

    // BUSCAR CATEGORIAS - (Inputs, outputs, investments)
    async fetchCategories() {
      const globalStore = useGlobalStore()
      const sessionStore = useSessionStore()

      try {
        const res = await $fetch<{ 
          inputs: any[], 
          outputs: any[], 
          investments: any[],
          message: string

        }>(api.routes.categories, {
          method: 'GET',
          headers: {
            Authorization: `${sessionStore.token}`
          }
        })

        this.inputs = res.inputs
        this.outputs = res.outputs
        this.investments = res.investments

        globalStore.msg_success = res.message
        return true

      } catch (error: any) {
        globalStore.msg_error = error?.data?.message || error?.message || 'Erro inesperado'
        return false
      }
    },
      
    // DELETAR CATEGORIA 
    async deleteCategory(id: number) {
      const globalStore = useGlobalStore()
      const sessionStore = useSessionStore()

      try {
        const res = await $fetch<{ message: string }>(`${api.routes.categories}/${id}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `${sessionStore.token}`
            }
          }
        )

        globalStore.msg_success = res.message

        // remove do array sem precisar refetch
        this.inputs = this.inputs.filter(c => c.id !== id)
        this.outputs = this.outputs.filter(c => c.id !== id)
        this.investments = this.investments.filter(c => c.id !== id)
        return true

      } catch (error: any) {
        globalStore.msg_error = error?.data?.message || error?.message || 'Erro ao deletar'
        return false
      }
    }
  }


})