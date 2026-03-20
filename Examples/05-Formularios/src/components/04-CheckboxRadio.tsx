import { useState } from 'react';

/**
 * Ejemplo 4: Checkboxes y Radio Buttons
 * DIFERENCIA CRÍTICA:
 * - Checkboxes usan 'checked' en lugar de 'value'
 * - Radio buttons también usan 'checked'
 * - En onChange, leer e.target.checked, no e.target.value
 */
export default function CheckboxRadio() {
  // Checkbox: permite múltiples selecciones
  const [hobbies, setHobbies] = useState<string[]>([]);
  
  // Radio button: solo una selección
  const [experiencia, setExperiencia] = useState('');
  
  // Checkbox individual
  const [aceptarTerminos, setAceptarTerminos] = useState(false);

  const handleHobbyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hobby = e.target.value;
    const checked = e.target.checked;

    if (checked) {
      // Agregar hobby
      setHobbies([...hobbies, hobby]);
    } else {
      // Remover hobby
      setHobbies(hobbies.filter(h => h !== hobby));
    }
  };

  const hobbyOptions = [
    { value: 'programacion', label: 'Programación' },
    { value: 'musica', label: 'Música' },
    { value: 'deporte', label: 'Deporte' },
    { value: 'lectura', label: 'Lectura' },
    { value: 'viajes', label: 'Viajes' },
  ];

  const experienciaOptions = [
    { value: 'basico', label: 'Básico (< 1 año)' },
    { value: 'intermedio', label: 'Intermedio (1-3 años)' },
    { value: 'avanzado', label: 'Avanzado (3+ años)' },
  ];

  return (
    <div className="ejemplo">
      <h2>4️⃣ Checkboxes y Radio Buttons</h2>

      {/* CHECKBOXES - Múltiples selecciones */}
      <div className="form-section">
        <h3>Checkboxes (Múltiples selecciones)</h3>
        <div className="checkbox-group">
          {hobbyOptions.map(option => (
            <label key={option.value} className="checkbox-label">
              <input
                type="checkbox"
                value={option.value}
                checked={hobbies.includes(option.value)}
                onChange={handleHobbyChange}
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      <div className="info-box">
        <p><strong>Hobbies seleccionados:</strong></p>
        {hobbies.length > 0 ? (
          <ul>
            {hobbies.map(h => (
              <li key={h}>✓ {hobbyOptions.find(o => o.value === h)?.label}</li>
            ))}
          </ul>
        ) : (
          <p className="example-text">(Ninguno seleccionado)</p>
        )}
      </div>

      {/* RADIO BUTTONS - Una sola selección */}
      <div className="form-section">
        <h3>Radio Buttons (Una sola selección)</h3>
        <div className="radio-group">
          {experienciaOptions.map(option => (
            <label key={option.value} className="radio-label">
              <input
                type="radio"
                name="experiencia"
                value={option.value}
                checked={experiencia === option.value}
                onChange={(e) => setExperiencia(e.target.value)}
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      <div className="info-box">
        <p><strong>Experiencia seleccionada:</strong> {
          experienciaOptions.find(o => o.value === experiencia)?.label
        }</p>
      </div>

      {/* CHECKBOX INDIVIDUAL - Típicamente para términos */}
      <div className="form-section">
        <h3>Checkbox Individual</h3>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={aceptarTerminos}
            onChange={(e) => setAceptarTerminos(e.target.checked)}
          />
          Acepto los términos y condiciones
        </label>
      </div>

      <div className="form-group">
        <button 
          className="btn btn-primary"
          disabled={!aceptarTerminos || hobbies.length === 0}
        >
          Enviar formulario
        </button>
      </div>

      <div className="info-box" style={{ marginTop: '20px' }}>
        <p><strong>⚠️ Nota importante:</strong> Los checkboxes usan 'checked' en lugar de 'value'</p>
        <p>En onChange, leer <code>e.target.checked</code>, no <code>e.target.value</code></p>
      </div>
    </div>
  );
}
