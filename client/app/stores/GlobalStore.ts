import { defineStore } from 'pinia'
import { today , getLocalTimeZone } from '@internationalized/date'
import { useMediaQuery } from '@vueuse/core'



export const useGlobalStore = defineStore('global', {
  state: () => ({

    isMobile: false,
    navegation: ref('summary'),
    year: 0,
    month: 0,
    summaryOption: ref('month'),
    // Variaveis para receber mensagem do Backend
    msg_error: '',
    msg_success: '',
    


  }),

  actions: {

    initResponsive() {
      const media = window.matchMedia('(max-width: 768px)')
      const update = () => { this.isMobile = media.matches }
      update()
      media.addEventListener('change', update)
    },
    // Monitoramento de Datas para toda aplicação
    initDate() {
      const now = today(getLocalTimeZone())

      this.year = now.year
      this.month = now.month
    },

    setYear(year: number) {
      this.year = year
    },

    setMonth(month: number) {
      this.month = month
    }
  }
})