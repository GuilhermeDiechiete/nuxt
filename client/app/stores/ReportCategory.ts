// stores/report.ts

import { defineStore } from 'pinia'
import { api } from '~/api/server'
import { useGlobalStore, useSessionStore } from '#imports'

export const useReportStore = defineStore('report', {

  state: () => ({
    totalInputsYear: 0,
    totalInputsFixedYear: 0,
    totalInputsVariableYear: 0,

    totalOutputsYear: 0,
    totalOutputsFixedYear: 0,
    totalOutputsVariableYear: 0,

    totalOutputsByMonth: {},
    totalInputsByMonth: {},

    outputsCategoriesSummary: {},
    inputsCategoriesSummary: {}
  
  }),

  actions: {

    // BUSCA RELATÓRIOS
    async fetchReports() {
      const globalStore = useGlobalStore()
      const sessionStore = useSessionStore()

      try {

        const res = await $fetch<any>( api.routes.reports,{

            headers: {
              Authorization:
                `${sessionStore.token}`
            },
            method: 'GET',

            params: {
              year: globalStore.year
            }
          }
        )

        // totais
        this.totalInputsYear = res.totalInputsYear
        this.totalInputsFixedYear = res.totalInputsFixedYear
        this.totalInputsVariableYear = res.totalInputsVariableYear

        this.totalOutputsYear = res.totalOutputsYear
        this.totalOutputsFixedYear = res.totalOutputsFixedYear
        this.totalOutputsVariableYear = res.totalOutputsVariableYear

        this.totalInputsByMonth = res.inputsByMonth 
        this.totalOutputsByMonth = res.outputsByMonth 

        this.outputsCategoriesSummary = res.outputsCategoriesSummary
        this.inputsCategoriesSummary = res.inputsCategoriesSummary
        // verificar se esta em uso

        return true

      } catch (error: any) {
        globalStore.msg_error = error?.data?.message || error?.message || 'Erro inesperado'
        return false

      }
    }
  }
})