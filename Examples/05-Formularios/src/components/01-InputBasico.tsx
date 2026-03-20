import { useState } from 'react';

/**
 * Ejemplo 1: Input básico controlado
 * Demuestra los 4 pasos:
 * 1. Crear estado con useState
 * 2. Vincular value al estado
 * 3. Manejar onChange
 * 4. Re-render automático
 */
export default function InputBasico() {
  // Paso 1: Crear estado
  const [nombre, setNombre] = useState('');

  // Paso 3: Manejar el evento change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNombre(e.target.value);
  };

  // Ejemplo de transformación: convertir a mayúsculas
  const handleChangeMayusculas = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNombre(e.target.value.toUpperCase());
  };

  return (
    <div className="ejemplo">
      <h2>1️⃣ Input Basico Controlado</h2>
      
      <div className="form-group">
        <label>Tu nombre (Texto normal):</label>
        <input
          type="text"
          value={nombre}
          onChange={handleChange}
          placeholder="Escribe aquí..."
          className="input-field"
        />
      </div>

      <div className="info-box">
        <p><strong>Valor actual:</strong> {nombre || '(vacío)'}</p>
        <p><strong>Longitud:</strong> {nombre.length} caracteres</p>
      </div>

      <div className="form-group">
        <label>Tu nombre (Forzar MAYÚSCULAS):</label>
        <input
          type="text"
          value={nombre}
          onChange={handleChangeMayusculas}
          placeholder="Se fuerza a mayúsculas..."
          className="input-field"
        />
      </div>

      <div className="info-box">
        <p className="example-text">
          El input controlado permite transformar datos ANTES de guardarlos en estado.
        </p>
      </div>

      <div className="form-group">
        <button 
          onClick={() => setNombre('')} 
          className="btn btn-reset"
          disabled={nombre.length === 0}
        >
          Limpiar
        </button>
      </div>
    </div>
  );
}
