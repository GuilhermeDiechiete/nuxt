import { defineStore } from 'pinia'
import { today , getLocalTimeZone } from '@internationalized/date'


export const useGlobalStore = defineStore('global', {
  state: () => ({

    // Controle de navegação do Dashboard
    navegation: 'outputs',
    
    // Variaveis para receber mensagem do Backend
    msg_error: '',
    msg_success: '',

 

    // Data, valores utilizados nos selects
    YearSelected: 0,
    MonthSelected: 0,
    DaySelected: 0,
    
    filterTable: '',

  }),

  actions: {

    // Monitoramento de Datas para toda aplicação
    initDate() {
      const now = today(getLocalTimeZone())

      this.YearSelected = now.year
      this.MonthSelected = now.month
    },

    setYear(year: number) {
      this.YearSelected = year
    },

    setMonth(month: number) {
      this.MonthSelected = month
    }
  }
})