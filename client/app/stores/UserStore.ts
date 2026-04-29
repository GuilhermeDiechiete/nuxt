import { defineStore } from 'pinia' // Pinia
import { api } from '~/api/server' // arquivo de config de acesso ao backend
import { useGlobalStore } from '#imports' // UserStore vai enviar mensagem para GlobalStore de msg de success ou error

import type { CreateUser } from '~/interfaces/user'

export const useUserStore = defineStore('user', {
  
 

  actions: {
  // CRIAÇÃO DE USUÁRIO
    async create(payload: CreateUser) {

      const globalStore = useGlobalStore()

      try {
        const res = await $fetch<{ message: string }>(api.routes.users,  {
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
    }
  }


})