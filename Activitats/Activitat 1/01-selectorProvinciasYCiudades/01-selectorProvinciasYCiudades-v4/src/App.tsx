import ProvinceSelector from './components/ProvinceSelector'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <h1>Selector de Provincias y Ciudades - v4</h1>
      <p className="subtitle">(Carga bajo demanda: datos cargados cuando el usuario los solicita)</p>
      <ProvinceSelector />
    </div>
  )
}

export default App
