import { defineStore } from 'pinia' // Pinia
import { api } from '~/api/server' // arquivo de config de acesso ao backend
import { useGlobalStore } from '#imports' // UserStore vai enviar mensagem para GlobalStore de msg de success ou error

import type { Create } from '~/interfaces/user'

export const useUserStore = defineStore('user', {
  
  state: (): Create => ({
    
    full_name: '',
    username: '',
    birth: '',
    phone: '',
    email: '',
    password: '',
    confirm_password: ''
    
    
  }),

  actions: {
  // CRIAÇÃO DE USUÁRIO
  async create() {

    // usado para enviar mensagem de success ou error globalmente
    const globalStore = useGlobalStore()

    // tinha validações aqui, acho que esta errado, devo criar uma pasta de validators

    try {
      const res = await $fetch<{ message: string }>(api.routes.users, {
        method: 'POST',
        body: {
          full_name: this.full_name,
          username: this.username,
          birth: this.birth,
          phone: this.phone,
          email: this.email,
          password: this.password,
          confirm_password: this.confirm_password
        }
      })

      // Salva mensagem de sucesso do backend globalmente
      globalStore.msg_success = res.message
      console.log(globalStore.msg_success)

      // limpeza dos campos do formulário
      this.full_name = ''
      this.username = ''
      this.birth = ''
      this.phone = ''
      this.email = ''
      this.password = ''
      this.confirm_password = ''
      return true
      

    } catch (error: any) {
      // Salva mensagem de erro do backend globalmente
      globalStore.msg_error = error?.data?.message || error?.message || 'Erro inesperado'
      console.log(globalStore.msg_error)
      return false
    }
  }
}




})