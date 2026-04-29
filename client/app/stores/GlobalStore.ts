import { defineStore } from 'pinia'
import { today , getLocalTimeZone } from '@internationalized/date'


export const useGlobalStore = defineStore('global', {
  state: () => ({

    // criar variavel que identifica se a tela é desktop ou mobile

    // Controle de navegação do Dashboard
    navegation: ref('outputs'),
    
    // Variaveis para receber mensagem do Backend
    msg_error: '',
    msg_success: '',

 

    // Data, valores utilizados nos selects
    YearSelected: 0,
    MonthSelected: 0,
    DaySelected: 0,
    
    ListOutputs: [],
    ListInputs: [],
    TotalOutputs_month: 0,
    TotalInputs_month:0,
    TotalOutputs_year: 0,
    TotalInputs_year: 0

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