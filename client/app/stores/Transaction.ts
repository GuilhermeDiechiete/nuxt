import { defineStore } from 'pinia' // Pinia
import { api } from '~/api/server' // arquivo de config de acesso ao backend
import { useGlobalStore, useSessionStore } from '#imports' // UserStore vai enviar mensagem para GlobalStore de msg de success ou error
import type { Transaction } from '~/interfaces/Transaction'

export const useTransactionStore = defineStore('transaction', {
  
state: () => ({
  ListInputs: [] as Transaction[],
  ListOutputs: [] as Transaction[],
}),
 

  actions: {
    // CRIAR CATEGORIA
    async create(payload: Transaction) {

      const globalStore = useGlobalStore()
      const sessionStore = useSessionStore()

      try {
        const res = await $fetch<{ message: string }>(api.routes.transactions,  {
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
    async fetchTransaction() {
      const globalStore = useGlobalStore()
      const sessionStore = useSessionStore()

      try {
        const res = await $fetch<{ 
          inputs: any[], 
          outputs: any[], 
          message: string

        }>(api.routes.transactions, {
          method: 'GET',
          headers: {
            Authorization: `${sessionStore.token}`
          }
        })

        this.ListInputs = res.inputs
        this.ListOutputs = res.outputs

        globalStore.msg_success = res.message
        return true

      } catch (error: any) {
        globalStore.msg_error = error?.data?.message || error?.message || 'Erro inesperado'
        return false
      }
    },
      
async toggleStatus(id: number) {
  const globalStore = useGlobalStore()
  const sessionStore = useSessionStore()

  // procura em inputs e outputs
  const transaction =
    this.ListInputs.find(t => t.id === id) ||
    this.ListOutputs.find(t => t.id === id)

  if (!transaction) return false

  const newStatus =
    transaction.status === 'paid' ? 'pending' : 'paid'

  try {
    const res = await $fetch<{ message: string }>(
      `${api.routes.transactions}/${id}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `${sessionStore.token}`
        },
        body: {
          status: newStatus
        }
      }
    )

    // 🔥 atualização local (sem refetch)
    transaction.status = newStatus

    globalStore.msg_success = res.message
    return true

  } catch (error: any) {
    globalStore.msg_error =
      error?.data?.message || error?.message || 'Erro ao atualizar status'
    return false
  }
},

    // DELETAR CATEGORIA 
    async deleteTransaction(id: number, futures: boolean) {
      const globalStore = useGlobalStore()
      const sessionStore = useSessionStore()

      try {
        const res = await $fetch<{ message: string }>(`${api.routes.transactions}/${id}/${futures}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `${sessionStore.token}`
            }
          }
        )

        globalStore.msg_success = res.message

        // remove do array sem precisar refetch
        this.ListInputs = this.ListInputs.filter(c => c.id !== id)
        this.ListOutputs = this.ListOutputs.filter(c => c.id !== id)
        return true

      } catch (error: any) {
        globalStore.msg_error = error?.data?.message || error?.message || 'Erro ao deletar'
        return false
      }
    }
  }


})