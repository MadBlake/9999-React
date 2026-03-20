import { useState } from 'react';

/**
 * Ejemplo 5: Formulario Complejo con Múltiples Campos
 * 
 * Patrón: Usar un objeto único de estado en lugar de múltiples useState
 * Implementar una función genérica handleChange que ajuste automáticamente
 * todos los campos según su atributo 'name'
 */

interface FormData {
  nombre: string;
  email: string;
  emailConfirm: string;
  password: string;
  passwordConfirm: string;
  edad: string;
  pais: string;
  newsletter: boolean;
  aceptarTerminos: boolean;
}

export default function FormularioCompleto() {
  const [datos, setDatos] = useState<FormData>({
    nombre: '',
    email: '',
    emailConfirm: '',
    password: '',
    passwordConfirm: '',
    edad: '',
    pais: '',
    newsletter: false,
    aceptarTerminos: false,
  });

  const [enviado, setEnviado] = useState(false);

  /**
   * Función genérica para manejar cualquier input
   * Usa el atributo 'name' del input para saber qué campo actualizar
   * Tipo computed property: [name]: valorFinal
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, type } = e.target as HTMLInputElement;
    const value = e.target.value;

    // Para checkboxes, usar 'checked', para otros 'value'
    const checked = (e.target as HTMLInputElement).checked;
    const valorFinal = type === 'checkbox' ? checked : value;

    // Actualizar estado dinámicamente
    setDatos(prevDatos => ({
      ...prevDatos,
      [name]: valorFinal, // Computed Property Name de ES6
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    if (!datos.nombre || !datos.email || !datos.password) {
      alert('Por favor rellena todos los campos obligatorios');
      return;
    }

    // Validación de emails coinciden
    if (datos.email !== datos.emailConfirm) {
      alert('Los emails no coinciden');
      return;
    }

    // Validación de contraseñas coinciden
    if (datos.password !== datos.passwordConfirm) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (!datos.aceptarTerminos) {
      alert('Debes aceptar los términos');
      return;
    }

    console.log('Datos del formulario:', datos);
    setEnviado(true);

    // Reset después de 2 segundos
    setTimeout(() => {
      setDatos({
        nombre: '',
        email: '',
        emailConfirm: '',
        password: '',
        passwordConfirm: '',
        edad: '',
        pais: '',
        newsletter: false,
        aceptarTerminos: false,
      });
      setEnviado(false);
    }, 2000);
  };

  const isFormValid =
    datos.nombre.trim() !== '' &&
    datos.email !== '' &&
    datos.emailConfirm !== '' &&
    datos.email === datos.emailConfirm &&
    datos.email.includes('@') &&
    datos.password.length >= 6 &&
    datos.passwordConfirm.length >= 6 &&
    datos.password === datos.passwordConfirm &&
    datos.aceptarTerminos;

  return (
    <div className="ejemplo">
      <h2>5️⃣ Formulario Completo con Múltiples Campos</h2>

      {enviado ? (
        <div className="success-box">
          <h3>✅ Formulario enviado exitosamente!</h3>
          <p>Los datos serán procesados en breve...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="formulario-completo">
          {/* NOMBRE */}
          <div className="form-group">
            <label htmlFor="nombre">Nombre *</label>
            <input
              id="nombre"
              type="text"
              name="nombre"
              value={datos.nombre}
              onChange={handleChange}
              placeholder="Tu nombre completo"
              className="input-field"
              required
            />
          </div>

          {/* EMAIL */}
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              type="email"
              name="email"
              value={datos.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              className="input-field"
              required
            />
            {datos.email && !datos.email.includes('@') && (
              <small className="error-text">Email inválido</small>
            )}
          </div>

          {/* VERIFICAR EMAIL */}
          <div className="form-group">
            <label htmlFor="emailConfirm">Confirmar Email *</label>
            <input
              id="emailConfirm"
              type="email"
              name="emailConfirm"
              value={datos.emailConfirm}
              onChange={handleChange}
              placeholder="Confirma tu email"
              className="input-field"
              required
            />
            {datos.emailConfirm && datos.email !== datos.emailConfirm && (
              <small className="error-text">❌ Los emails no coinciden</small>
            )}
            {datos.emailConfirm && datos.email === datos.emailConfirm && (
              <small className="success-text">✓ Los emails coinciden</small>
            )}
          </div>

          {/* PASSWORD */}
          <div className="form-group">
            <label htmlFor="password">Contraseña * (Mín. 6 caracteres)</label>
            <input
              id="password"
              type="password"
              name="password"
              value={datos.password}
              onChange={handleChange}
              placeholder="Contraseña segura"
              className="input-field"
              required
            />
            {datos.password.length > 0 && (
              <small className={datos.password.length >= 6 ? 'success-text' : 'error-text'}>
                {datos.password.length} caracteres
              </small>
            )}
          </div>

          {/* VERIFICAR PASSWORD */}
          <div className="form-group">
            <label htmlFor="passwordConfirm">Confirmar Contraseña *</label>
            <input
              id="passwordConfirm"
              type="password"
              name="passwordConfirm"
              value={datos.passwordConfirm}
              onChange={handleChange}
              placeholder="Confirma tu contraseña"
              className="input-field"
              required
            />
            {datos.passwordConfirm && datos.password !== datos.passwordConfirm && (
              <small className="error-text">❌ Las contraseñas no coinciden</small>
            )}
            {datos.passwordConfirm && datos.password === datos.passwordConfirm && datos.password.length >= 6 && (
              <small className="success-text">✓ Las contraseñas coinciden</small>
            )}
          </div>

          {/* EDAD - OPCIONAL */}
          <div className="form-group">
            <label htmlFor="edad">Edad (Opcional)</label>
            <input
              id="edad"
              type="number"
              name="edad"
              value={datos.edad}
              onChange={handleChange}
              placeholder="Tu edad"
              className="input-field"
              min="18"
              max="120"
            />
          </div>

          {/* PAÍS */}
          <div className="form-group">
            <label htmlFor="pais">País (Opcional)</label>
            <select
              id="pais"
              name="pais"
              value={datos.pais}
              onChange={handleChange}
              className="select-field"
            >
              <option value="">-- Selecciona un país --</option>
              <option value="es">España</option>
              <option value="mx">México</option>
              <option value="ar">Argentina</option>
              <option value="col">Colombia</option>
            </select>
          </div>

          {/* NEWSLETTER - CHECKBOX */}
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="newsletter"
                checked={datos.newsletter}
                onChange={handleChange}
              />
              Deseo recibir newsletters
            </label>
          </div>

          {/* TÉRMINOS - CHECKBOX OBLIGATORIO */}
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="aceptarTerminos"
                checked={datos.aceptarTerminos}
                onChange={handleChange}
                required
              />
              <strong>Acepto los términos y condiciones *</strong>
            </label>
          </div>

          {/* BOTONES */}
          <div className="button-group">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!isFormValid}
            >
              Enviar formulario
            </button>
            <button
              type="reset"
              onClick={() =>
                setDatos({
                  nombre: '',
                  email: '',
                  emailConfirm: '',
                  password: '',
                  passwordConfirm: '',
                  edad: '',
                  pais: '',
                  newsletter: false,
                  aceptarTerminos: false,
                })
              }
              className="btn btn-secondary"
            >
              Limpiar formulario
            </button>
          </div>
        </form>
      )}

      {/* INFORMACIÓN EDUCATIVA */}
      <div className="info-box" style={{ marginTop: '20px' }}>
        <h3>Patrón usado en este ejemplo:</h3>
        <pre className="code-block">{`const handleChange = (e) => {
  const { name, type, checked, value } = e.target;
  const valorFinal = type === 'checkbox' ? checked : value;
  
  setDatos(prevDatos => ({
    ...prevDatos,
    [name]: valorFinal  // Computed Property
  }));
};`}</pre>
      </div>

      {/* VISTA PREVIA DE DATOS */}
      <div className="preview-box">
        <h3>Estado actual del formulario:</h3>
        <pre className="code-output">
          {JSON.stringify(datos, null, 2)}
        </pre>
      </div>
    </div>
  );
}
