import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Temperature from './pages/Temperature'
import TVOC from './pages/TVOC'
import Humidity from './pages/Humidity'
import './App.css'

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul className="nav">
            <li><Link to="/">Start</Link></li>
            <li><Link to="/temperature">Temperatur</Link></li>
            <li><Link to="/tvoc">TVOC</Link></li>
            <li><Link to="/humidity">Luftfuktighet</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/temperature" element={<Temperature />} />
          <Route path="/tvoc" element={<TVOC />} />
          <Route path="/humidity" element={<Humidity />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
