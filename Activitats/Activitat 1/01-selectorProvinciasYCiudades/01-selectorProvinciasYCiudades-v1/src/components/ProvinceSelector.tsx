import { useState } from 'react'
import data from '../data/arbol.json'
import { Community, Province, Town } from '../types'
import './ProvinceSelector.css'

export default function ProvinceSelector() {
  const [selectedCommunity, setSelectedCommunity] = useState<string>('')
  const [selectedProvince, setSelectedProvince] = useState<string>('')
  const [selectedTown, setSelectedTown] = useState<string>('')
  const [result, setResult] = useState<{ province: string; town: string } | null>(null)

  // Obtener todas las comunidades
  const communities = data as Community[]

  // Obtener provincias de la comunidad seleccionada
  const provinces: Province[] = selectedCommunity
    ? (communities.find(c => c.code === selectedCommunity)?.provinces || [])
    : []

  // Obtener pueblos/ciudades de la provincia seleccionada
  const towns: Town[] = selectedProvince
    ? (provinces.find(p => p.code === selectedProvince)?.towns || [])
    : []

  // Manejar cambio de comunidad - resetear provincia y pueblo
  const handleCommunityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCommunity(e.target.value)
    setSelectedProvince('')
    setSelectedTown('')
  }

  // Manejar cambio de provincia - resetear pueblo
  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProvince(e.target.value)
    setSelectedTown('')
  }

  // Manejar cambio de pueblo
  const handleTownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTown(e.target.value)
  }

  // Manejar envío del formulario
  const handleSubmit = () => {
    if (selectedProvince && selectedTown) {
      const province = provinces.find(p => p.code === selectedProvince)
      const town = towns.find(t => t.code === selectedTown)
      
      if (province && town) {
        setResult({
          province: province.label,
          town: town.label
        })
        
        // Resetear selectores
        setSelectedCommunity('')
        setSelectedProvince('')
        setSelectedTown('')
      }
    }
  }

  return (
    <div className="province-selector">
      <div className="selectors-container">
        {/* Selector de Comunidades */}
        <div className="selector-group">
          <label htmlFor="community-select">Selecciona una Comunidad:</label>
          <select
            id="community-select"
            value={selectedCommunity}
            onChange={handleCommunityChange}
          >
            <option value="">-- Selecciona una opción --</option>
            {communities.map(community => (
              <option key={community.code} value={community.code} data-key={community.code}>
                {community.label}
              </option>
            ))}
          </select>
        </div>

        {/* Selector de Provincias */}
        <div className="selector-group">
          <label htmlFor="province-select">Selecciona una Provincia:</label>
          <select
            id="province-select"
            value={selectedProvince}
            onChange={handleProvinceChange}
            disabled={!selectedCommunity}
          >
            <option value="">-- Selecciona una opción --</option>
            {provinces.map(province => (
              <option key={province.code} value={province.code} data-key={province.code}>
                {province.label}
              </option>
            ))}
          </select>
        </div>

        {/* Selector de Pueblos/Ciudades */}
        <div className="selector-group">
          <label htmlFor="town-select">Selecciona una Ciudad:</label>
          <select
            id="town-select"
            value={selectedTown}
            onChange={handleTownChange}
            disabled={!selectedProvince}
          >
            <option value="">-- Selecciona una opción --</option>
            {towns.map(town => (
              <option key={town.code} value={town.code} data-key={town.code}>
                {town.label}
              </option>
            ))}
          </select>
        </div>

        {/* Botón de Envío */}
        <button
          onClick={handleSubmit}
          disabled={!selectedTown}
          className="submit-button"
        >
          Enviar
        </button>
      </div>
      <div className="ccaa">{communities.length} Comunidades</div>
      {/* Resultado */}
      {result && (
        <div className="result">
          <h3>Selección Enviada:</h3>
          <p>
            <strong>Provincia:</strong> {result.province}
          </p>
          <p>
            <strong>Ciudad:</strong> {result.town}
          </p>
        </div>
      )}
    </div>
  )
}
