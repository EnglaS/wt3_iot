import { fetchFilteredData } from './api.js'

let tempChart, tvocChart, humidityChart

function formatLabels(data) {
  return data.map(item => new Date(item.timestamp).toLocaleTimeString()).reverse()
}

function formatValues(data, key) {
  return data.map(item => item[key]).reverse()
}

export async function renderCharts() {
  const data = await fetchFilteredData()
  const labels = formatLabels(data)

  const temps = formatValues(data, 'temperature')
  const tvoc = formatValues(data, 'tvoc')
  const hum = formatValues(data, 'humidity')

  const tempCtx = document.getElementById('tempChart').getContext('2d')
  tempChart = new Chart(tempCtx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Temperatur (°C)',
        data: temps,
        borderColor: 'blue',
        fill: false
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: { title: { display: true, text: 'Tid' } },
        y: { title: { display: true, text: '°C' } }
      }
    }
  })

  const tvocCtx = document.getElementById('tvocChart').getContext('2d')
  tvocChart = new Chart(tvocCtx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'TVOC (ppb)',
        data: tvoc,
        borderColor: 'green',
        fill: false
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: { title: { display: true, text: 'Tid' } },
        y: { title: { display: true, text: 'TVOC (ppb)' } }
      }
    }
  })

    const humCtx = document.getElementById('humidityChart').getContext('2d')
    humidityChart = new Chart(humCtx, {
    type: 'line',
    data: {
        labels,
        datasets: [{
        label: 'Luftfuktighet (%)',
        data: hum,
        borderColor: 'orange',
        fill: false
        }]
    },
    options: {
        responsive: true,
        scales: {
        x: { title: { display: true, text: 'Tid' } },
        y: { title: { display: true, text: 'Luftfuktighet (%)' } }
        }
    }
    })
}

export async function updateCharts() {
  const data = await fetchFilteredData()
  const labels = formatLabels(data)

  tempChart.data.labels = labels
  tempChart.data.datasets[0].data = formatValues(data, 'temperature')
  tempChart.update()

  tvocChart.data.labels = labels
  tvocChart.data.datasets[0].data = formatValues(data, 'tvoc')
  tvocChart.update()

  humidityChart.data.labels = labels
  humidityChart.data.datasets[0].data = formatValues(data, 'humidity')
  humidityChart.update()
}