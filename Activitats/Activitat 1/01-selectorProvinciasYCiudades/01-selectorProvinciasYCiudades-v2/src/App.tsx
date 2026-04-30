import ProvinceSelector from './components/ProvinceSelector'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <h1>Selector de Provincias y Ciudades - v2</h1>
      <p className="subtitle">(Usando JSON separados: provincias.json + poblaciones.json)</p>
      <ProvinceSelector />
    </div>
  )
}

export default App
