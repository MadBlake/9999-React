import { useState, useEffect } from 'react'
import { Community, Province, Town } from '../types'
import './ProvinceSelector.css'

interface DataState {
  communities: Community[]
  provinces: { [key: string]: Province[] } // Cacheadas por comunidad
  towns: { [key: string]: Town[] } // Cacheadas por provincia
  loading: boolean
  error: string | null
}

export default function ProvinceSelector() {
  const [data, setData] = useState<DataState>({
    communities: [],
    provinces: {},
    towns: {},
    loading: true,
    error: null,
  })

  const [selectedCommunity, setSelectedCommunity] = useState<string>('')
  const [selectedProvince, setSelectedProvince] = useState<string>('')
  const [selectedTown, setSelectedTown] = useState<string>('')
  const [result, setResult] = useState<{ province: string; town: string } | null>(null)

  // Cargar comunidades al iniciar
  useEffect(() => {
    const loadCommunities = async () => {
      try {
        const response = await fetch('./src/data/ccaa.json')
        if (!response.ok) throw new Error('Error cargando comunidades')
        
        const communities: Community[] = await response.json()
        
        setData(prev => ({
          ...prev,
          communities,
          loading: false,
          error: null,
        }))
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
        setData(prev => ({
          ...prev,
          loading: false,
          error: `Error al cargar comunidades: ${errorMessage}`,
        }))
      }
    }

    loadCommunities()
  }, [])

  // Cargar provincias cuando se selecciona una comunidad
  useEffect(() => {
    if (!selectedCommunity) return

    // Si ya tenemos en cache, no cargar
    if (data.provinces[selectedCommunity]) {
      return
    }

    const loadProvinces = async () => {
      try {
        const response = await fetch('./src/data/provincias.json')
        if (!response.ok) throw new Error('Error cargando provincias')
        
        const allProvinces: Province[] = await response.json()
        const provincesForCommunity = allProvinces.filter(p => p.parent_code === selectedCommunity)

        setData(prev => ({
          ...prev,
          provinces: {
            ...prev.provinces,
            [selectedCommunity]: provincesForCommunity,
          },
        }))
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
        setData(prev => ({
          ...prev,
          error: `Error al cargar provincias: ${errorMessage}`,
        }))
      }
    }

    loadProvinces()
  }, [selectedCommunity, data.provinces])

  // Cargar ciudades cuando se selecciona una provincia
  useEffect(() => {
    if (!selectedProvince) return

    // Si ya tenemos en cache, no cargar
    if (data.towns[selectedProvince]) {
      return
    }

    const loadTowns = async () => {
      try {
        const response = await fetch('./src/data/poblaciones.json')
        if (!response.ok) throw new Error('Error cargando ciudades')
        
        const allTowns: Town[] = await response.json()
        const townsForProvince = allTowns.filter(t => t.parent_code === selectedProvince)

        setData(prev => ({
          ...prev,
          towns: {
            ...prev.towns,
            [selectedProvince]: townsForProvince,
          },
        }))
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
        setData(prev => ({
          ...prev,
          error: `Error al cargar ciudades: ${errorMessage}`,
        }))
      }
    }

    loadTowns()
  }, [selectedProvince, data.towns])

  const provinces = selectedCommunity ? (data.provinces[selectedCommunity] || []) : []
  const towns = selectedProvince ? (data.towns[selectedProvince] || []) : []

  const handleCommunityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCommunity = e.target.value
    setSelectedCommunity(newCommunity)
    setSelectedProvince('')
    setSelectedTown('')
  }

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newProvince = e.target.value
    setSelectedProvince(newProvince)
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

  // Mientras se cargan las comunidades iniciales
  if (data.loading) {
    return <div className="province-selector"><p>Cargando comunidades...</p></div>
  }

  // Si hay error crítico
  if (data.error && data.communities.length === 0) {
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
            disabled={!selectedCommunity || provinces.length === 0}
          >
            <option value="">
              {selectedCommunity && provinces.length === 0 ? 'Cargando...' : '-- Selecciona una opción --'}
            </option>
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
            disabled={!selectedProvince || towns.length === 0}
          >
            <option value="">
              {selectedProvince && towns.length === 0 ? 'Cargando...' : '-- Selecciona una opción --'}
            </option>
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
