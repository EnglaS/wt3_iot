import { useEffect, useState } from 'react'

const Home = () => {
  const [latest, setLatest] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
        const res = await fetch('/iot-api/latest')
        const json = await res.json()
        setLatest(json)
    }

    fetchData()
    const interval = setInterval(fetchData, 10000)
    return () => clearInterval(interval)
  }, [])

  const getTempClass = (t) => {
    if (t < 15) return 'cold'
    if (t > 28) return 'hot'
    return 'ok'
  }
  
  const getTVOCClass = (v) => {
    if (v > 500) return 'bad'
    if (v > 150) return 'warn'
    return 'ok'
  }
  
  const getHumidityClass = (h) => {
    if (h < 20) return 'dry'
    if (h > 70) return 'wet'
    return 'ok'
  }

  if (!latest) return <p>Laddar senaste data...</p>

  return (
    <div>
      <h1>Välkommen till IoT Dashboard</h1>
      <p>Senaste uppdatering: {new Date(latest.timestamp).toLocaleTimeString()}</p>

      <div className="overview">
        <div className={`overview-card ${getTempClass(latest.temperature)}`}>
            <h3>Temperatur</h3>
            <p>{latest.temperature?.toFixed(2)} °C</p>
        </div>

        <div className={`overview-card ${getTVOCClass(latest.tvoc)}`}>
            <h3>TVOC</h3>
            <p>{latest.tvoc} ppb</p>
        </div>

        <div className={`overview-card ${getHumidityClass(latest.humidity)}`}>
            <h3>Luftfuktighet</h3>
            <p>{latest.humidity?.toFixed(2)} %</p>
        </div>
      </div>
    </div>
  )
}

export default Home