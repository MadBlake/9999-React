import { useForm } from 'react-hook-form';
import { useState } from 'react';

/**
 * Ejemplo 7: Formulario con React Hook Form
 * 
 * React Hook Form es una librería que:
 * - Minimiza re-renders
 * - Usa "uncontrolled components" internamente
 * - Ofrece validación integrada
 * - Mejor rendimiento que formularios controlados
 * 
 * Ventajas:
 * ✓ Menos código que useState
 * ✓ Mejor rendimiento (menos re-renders)
 * ✓ Manejo automático de errores
 * ✓ Soporte para validación asíncrona
 * ✓ Integración fácil con librerías de UI
 */

interface FormData {
  nombre: string;
  email: string;
  emailConfirm: string;
  password: string;
  passwordConfirm: string;
  edad?: string;
  pais: string;
  newsletter: boolean;
  aceptarTerminos: boolean;
}

export default function FormularioReactHookForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    mode: 'onBlur', // Validar al abandonar el campo (como el ejemplo 6)
    defaultValues: {
      nombre: '',
      email: '',
      emailConfirm: '',
      password: '',
      passwordConfirm: '',
      edad: '',
      pais: '',
      newsletter: false,
      aceptarTerminos: false,
    },
  });

  const [enviado, setEnviado] = useState(false);

  // Watch para obtener valores en tiempo real (para validaciones dependientes)
  const password = watch('password');
  const email = watch('email');

  const onSubmit = (datos: FormData) => {
    console.log('Datos del formulario:', datos);
    setEnviado(true);

    setTimeout(() => {
      setEnviado(false);
      reset();
    }, 2000);
  };

  return (
    <div className="ejemplo">
      <h2>7️⃣ Formulario con React Hook Form</h2>

      {enviado ? (
        <div className="success-box">
          <h3>✅ Formulario enviado exitosamente!</h3>
          <p>Los datos hanziado procesados...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="formulario-completo">
          {/* NOMBRE */}
          <div className="form-group">
            <label htmlFor="nombre">Nombre *</label>
            <input
              id="nombre"
              type="text"
              placeholder="Tu nombre completo"
              className={`input-field ${errors.nombre ? 'input-error' : ''}`}
              {...register('nombre', {
                required: 'El nombre es requerido',
                minLength: {
                  value: 3,
                  message: 'El nombre debe tener al menos 3 caracteres',
                },
                validate: (value) => {
                  return value.trim().length > 0 || 'El nombre no puede estar vacío';
                },
              })}
            />
            {errors.nombre && <small className="error-text">❌ {errors.nombre.message}</small>}
          </div>

          {/* EMAIL */}
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              type="email"
              placeholder="tu@email.com"
              className={`input-field ${errors.email ? 'input-error' : ''}`}
              {...register('email', {
                required: 'El email es requerido',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Email inválido',
                },
              })}
            />
            {errors.email && <small className="error-text">❌ {errors.email.message}</small>}
          </div>

          {/* EMAIL CONFIRM */}
          <div className="form-group">
            <label htmlFor="emailConfirm">Confirmar Email *</label>
            <input
              id="emailConfirm"
              type="email"
              placeholder="Confirma tu email"
              className={`input-field ${errors.emailConfirm ? 'input-error' : ''}`}
              {...register('emailConfirm', {
                required: 'Debes confirmar el email',
                validate: (value) => value === email || 'Los emails no coinciden',
              })}
            />
            {errors.emailConfirm && (
              <small className="error-text">❌ {errors.emailConfirm.message}</small>
            )}
          </div>

          {/* PASSWORD */}
          <div className="form-group">
            <label htmlFor="password">
              Contraseña * (Mín. 6 caracteres, mayúscula y número)
            </label>
            <input
              id="password"
              type="password"
              placeholder="Contraseña segura"
              className={`input-field ${errors.password ? 'input-error' : ''}`}
              {...register('password', {
                required: 'La contraseña es requerida',
                minLength: {
                  value: 6,
                  message: 'La contraseña debe tener al menos 6 caracteres',
                },
                validate: {
                  hasUpperCase: (value) =>
                    /[A-Z]/.test(value) || 'Debe contener al menos una mayúscula',
                  hasNumber: (value) => /[0-9]/.test(value) || 'Debe contener al menos un número',
                },
              })}
            />
            {errors.password && (
              <small className="error-text">❌ {errors.password.message}</small>
            )}
          </div>

          {/* PASSWORD CONFIRM */}
          <div className="form-group">
            <label htmlFor="passwordConfirm">Confirmar Contraseña *</label>
            <input
              id="passwordConfirm"
              type="password"
              placeholder="Confirma tu contraseña"
              className={`input-field ${errors.passwordConfirm ? 'input-error' : ''}`}
              {...register('passwordConfirm', {
                required: 'Debes confirmar la contraseña',
                validate: (value) => value === password || 'Las contraseñas no coinciden',
              })}
            />
            {errors.passwordConfirm && (
              <small className="error-text">❌ {errors.passwordConfirm.message}</small>
            )}
          </div>

          {/* EDAD */}
          <div className="form-group">
            <label htmlFor="edad">Edad (Opcional)</label>
            <input
              id="edad"
              type="number"
              placeholder="Tu edad"
              className="input-field"
              {...register('edad', {
                validate: {
                  isNumber: (value) => {
                    if (!value) return true; // Es opcional
                    const num = Number(value);
                    return (
                      (num >= 18 && num <= 120) || 'La edad debe estar entre 18 y 120 años'
                    );
                  },
                },
              })}
            />
          </div>

          {/* PAÍS */}
          <div className="form-group">
            <label htmlFor="pais">País (Opcional)</label>
            <select id="pais" className="select-field" {...register('pais')}>
              <option value="">-- Selecciona un país --</option>
              <option value="es">España</option>
              <option value="mx">México</option>
              <option value="ar">Argentina</option>
              <option value="col">Colombia</option>
            </select>
          </div>

          {/* NEWSLETTER */}
          <div className="form-group">
            <label className="checkbox-label">
              <input type="checkbox" {...register('newsletter')} />
              Deseo recibir newsletters
            </label>
          </div>

          {/* TÉRMINOS */}
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                {...register('aceptarTerminos', {
                  required: 'Debes aceptar los términos',
                })}
              />
              <strong>Acepto los términos y condiciones *</strong>
            </label>
            {errors.aceptarTerminos && (
              <small className="error-text">❌ {errors.aceptarTerminos.message}</small>
            )}
          </div>

          {/* BOTONES */}
          <div className="button-group">
            <button type="submit" className="btn btn-primary">
              Enviar formulario
            </button>
            <button
              type="button"
              onClick={() => reset()}
              className="btn btn-secondary"
            >
              Limpiar formulario
            </button>
          </div>
        </form>
      )}

      {/* INFORMACIÓN EDUCATIVA */}
      <div className="info-box" style={{ marginTop: '20px' }}>
        <h3>Característica clave: register()</h3>
        <pre className="code-block">{`// register() vincula el input a react-hook-form
<input
  {...register('nombre', {
    required: 'El nombre es requerido',
    minLength: {
      value: 3,
      message: 'Mín. 3 caracteres'
    }
  })}
/>

// Acceder a errores
{errors.nombre && <span>{errors.nombre.message}</span>}`}</pre>
      </div>

      {/* VENTAJAS */}
      <div className="preview-box">
        <h3>✨ Ventajas vs formularios controlados:</h3>
        <ul style={{ marginLeft: '1.5rem' }}>
          <li>✓ Menos código (no necesitas useState por cada campo)</li>
          <li>✓ Menos re-renders (mejor rendimiento)</li>
          <li>✓ Validación integrada y decriptiva</li>
          <li>✓ Manejo automático de errores</li>
          <li>✓ watch() para dependencias entre campos</li>
          <li>✓ Soporte para validación asíncrona</li>
          <li>✓ Integración con UI frameworks</li>
        </ul>
      </div>
    </div>
  );
}