import { useState } from 'react';

/**
 * Ejemplo 6: Formulario Avanzado con onBlur y Touched
 * 
 * Patrón más realista:
 * - Usar onBlur para marcar campos como "tocados"
 * - Mostrar errores SOLO si el campo fue tocado (touched) y tiene errores
 * - Mejor UX: no muestra errores mientras está escribiendo
 * - Solo valida cuando el usuario abandona el campo
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

interface Touched {
  nombre: boolean;
  email: boolean;
  emailConfirm: boolean;
  password: boolean;
  passwordConfirm: boolean;
  edad: boolean;
  pais: boolean;
  newsletter: boolean;
  aceptarTerminos: boolean;
}

interface Errores {
  nombre?: string;
  email?: string;
  emailConfirm?: string;
  password?: string;
  passwordConfirm?: string;
  edad?: string;
  pais?: string;
  aceptarTerminos?: string;
}

export default function FormularioAvanzado() {
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

  const [touched, setTouched] = useState<Touched>({
    nombre: false,
    email: false,
    emailConfirm: false,
    password: false,
    passwordConfirm: false,
    edad: false,
    pais: false,
    newsletter: false,
    aceptarTerminos: false,
  });

  const [enviado, setEnviado] = useState(false);

  /**
   * Validar un campo específico
   */
  const validarCampo = (nombre: keyof FormData, valor: string | boolean): string | undefined => {
    switch (nombre) {
      case 'nombre':
        if (!valor) return 'El nombre es requerido';
        if ((valor as string).trim().length < 3) return 'El nombre debe tener al menos 3 caracteres';
        return undefined;

      case 'email':
        if (!valor) return 'El email es requerido';
        if (!(valor as string).includes('@')) return 'Email inválido';
        return undefined;

      case 'emailConfirm':
        if (!valor) return 'Debes confirmar el email';
        if (valor !== datos.email) return 'Los emails no coinciden';
        return undefined;

      case 'password':
        if (!valor) return 'La contraseña es requerida';
        if ((valor as string).length < 6) return 'La contraseña debe tener al menos 6 caracteres';
        if (!/[A-Z]/.test(valor as string)) return 'Debe contener al menos una mayúscula';
        if (!/[0-9]/.test(valor as string)) return 'Debe contener al menos un número';
        return undefined;

      case 'passwordConfirm':
        if (!valor) return 'Debes confirmar la contraseña';
        if (valor !== datos.password) return 'Las contraseñas no coinciden';
        return undefined;

      case 'edad':
        if (valor && (isNaN(Number(valor)) || Number(valor) < 18 || Number(valor) > 120)) {
          return 'La edad debe estar entre 18 y 120 años';
        }
        return undefined;

      case 'aceptarTerminos':
        if (!valor) return 'Debes aceptar los términos';
        return undefined;

      default:
        return undefined;
    }
  };

  /**
   * Obtener todos los errores del formulario
   */
  const obtenerErrores = (): Errores => {
    const erroresObj: Errores = {};
    (Object.keys(datos) as Array<keyof FormData>).forEach(campo => {
      const error = validarCampo(campo, datos[campo]);
      if (error) {
        erroresObj[campo as keyof Errores] = error;
      }
    });
    return erroresObj;
  };

  const errores = obtenerErrores();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type } = e.target as HTMLInputElement;
    const value = e.target.value;
    const checked = (e.target as HTMLInputElement).checked;
    const valorFinal = type === 'checkbox' ? checked : value;

    setDatos(prevDatos => ({
      ...prevDatos,
      [name]: valorFinal,
    }));
  };

  /**
   * handleBlur: marcar campo como tocado cuando se abandona
   */
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched(prevTouched => ({
      ...prevTouched,
      [name]: true,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Marcar todos como tocados
    setTouched({
      nombre: true,
      email: true,
      emailConfirm: true,
      password: true,
      passwordConfirm: true,
      edad: true,
      pais: true,
      newsletter: true,
      aceptarTerminos: true,
    });

    // Validar que no haya errores
    if (Object.keys(errores).length > 0) {
      alert('Por favor corrige los errores en el formulario');
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
      setTouched({
        nombre: false,
        email: false,
        emailConfirm: false,
        password: false,
        passwordConfirm: false,
        edad: false,
        pais: false,
        newsletter: false,
        aceptarTerminos: false,
      });
      setEnviado(false);
    }, 2000);
  };

  const isFormValid = Object.keys(errores).length === 0;

  /**
   * Helper para renderizar campo input con validación onBlur
   */
  const renderInput = (
    fieldName: keyof FormData,
    label: string,
    type: string = 'text',
    placeholder: string = '',
    minAttr?: number,
    maxAttr?: number
  ) => {
    const hasError = touched[fieldName] && errores[fieldName as keyof Errores];

    return (
      <div className="form-group" key={fieldName}>
        <label htmlFor={fieldName}>{label}</label>
        <input
          id={fieldName}
          type={type}
          name={fieldName}
          value={datos[fieldName] as string}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`input-field ${hasError ? 'input-error' : ''}`}
          min={minAttr}
          max={maxAttr}
        />
        {hasError && (
          <small className="error-text">
            ❌ {errores[fieldName as keyof Errores]}
          </small>
        )}
        {touched[fieldName] && !hasError && datos[fieldName] !== '' && (
          <small className="success-text">✓ Válido</small>
        )}
      </div>
    );
  };

  return (
    <div className="ejemplo">
      <h2>6️⃣ Formulario Avanzado con onBlur y Touched</h2>

      {enviado ? (
        <div className="success-box">
          <h3>✅ Formulario enviado exitosamente!</h3>
          <p>Los datos serán procesados en breve...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="formulario-completo">
          {/* NOMBRE */}
          {renderInput('nombre', 'Nombre *', 'text', 'Tu nombre completo')}

          {/* EMAIL */}
          {renderInput('email', 'Email *', 'email', 'tu@email.com')}

          {/* VERIFICAR EMAIL */}
          {renderInput('emailConfirm', 'Confirmar Email *', 'email', 'Confirma tu email')}

          {/* PASSWORD */}
          {renderInput(
            'password',
            'Contraseña * (Mín. 6 caracteres, mayúscula y número)',
            'password',
            'Contraseña segura'
          )}

          {/* VERIFICAR PASSWORD */}
          {renderInput('passwordConfirm', 'Confirmar Contraseña *', 'password', 'Confirma tu contraseña')}

          {/* EDAD - OPCIONAL */}
          {renderInput('edad', 'Edad (Opcional)', 'number', 'Tu edad', 18, 120)}

          {/* PAÍS */}
          <div className="form-group">
            <label htmlFor="pais">País (Opcional)</label>
            <select
              id="pais"
              name="pais"
              value={datos.pais}
              onChange={handleChange}
              onBlur={handleBlur}
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
                onBlur={handleBlur}
              />
              <strong>Acepto los términos y condiciones *</strong>
            </label>
            {touched.aceptarTerminos && errores.aceptarTerminos && (
              <small className="error-text">❌ {errores.aceptarTerminos}</small>
            )}
          </div>

          {/* BOTONES */}
          <div className="button-group">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!isFormValid && Object.values(touched).some(Boolean)}
            >
              Enviar formulario
            </button>
            <button
              type="reset"
              onClick={() => {
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
                setTouched({
                  nombre: false,
                  email: false,
                  emailConfirm: false,
                  password: false,
                  passwordConfirm: false,
                  edad: false,
                  pais: false,
                  newsletter: false,
                  aceptarTerminos: false,
                });
              }}
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
        <pre className="code-block">{`// Estado para rastrear campos tocados
const [touched, setTouched] = useState({
  nombre: false,
  email: false,
  // ...
});

// onBlur: marcar como tocado
const handleBlur = (e) => {
  const { name } = e.target;
  setTouched(prev => ({
    ...prev,
    [name]: true,
  }));
};

// Mostrar error SOLO si tocado Y tiene error
{touched.nombre && errores.nombre && (
  <small className="error-text">{errores.nombre}</small>
)}`}</pre>
      </div>

      {/* VENTAJAS */}
      <div className="preview-box">
        <h3>✨ Ventajas de este patrón:</h3>
        <ul style={{ marginLeft: '1.5rem' }}>
          <li>❌ No muestra errores mientras escribes</li>
          <li>✓ Solo valida cuando abandonas el campo (onBlur)</li>
          <li>✓ Mejor UX: menos frustración</li>
          <li>✓ Validaciones más realistas (ej: contraseña con mayúscula + número)</li>
          <li>✓ Estado separado para "touched"</li>
          <li>✓ Los errores desaparecen al corregir</li>
        </ul>
      </div>

      {/* RESUMEN DE ESTADO */}
      <div className="preview-box">
        <h3>Estado actual:</h3>
        <pre className="code-output">
          {JSON.stringify(
            {
              datos,
              touched,
              errores: Object.keys(errores).length > 0 ? errores : 'Sin errores ✓',
            },
            null,
            2
          )}
        </pre>
      </div>
    </div>
  );
}
