import { defineStore } from 'pinia'
import { api } from '~/api/server'
import { useGlobalStore } from '#imports'

interface LoginData {
  email: string
  password: string
}

export const useSessionStore = defineStore('session', {

  state: () => ({
    token: ''
  }),

  actions: {

    async login(payload: LoginData) {
      const globalStore = useGlobalStore()

      try {
        const res = await $fetch<{
          message: string
          type: string
          token: string
        }>(api.routes.sessions, {
          method: 'POST',
          body: payload
        })

        globalStore.msg_success = res.message
        globalStore.client_type = res.type

        this.token = `Bearer ${res.token}`

        return true

      } catch (error: any) {

        const message = error?.data?.message || 'Erro inesperado'

        globalStore.msg_error = message

        console.log(message)

        return false
      }
    },

    validateAuth() {
      const router = useRouter()

      if (!this.token) {
        router.push('/session/login')
      }
    },

    logout() {
      const router = useRouter()

      this.token = ''

      router.push('/session/login')
    }
  }
})