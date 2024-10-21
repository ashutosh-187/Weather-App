import './App.css'
import Navbar from './components/navBar/Navbar'
import {Card} from './components/card/Card'
import { WeatherProvider } from './context/Weather-context'

function App() {
  return (
    <WeatherProvider>
      <Navbar />
      <Card />
    </WeatherProvider>
  )
}

export default App
