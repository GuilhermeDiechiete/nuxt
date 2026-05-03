import { defineStore } from 'pinia'
import { api } from '~/api/server'
import { useGlobalStore, useSessionStore } from '#imports'
import type { Payment } from '~/interfaces/payment'


export const usePaymentStore = defineStore('payment', {
  state: () => ({
 
    // Armazenamento de dados do Backend
    inputs: [] as any[],
    outputs: [] as any[],
    investments: [] as any[]
  }),

  actions: {
    // CRIAR FORMA DE PAGAMENTO
    async create(payload: Payment) {

      const globalStore = useGlobalStore()
      const sessionStore = useSessionStore()

      try {
        const res = await $fetch<{ message: string }>(api.routes.payments, {
          headers: {
            Authorization: `${sessionStore.token}`
          },
          method: 'POST',
          body: payload
        })
        globalStore.msg_success = res.message
        return true

      } catch (error: any) {
        globalStore.msg_error = error?.data?.message || error?.message || 'Erro inesperado'
        console.log(error)
        return false
      }
    },

    // BUSCAR LISTAS DE PAGAMENTO (List - inputs, outputs and investments)
    async fetchPayments() {
      const globalStore = useGlobalStore()
      const sessionStore = useSessionStore()

      try {
        const res = await $fetch<{ 
          inputs: any[], 
          outputs: any[], 
          investments: any[], 
          message: string
        }>(api.routes.payments, {
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
    // DELETAR FORMA DE PAGAMENTO
    async deletePayment(id: number) {
      const globalStore = useGlobalStore()
      const sessionStore = useSessionStore()

      try {
        const res = await $fetch<{ message: string }>(`${api.routes.payments}/${id}`,
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
        console.log(globalStore.msg_error)
        return false
      }
    }
  }
})