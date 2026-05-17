// stores/report.ts

import { defineStore } from 'pinia'
import { api } from '~/api/server'
import { useGlobalStore, useSessionStore } from '#imports'

export const useReportStore = defineStore('report', {

  state: () => ({
    totalOutputsYear: 0,
    totalInputsYear: 0,
    
    totalOutputsFixedYear: 0,
    totalOutputsVariableYear: 0,

    totalInputsFixedYear: 0,
    totalInputsVariableYear: 0,

    outputsFixedSummary: [],
    outputsFixedMonths: [],

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

        this.totalOutputsYear = res.totalOutputsYear
        this.totalInputsYear = res.totalInputsYear
        this.totalOutputsFixedYear = res.totalOutputsFixedYear
        this.totalOutputsVariableYear = res.totalOutputsVariableYear
        this.totalInputsFixedYear = res.totalInputsFixedYear
        this.totalInputsVariableYear = res.totalInputsVariableYear

        this.outputsFixedSummary = res.outputsFixedSummary
        this.outputsFixedMonths = res.outputsFixedMonths
        return true

      } catch (error: any) {
        globalStore.msg_error = error?.data?.message || error?.message || 'Erro inesperado'
        return false

      }
    }
  }
})