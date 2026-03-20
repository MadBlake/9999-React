import { useState } from 'react';

/**
 * Ejemplo 2: Textarea controlado
 * En HTML: textarea usa texto hijo
 * En React: textarea usa el atributo 'value' (igual que input)
 */
export default function TextAreaDemo() {
  const [mensaje, setMensaje] = useState('');
  const [contador, setContador] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const texto = e.target.value;
    setMensaje(texto);
    // Contar palabras
    const palabras = texto.trim().split(/\s+/).filter(p => p.length > 0).length;
    setContador(palabras);
  };

  const handleSave = () => {
    if (mensaje.trim()) {
      alert(`Mensaje guardado:\n\n"${mensaje.substring(0, 50)}..."`);
      setMensaje('');
    }
  };

  return (
    <div className="ejemplo">
      <h2>2️⃣ Textarea Controlado</h2>
      
      <div className="form-group">
        <label>Escribe tu mensaje:</label>
        <textarea
          value={mensaje}
          onChange={handleChange}
          placeholder="Escribe un mensaje largo aquí..."
          rows={5}
          className="textarea-field"
        />
      </div>

      <div className="info-box">
        <p><strong>Caracteres:</strong> {mensaje.length}</p>
        <p><strong>Palabras:</strong> {contador}</p>
        <p><strong>Límite:</strong> {Math.max(0, 200 - mensaje.length)} caracteres restantes</p>
      </div>

      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{
            width: `${Math.min((mensaje.length / 200) * 100, 100)}%`,
            backgroundColor: mensaje.length > 180 ? '#ff6b6b' : '#51cf66'
          }}
        />
      </div>

      <div className="form-group">
        <button 
          onClick={handleSave}
          className="btn btn-primary"
          disabled={mensaje.trim().length === 0}
        >
          Guardar mensaje
        </button>
        <button 
          onClick={() => setMensaje('')}
          className="btn btn-secondary"
        >
          Limpiar
        </button>
      </div>

      <div className="preview-box">
        <h3>Vista previa:</h3>
        <p>{mensaje || '(nada escrito)'}</p>
      </div>
    </div>
  );
}
