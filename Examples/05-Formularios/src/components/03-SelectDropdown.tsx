import { useState } from 'react';

/**
 * Ejemplo 3: Select (dropdown) controlado
 * En HTML: select usa el atributo 'selected' en options
 * En React: select usa el atributo 'value' (igual que input)
 */
export default function SelectDropdown() {
  const [pais, setPais] = useState('');
  const [ciudad, setCiudad] = useState('');

  // Datos: paises y sus ciudades
  const ciudadesPorPais: Record<string, string[]> = {
    es: ['Madrid', 'Barcelona', 'Valencia', 'Sevilla'],
    mx: ['CDMX', 'Guadalajara', 'Monterrey', 'Cancún'],
    ar: ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza'],
    col: ['Bogotá', 'Medellín', 'Cali', 'Barranquilla'],
  };

  const paises = [
    { value: '', label: '-- Selecciona un país --' },
    { value: 'es', label: '🇪🇸 España' },
    { value: 'mx', label: '🇲🇽 México' },
    { value: 'ar', label: '🇦🇷 Argentina' },
    { value: 'col', label: '🇨🇴 Colombia' },
  ];

  // Reiniciar ciudad cuando cambia país
  const handlePaisChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPais(e.target.value);
    setCiudad(''); // Reset ciudad
  };

  const ciudadesDisponibles = pais ? ciudadesPorPais[pais] || [] : [];

  return (
    <div className="ejemplo">
      <h2>3️⃣ Select (Dropdown) Controlado</h2>
      
      <div className="form-group">
        <label>País:</label>
        <select
          value={pais}
          onChange={handlePaisChange}
          className="select-field"
        >
          {paises.map(p => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      {pais && (
        <div className="form-group">
          <label>Ciudad:</label>
          <select
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
            className="select-field"
          >
            <option value="">-- Selecciona una ciudad --</option>
            {ciudadesDisponibles.map(c => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="info-box">
        {pais && ciudad ? (
          <p>
            <strong>Seleccionaste:</strong> {ciudad}, {
              paises.find(p => p.value === pais)?.label.split(' ')[1]
            }
          </p>
        ) : (
          <p className="example-text">
            Los select dependientes es un caso típico de formularios controlados
          </p>
        )}
      </div>

      {pais && !ciudad && (
        <div className="warning-box">
          ⚠️ Por favor selecciona una ciudad
        </div>
      )}

      <div className="form-group">
        <button 
          onClick={() => {
            setPais('');
            setCiudad('');
          }}
          className="btn btn-reset"
        >
          Resetear selección
        </button>
      </div>
    </div>
  );
}
