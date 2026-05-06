import { defineStore } from 'pinia' // Pinia
import { api } from '~/api/server' // arquivo de config de acesso ao backend
import { useGlobalStore } from '#imports' // UserStore vai enviar mensagem para GlobalStore de msg de success ou error
import { useSessionStore } from '#imports'
import type { CreateUser } from '~/interfaces/user'

const sessionStore = useSessionStore()

export const useUserStore = defineStore('user', {
  
state: () => ({
  user: null as any 
}),

actions: {
  // CRIAÇÃO DE USUÁRIO
  async create(payload: CreateUser) {

      const globalStore = useGlobalStore()

      try {
        const res = await $fetch<{ message: string }>(api.routes.users, {
          method: 'POST',
          body: payload
        })
        globalStore.msg_success = res.message
        console.log(res.message)

        // Limpar campos de payload
        return true

      } catch (error: any) {
          const message =
    error?.data?.message || 'Erro inesperado'

  globalStore.msg_error = message
  console.log(message)
        return false
      }
    },

  // BUSCAR INFORMAÇÕES DO USUÁRIO
  async getUser() {
    const globalStore = useGlobalStore()

    try {
      const res = await $fetch<{
        user: {
          clientType: string
          document: string
          fullName: string | null
          username: string
          birth: string
          phone: string
          email: string
        },
        message: string
      }>(api.routes.users, {
        headers: {
          Authorization: `${sessionStore.token}`
        },
        method: 'GET'
      })

      this.user = res.user
      return true

    } catch (error: any) {
      const message =
        error?.data?.message || 'Erro inesperado ao buscar usuário'

      globalStore.msg_error = message
      console.log(message)

      return false
    }
  },
    // ATUALIZAR USUÁRIO
    async update(payload: any) {
      const globalStore = useGlobalStore()

      try {
        const res = await $fetch<{ message: string }>(api.routes.users, {
          method: 'PUT',
          body: payload
        })

        globalStore.msg_success = res.message
        return true

      } catch (error: any) {
        globalStore.msg_error =
          error?.data?.message || 'Erro ao atualizar usuário'
        return false
      }
    }
  }
}


)