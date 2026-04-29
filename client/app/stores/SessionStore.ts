import { defineStore } from 'pinia' // Pinia
import { api } from '~/api/server' // arquivo de config de acesso ao backend
import { useGlobalStore } from '#imports' // UserStore vai enviar mensagem para GlobalStore de msg de success ou error


interface LoginData {
  email: string
  password: string
}
export const useSessionStore = defineStore('session', {
  
     state: () => ({
        token: ref(''),
  }),
  actions: {
  // LOGIN DE USUÁRIO
    async login(payload: LoginData) {
      const globalStore = useGlobalStore()

      try {
        const res = await $fetch<{ message: string, token: string }>(api.routes.sessions, {
          method: 'POST',
          body: payload
        })
        globalStore.msg_success = res.message
        this.token = `Bearer ${res.token}` // salva o token no state.
        console.log(res.message, res.token)
        return true

      } catch (error: any) {
          const message = error?.data?.message || 'Erro inesperado'
            globalStore.msg_error = message
            console.log(message)
            return false
      }
    }
  }


})