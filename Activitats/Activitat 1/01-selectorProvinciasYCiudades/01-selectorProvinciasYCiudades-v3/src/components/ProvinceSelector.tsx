import { useState, useEffect } from 'react'
import { Province, Town, Community } from '../types'
import './ProvinceSelector.css'

interface DataState {
  communities: Community[]
  provinces: Province[]
  towns: Town[]
  loading: boolean
  error: string | null
}

interface LookupsState {
  provincesByCode: { [key: string]: Province[] }
  townsByCode: { [key: string]: Town[] }
}

export default function ProvinceSelector() {
  const [data, setData] = useState<DataState>({
    communities: [],
    provinces: [],
    towns: [],
    loading: true,
    error: null,
  })

  const [lookups, setLookups] = useState<LookupsState>({
    provincesByCode: {},
    townsByCode: {},
  })

  const [selectedCommunity, setSelectedCommunity] = useState<string>('')
  const [selectedProvince, setSelectedProvince] = useState<string>('')
  const [selectedTown, setSelectedTown] = useState<string>('')
  const [result, setResult] = useState<{ province: string; town: string } | null>(null)

  // useEffect para cargar los datos la primera vez
  useEffect(() => {
    const loadData = async () => {
      try {
        // Cargar los JSONs de forma asincróna
        const [ccaaResponse, provinciasResponse, poblacionesResponse] = await Promise.all([
          fetch('./src/data/ccaa.json'),
          fetch('./src/data/provincias.json'),
          fetch('./src/data/poblaciones.json'),
        ])

        if (!ccaaResponse.ok || !provinciasResponse.ok || !poblacionesResponse.ok) {
          throw new Error('Error cargando los datos')
        }

        const communities: Community[] = await ccaaResponse.json()
        const provinces: Province[] = await provinciasResponse.json()
        const towns: Town[] = await poblacionesResponse.json()

        // Crear los lookups (diccionarios para búsquedas O(1))
        const provincesByCode: { [key: string]: Province[] } = {}
        provinces.forEach((province: Province) => {
          if (!provincesByCode[province.parent_code]) {
            provincesByCode[province.parent_code] = []
          }
          provincesByCode[province.parent_code].push(province)
        })

        const townsByCode: { [key: string]: Town[] } = {}
        towns.forEach((town: Town) => {
          if (!townsByCode[town.parent_code]) {
            townsByCode[town.parent_code] = []
          }
          townsByCode[town.parent_code].push(town)
        })

        // Actualizar estado con los datos cargados
        setData({
          communities,
          provinces,
          towns,
          loading: false,
          error: null,
        })

        setLookups({
          provincesByCode,
          townsByCode,
        })
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
        setData(prev => ({
          ...prev,
          loading: false,
          error: `Error al cargar los datos: ${errorMessage}`,
        }))
      }
    }

    loadData()
  }, [])

  // Obtener provincias para la comunidad seleccionada
  const provinces = selectedCommunity ? (lookups.provincesByCode[selectedCommunity] || []) : []

  // Obtener ciudades para la provincia seleccionada
  const towns = selectedProvince ? (lookups.townsByCode[selectedProvince] || []) : []

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
          town: town.label,
        })

        setSelectedCommunity('')
        setSelectedProvince('')
        setSelectedTown('')
      }
    }
  }

  // Mientras se cargan los datos
  if (data.loading) {
    return <div className="province-selector"><p>Cargando datos...</p></div>
  }

  // Si hay error
  if (data.error) {
    return <div className="province-selector"><p style={{ color: 'red' }}>{data.error}</p></div>
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
            {data.communities.map(community => (
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
