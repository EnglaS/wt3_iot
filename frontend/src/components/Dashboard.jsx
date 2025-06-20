import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import 'chart.js/auto'


const Dashboard = ({ focus }) => {
    const [data, setData] = useState([])
    const [minutes, setMinutes] = useState(10)
  
    useEffect(() => {
      const fetchData = () => {
        fetch(`/iot-api/data?since=${new Date(Date.now() - minutes * 60000).toISOString()}`)
          .then(res => res.json())
          .then(setData)
      }
    
      fetchData() // Kör direkt första gången
      const interval = setInterval(fetchData, 10000) // Kör varje 10:e sekund
    
      return () => clearInterval(interval) // Städa upp om komponenten tas bort
    }, [minutes])
  
    const labels = data.map(d => new Date(d.timestamp).toLocaleTimeString())
    const temps = data.map(d => d.temperature)
    const tvoc = data.map(d => d.tvoc)
    const hum = data.map(d => d.humidity)
    const latest = data[data.length - 1] || {}
  
    return (
      <div>
        <h2>Tidsintervall</h2>
        {[10, 60, 360, 1440].map(m => (
          <button key={m} onClick={() => setMinutes(m)}>{m} min</button>
        ))}
  
        {focus === 'temperature' && (
          <div className="chart-container">
            <div className="current-value">Just nu: {latest.temperature?.toFixed(2)} °C</div>
            <h2>Temperatur</h2>
            <Line data={{
              labels,
              datasets: [{
                label: 'Temperatur (°C)',
                data: temps,
                borderColor: 'blue'
              }]
            }} />
          </div>
        )}
  
        {focus === 'tvoc' && (
          <div className="chart-container">
            <div className="current-value">Just nu: {latest.tvoc} ppb</div>
            <h2>TVOC</h2>
            <Line data={{
              labels,
              datasets: [{
                label: 'TVOC (ppb)',
                data: tvoc,
                borderColor: 'green'
              }]
            }} />
          </div>
        )}
  
        {focus === 'humidity' && (
          <div className="chart-container">
            <div className="current-value">Just nu: {latest.humidity?.toFixed(2)} %</div>
            <h2>Luftfuktighet</h2>
            <Line data={{
              labels,
              datasets: [{
                label: 'Luftfuktighet (%)',
                data: hum,
                borderColor: 'orange'
              }]
            }} />
          </div>
        )}
      </div>
    )
  }
  
  export default Dashboard