import { defineStore } from 'pinia' // Pinia
import { api } from '~/api/server' // arquivo de config de acesso ao backend
import { useGlobalStore, useSessionStore } from '#imports' // UserStore vai enviar mensagem para GlobalStore de msg de success ou error
import type { Supplier } from '~/interfaces/Supplier'

export const useSupplierStore = defineStore('supplier', {
  
state: () => ({
  listSuppliers: [] as Supplier[],
 
}),
 

  actions: {
    // CRIAR FORNECEDORES - Usuário PJ
    async create(payload: Supplier) {

      const globalStore = useGlobalStore()
      const sessionStore = useSessionStore()

      try {
        const res = await $fetch<{ message: string }>(api.routes.suppliers,  {
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
          console.log(error)
        return false
      }
    },

    // BUSCAR FORNECEDORES
    async fetchSuppliers() {
      const globalStore = useGlobalStore()
      const sessionStore = useSessionStore()

      try {
        const res = await $fetch<{ suppliers: any[], message: string }>(api.routes.suppliers, {
          method: 'GET',
          headers: {
            Authorization: `${sessionStore.token}`
          }
        })

        this.listSuppliers = res.suppliers
        console.log(res.suppliers)
        globalStore.msg_success = res.message
        return true

      } catch (error: any) {
        globalStore.msg_error = error?.data?.message || error?.message || 'Erro inesperado'
        return false
      }
    },
      
    // DELETAR CATEGORIA 
    async deleteSupplier(id: number) {
      const globalStore = useGlobalStore()
      const sessionStore = useSessionStore()

      try {
        const res = await $fetch<{ message: string }>(`${api.routes.suppliers}/${id}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `${sessionStore.token}`
            }
          }
        )
        globalStore.msg_success = res.message

        // remove do array sem precisar refetch e não vem lista atualizada do DB
        this.listSuppliers = this.listSuppliers.filter(c => c.id !== id)
        return true

      } catch (error: any) {
        globalStore.msg_error = error?.data?.message || error?.message || 'Erro ao deletar'
        return false
      }
    }
  }


})

