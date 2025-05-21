// start och filterhantering

import { setIntervalMinutes } from './config.js'
import { renderCharts, updateCharts } from './chartRenderer.js'

function bindIntervalButtons() {
  const container = document.getElementById('interval-buttons')
  container.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      const minutes = parseInt(btn.dataset.min)
      setIntervalMinutes(minutes)
      updateCharts()
    })
  })
}

renderCharts().then(() => {
  setInterval(updateCharts, 10000)
  bindIntervalButtons()
})