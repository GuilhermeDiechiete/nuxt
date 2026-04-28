<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'

const series = [
  {
    name: 'Entradas',
    data: [3500, 2000, 3000, 3500, 2500, 4000, 5000, 3500, 2500, 4000, 5000, 6000]
  },
  {
    name: 'Despesas',
    data: [5300, 3200, 3300, 1500, 1300, 4300, 3200, 2000, 2500, 3000, 3500, 4000]
  },
  {
    name: 'Investimentos',
    data: [1200, 1700, 1100, 900, 1500, 1100, 1000, 1800, 1400, 1600, 1900, 2200]
  }
]

const options = {
  chart: {
    type: 'bar',
    stacked: true,
    toolbar: { show: false },
    zoom: { enabled: false },
    stackType: '100%'
  },

  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 4,
      columnWidth: '55%'
    }
  },

  colors: ['#00E396', '#FF4560', '#FEB019'],

  xaxis: {
    categories: [
      'Jan','Fev','Mar','Abr','Mai','Jun',
      'Jul','Ago','Set','Out','Nov','Dez'
    ],
    labels: {
      style: {
        colors: '#d1d5db' // cinza claro
      }
    }
  },

  yaxis: {
    labels: {
      style: {
        colors: '#d1d5db' // cinza claro
      }
    }
  },

  legend: {
    position: 'top',
    labels: {
      colors: '#d1d5db' // cinza claro
    }
  },

  tooltip: {
    shared: true,
    intersect: false,
    theme: 'dark'
  },

  dataLabels: {
    enabled: false
  },

  grid: {
    borderColor: '#374151'
  },

  responsive: [
    {
      breakpoint: 768,
      options: {
        plotOptions: {
          bar: {
            columnWidth: '75%'
          }
        },
        legend: {
          position: 'bottom'
        }
      }
    }
  ]
}
</script>

<template>
  <ClientOnly>
    <div class="chart-container">
      <VueApexCharts
        type="bar"
        height="500"
        width="100%"
        :options="options"
        :series="series"
      />
    </div>
  </ClientOnly>
</template>

<style scoped>
.chart-container {
  width: 100%;
  max-width: 100%;
}
</style>