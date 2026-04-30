import { useState } from 'react'
import ccaaData from '../data/ccaa.json'
import provinciasData from '../data/provincias.json'
import poblacionesData from '../data/poblaciones.json'
import { Province, Town } from '../types'
import './ProvinceSelector.css'

// Mapear provincias por código de comunidad
const PROVINCES_BY_COMMUNITY: { [key: string]: Province[] } = {}

// Inicializar diccionarios desde datos
provinciasData.forEach((province: Province) => {
  if (!PROVINCES_BY_COMMUNITY[province.parent_code]) {
    PROVINCES_BY_COMMUNITY[province.parent_code] = []
  }
  PROVINCES_BY_COMMUNITY[province.parent_code].push(province)
})

// Mapear ciudades por código de provincia
const TOWNS_BY_PROVINCE: { [key: string]: Town[] } = {}
poblacionesData.forEach((town: Town) => {
  if (!TOWNS_BY_PROVINCE[town.parent_code]) {
    TOWNS_BY_PROVINCE[town.parent_code] = []
  }
  TOWNS_BY_PROVINCE[town.parent_code].push(town)
})

export default function ProvinceSelector() {
  const [selectedCommunity, setSelectedCommunity] = useState<string>('')
  const [selectedProvince, setSelectedProvince] = useState<string>('')
  const [selectedTown, setSelectedTown] = useState<string>('')
  const [result, setResult] = useState<{ province: string; town: string } | null>(null)

  const provinces = selectedCommunity ? PROVINCES_BY_COMMUNITY[selectedCommunity] || [] : []
  const towns = selectedProvince ? TOWNS_BY_PROVINCE[selectedProvince] || [] : []

  const handleCommunityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCommunity(e.target.value)
    setSelectedProvince('')
    setSelectedTown('')
  }

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProvince(e.target.value)
    setSelectedTown('')
  }

  const handleTownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTown(e.target.value)
  }

  const handleSubmit = () => {
    if (selectedProvince && selectedTown) {
      const province = provinces.find(p => p.code === selectedProvince)
      const town = towns.find(t => t.code === selectedTown)
      
      if (province && town) {
        setResult({
          province: province.label,
          town: town.label
        })
        
        setSelectedCommunity('')
        setSelectedProvince('')
        setSelectedTown('')
      }
    }
  }

  return (
    <div className="province-selector">
      <div className="selectors-container">
        <div className="selector-group">
          <label htmlFor="community-select">Selecciona una Comunidad:</label>
          <select
            id="community-select"
            value={selectedCommunity}
            onChange={handleCommunityChange}
          >
            <option value="">-- Selecciona una opción --</option>
            {ccaaData.map(community => (
              <option key={community.code} value={community.code}>
                {community.label}
              </option>
            ))}
          </select>
        </div>

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
              <option key={province.code} value={province.code}>
                {province.label}
              </option>
            ))}
          </select>
        </div>

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
              <option key={town.code} value={town.code}>
                {town.label}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!selectedTown}
          className="submit-button"
        >
          Enviar
        </button>
      </div>

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
