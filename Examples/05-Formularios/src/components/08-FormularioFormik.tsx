import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

/**
 * Ejemplo 8: Formulario con Formik
 * 
 * Formik es una librería que:
 * - Maneja estado de formularios automáticamente
 * - Proporciona herramientas para validación
 * - Simplifica el manejo de errores
 * - Mejor para formularios complejos
 * 
 * Se suele usar con Yup para esquemas de validación declarativos
 * 
 * Ventajas:
 * ✓ Declarativo (describe qué validación necesitas)
 * ✓ Fácil manejo de errores y touched
 * ✓ Mejor para formularios grandes y complejos
 * ✓ Soporte para arrays de campos (FieldArray)
 * ✓ Mejor experiencia de desarrollador
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

// Esquema de validación con Yup (declarativo)
const validationSchema = Yup.object().shape({
  nombre: Yup.string()
    .required('El nombre es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .trim(),
  email: Yup.string()
    .email('Email inválido')
    .required('El email es requerido'),
  emailConfirm: Yup.string()
    .required('Debes confirmar el email')
    .oneOf([Yup.ref('email')], 'Los emails no coinciden'),
  password: Yup.string()
    .required('La contraseña es requerida')
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .matches(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .matches(/[0-9]/, 'Debe contener al menos un número'),
  passwordConfirm: Yup.string()
    .required('Debes confirmar la contraseña')
    .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden'),
  edad: Yup.number().typeError('La edad debe ser un número').min(18).max(120),
  pais: Yup.string(),
  newsletter: Yup.boolean(),
  aceptarTerminos: Yup.boolean()
    .oneOf([true], 'Debes aceptar los términos y condiciones'),
});

export default function FormularioFormik() {
  const [enviado, setEnviado] = useState(false);

  const initialValues: FormData = {
    nombre: '',
    email: '',
    emailConfirm: '',
    password: '',
    passwordConfirm: '',
    edad: '',
    pais: '',
    newsletter: false,
    aceptarTerminos: false,
  };

  const handleSubmit = (valores: FormData, { resetForm }: { resetForm: () => void }) => {
    console.log('Datos del formulario:', valores);
    setEnviado(true);

    setTimeout(() => {
      setEnviado(false);
      resetForm();
    }, 2000);
  };

  return (
    <div className="ejemplo">
      <h2>8️⃣ Formulario con Formik y Yup</h2>

      {enviado ? (
        <div className="success-box">
          <h3>✅ Formulario enviado exitosamente!</h3>
          <p>Los datos serán procesados en breve...</p>
        </div>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnBlur={true}
          validateOnChange={false}
        >
          {({ errors, touched, resetForm }) => (
            <Form className="formulario-completo">
              {/* NOMBRE */}
              <div className="form-group">
                <label htmlFor="nombre">Nombre *</label>
                <Field
                  id="nombre"
                  name="nombre"
                  type="text"
                  placeholder="Tu nombre completo"
                  className={`input-field ${touched.nombre && errors.nombre ? 'input-error' : ''}`}
                />
                <ErrorMessage name="nombre">
                  {(msg) => <small className="error-text">❌ {msg}</small>}
                </ErrorMessage>
              </div>

              {/* EMAIL */}
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  className={`input-field ${touched.email && errors.email ? 'input-error' : ''}`}
                />
                <ErrorMessage name="email">
                  {(msg) => <small className="error-text">❌ {msg}</small>}
                </ErrorMessage>
              </div>

              {/* EMAIL CONFIRM */}
              <div className="form-group">
                <label htmlFor="emailConfirm">Confirmar Email *</label>
                <Field
                  id="emailConfirm"
                  name="emailConfirm"
                  type="email"
                  placeholder="Confirma tu email"
                  className={`input-field ${touched.emailConfirm && errors.emailConfirm ? 'input-error' : ''}`}
                />
                <ErrorMessage name="emailConfirm">
                  {(msg) => <small className="error-text">❌ {msg}</small>}
                </ErrorMessage>
              </div>

              {/* PASSWORD */}
              <div className="form-group">
                <label htmlFor="password">
                  Contraseña * (Mín. 6 caracteres, mayúscula y número)
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Contraseña segura"
                  className={`input-field ${touched.password && errors.password ? 'input-error' : ''}`}
                />
                <ErrorMessage name="password">
                  {(msg) => <small className="error-text">❌ {msg}</small>}
                </ErrorMessage>
              </div>

              {/* PASSWORD CONFIRM */}
              <div className="form-group">
                <label htmlFor="passwordConfirm">Confirmar Contraseña *</label>
                <Field
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type="password"
                  placeholder="Confirma tu contraseña"
                  className={`input-field ${touched.passwordConfirm && errors.passwordConfirm ? 'input-error' : ''}`}
                />
                <ErrorMessage name="passwordConfirm">
                  {(msg) => <small className="error-text">❌ {msg}</small>}
                </ErrorMessage>
              </div>

              {/* EDAD */}
              <div className="form-group">
                <label htmlFor="edad">Edad (Opcional)</label>
                <Field
                  id="edad"
                  name="edad"
                  type="number"
                  placeholder="Tu edad"
                  className="input-field"
                />
                <ErrorMessage name="edad">
                  {(msg) => <small className="error-text">❌ {msg}</small>}
                </ErrorMessage>
              </div>

              {/* PAÍS */}
              <div className="form-group">
                <label htmlFor="pais">País (Opcional)</label>
                <Field
                  id="pais"
                  name="pais"
                  as="select"
                  className="select-field"
                >
                  <option value="">-- Selecciona un país --</option>
                  <option value="es">España</option>
                  <option value="mx">México</option>
                  <option value="ar">Argentina</option>
                  <option value="col">Colombia</option>
                </Field>
              </div>

              {/* NEWSLETTER */}
              <div className="form-group">
                <label className="checkbox-label">
                  <Field type="checkbox" name="newsletter" />
                  Deseo recibir newsletters
                </label>
              </div>

              {/* TÉRMINOS */}
              <div className="form-group">
                <label className="checkbox-label">
                  <Field type="checkbox" name="aceptarTerminos" />
                  <strong>Acepto los términos y condiciones *</strong>
                </label>
                <ErrorMessage name="aceptarTerminos">
                  {(msg) => <small className="error-text">❌ {msg}</small>}
                </ErrorMessage>
              </div>

              {/* BOTONES */}
              <div className="button-group">
                <button type="submit" className="btn btn-primary">
                  Enviar formulario
                </button>
                <button
                  type="button"
                  onClick={() => resetForm()}
                  className="btn btn-secondary"
                >
                  Limpiar formulario
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}

      {/* INFORMACIÓN EDUCATIVA */}
      <div className="info-box" style={{ marginTop: '20px' }}>
        <h3>Esquema de validación con Yup (declarativo):</h3>
        <pre className="code-block">{`const validationSchema = Yup.object().shape({
  nombre: Yup.string()
    .required('El nombre es requerido')
    .min(3, 'Mín. 3 caracteres'),
  email: Yup.string()
    .email('Email inválido')
    .required('Email requerido'),
  password: Yup.string()
    .required('Contraseña requerida')
    .matches(/[A-Z]/, 'Mayúscula requerida')
    .matches(/[0-9]/, 'Número requerido'),
});

<Formik
  initialValues={initialValues}
  validationSchema={validationSchema}
  onSubmit={handleSubmit}
>
  {({ values, errors, touched }) => (
    <Form>
      <Field name="nombre" />
      <ErrorMessage name="nombre">
        {(msg) => <span className="error">{msg}</span>}
      </ErrorMessage>
    </Form>
  )}
</Formik>`}</pre>
      </div>

      {/* VENTAJAS */}
      <div className="preview-box">
        <h3>✨ Ventajas de Formik vs useState:</h3>
        <ul style={{ marginLeft: '1.5rem' }}>
          <li>✓ Validación declarativa con Yup Schema</li>
          <li>✓ Manejo automático de touched</li>
          <li>✓ Mejor para formularios grandes</li>
          <li>✓ ErrorMessage automático</li>
          <li>✓ FieldArray para arrays dinámicos</li>
          <li>✓ Integración con Material-UI</li>
        </ul>
      </div>
    </div>
  );
}