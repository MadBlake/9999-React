# 📋 Formularios Controlados en React - TypeScript

Ejemplos completos y educativos sobre cómo trabajar con formularios controlados en React usando TypeScript.

## 🎯 ¿Qué son formularios controlados?

Un **componente controlado** es un input de formulario cuyo valor es controlados por React a través del estado (`useState`).

### Ciclo de un formulario controlado:

```
Estado ➡ Input: valor vinculado al estado
         ↑         ↓
Usuario ← Evento: onChange disparado
         ↓         ↑
Evento ➡ Estado: función actualiza estado
         ↓         ↑
Re-render: React pinta con nuevo estado
```

## 📚 Ejemplos incluidos

### 1️⃣ Input Básico (`01-InputBasico.tsx`)
- Input con `useState`
- Manejo de `onChange`
- Transformación de datos (input → mayúsculas)
- Validación de longitud
- Reseteo del formulario

**Conceptos:**
```typescript
const [nombre, setNombre] = useState('');
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setNombre(e.target.value);
};
<input value={nombre} onChange={handleChange} />
```

### 2️⃣ Textarea (`02-TextArea.tsx`)
- Textarea controlado con `value` (no con texto hijo)
- Contador de caracteres
- Contador de palabras
- Progress bar de límite
- Vista previa en tiempo real

**Diferencia importante:**
```typescript
// ❌ Incorrecto - HTML tradicional
<textarea>Mi texto</textarea>

// ✅ Correcto - React
<textarea value={mensaje} onChange={handleChange} />
```

### 3️⃣ Select/Dropdown (`03-SelectDropdown.tsx`)
- Select controlado con `value`
- Selects dependientes (país → ciudad)
- Reseteo de selecciones encadenadas
- Validación de selección

**Concepto clave:**
```typescript
// En React, select usa 'value' (no 'selected' en options)
<select value={pais} onChange={handlePaisChange}>
  {paises.map(p => <option key={p} value={p}>{p}</option>)}
</select>
```

### 4️⃣ Checkboxes y Radio Buttons (`04-CheckboxRadio.tsx`)
- **ATENCIÓN:** Checkboxes usan `checked`, no `value`
- Array de checkboxes múltiples
- Radio buttons (una sola selección)
- Lecturas de `e.target.checked`

**Diferencia crítica:**
```typescript
// ❌ Para checkboxes NO usar value
<input type="checkbox" value={hobby} onChange={handleChange} />

// ✅ Usar checked
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const checked = e.target.checked;  // ← checked, no value
  // ...
};

<input type="checkbox" checked={isChecked} onChange={handleChange} />
```

### 5️⃣ Formulario Completo (`05-FormularioCompleto.tsx`)
- Múltiples campos en un objeto de estado
- Función genérica `handleChange` con Computed Properties
- Validación en tiempo real
- Deshabilitación condicional de botones
- Envío del formulario

**Patrón avanzado - Computed Properties:**
```typescript
const [datos, setDatos] = useState({
  nombre: '',
  email: '',
  password: '',
  newsletter: false,
});

const handleChange = (e) => {
  const { name, type, checked, value } = e.target;
  const valorFinal = type === 'checkbox' ? checked : value;
  
  setDatos(prevDatos => ({
    ...prevDatos,
    [name]: valorFinal,  // ← Computed Property Name
  }));
};
```

### 6️⃣ Formulario Avanzado con onBlur y Touched (`06-FormularioAvanzado.tsx`)
- **Estado separado para "touched"** - qué campos han sido "tocados"
- **Evento `onBlur`** - se dispara cuando el usuario abandona un campo
- **Validación condicional** - muestran errores SOLO si `touched[field] === true`
- **Mejor UX** - no muestra errores mientras escribes, solo después de abandonar el campo
- Validaciones complejas (password con mayúscula + número)
- Interfaz clara entre datos, touched y errores

**Patrón profesional - onBlur y Touched:**
```typescript
// Estado para rastrear qué campos han sido tocados
const [touched, setTouched] = useState({
  nombre: false,
  email: false,
  // ...
});

// onBlur: marcar como tocado cuando abandonas el campo
const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  const { name } = e.target;
  setTouched(prevTouched => ({
    ...prevTouched,
    [name]: true,
  }));
};

// Mostrar error SOLO si tocado Y hay error
{touched.nombre && errores.nombre && (
  <small className="error-text">{errores.nombre}</small>
)}
```

**Ventajas de este patrón:**
- ❌ No muestra errores mientras estás escribiendo
- ✓ Solo valida cuando abandonas el campo
- ✓ Mejor experiencia del usuario
- ✓ Menos frustración durante la escritura
- ✓ Validaciones más realistas (ej: contraseña debe tener mayúscula + número)
- ✓ Estado claro y mantenible

### 7️⃣ Formulario con React Hook Form (`07-FormularioReactHookForm.tsx`)
- **Librería:** `react-hook-form` - Manejo de formularios con menos re-renders
- **Validación:** Integrada y declarativa
- **Modo:** `onBlur` - valida al abandonar campo
- **watch()** - Monitorea valores en tiempo real
- **register()** - Vincula inputs a la librería

**Ventajas de React Hook Form:**
```typescript
// Uso simple con register()
<input {...register('nombre', { required: 'Campo requerido' })} />

// Mejores características:
- Menos código que useState
- Mínimo re-renders
- Mejor rendimiento
- Fácil integración con UI frameworks
- Soporte para validación asíncrona
```

### 8️⃣ Formulario con Formik (`08-FormularioFormik.tsx`)
- **Librería:** `formik` con `yup` para validación
- **Esquema:** Yup Schema Object validation (declarativo)
- **ErrorMessage:** Componente automático para mostrar errores
- **Mejor para:** Formularios grandes y complejos

**Patrón Yup Schema (declarativo):**
```typescript
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email inválido')
    .required('Email requerido'),
  password: Yup.string()
    .min(6, 'Mín. 6 caracteres')
    .matches(/[A-Z]/, 'Debe incluir mayúscula')
    .matches(/[0-9]/, 'Debe incluir número'),
});

<Formik
  initialValues={initialValues}
  validationSchema={validationSchema}
  onSubmit={handleSubmit}
>
  {({ errors, touched }) => (
    <Form>
      <Field name="email" />
      <ErrorMessage name="email" />
    </Form>
  )}
</Formik>
```

## 🚀 Cómo ejecutar

```bash
# Instalar dependencias
yarn install

# Ejecutar desarrollo
yarn dev

# Lint TypeScript
yarn lint

# Compilar para producción
yarn build
```

El servidor estará disponible en `http://localhost:5177`

## 📋 Versiones utilizadas

- **Node:** ≥ 22.0.0
- **Vite:** 7.3.1+
- **React:** 18.3.0+
- **TypeScript:** 5.4.0+
- **react-hook-form:** 7.x
- **Formik:** 2.x
- **Yup:** 1.x

## 📊 Comparación de Enfoques

| Aspecto | useState | React Hook Form | Formik |
|--------|---------|------------------|--------|
| **Tamaño bundle** | 0KB | ~8KB | ~26KB |
| **Re-renders** | Muchos | Pocos | Medio |
| **Curva aprendizaje** | Baja | Baja | Media |
| **Código necesario** | Mucho | Poco | Medio |
| **Validación** | Manual | Integrada | Yup Schema |
| **Mejor para** | Formularios simples | Rendimiento | Formularios complejos |
| **FieldArray** | Manual | Soporte | FieldArray nativo |
| **Ejemplo** | 01-05 | 07 | 08 |

**Recomendación:**
- ✅ Para aprender: **useState** (ejemplos 1-6)
- ✅ Para rendimiento: **React Hook Form** (ejemplo 7)
- ✅ Para complejidad: **Formik** (ejemplo 8)

## 📝 Conceptos clave

### useState con formularios
```typescript
const [value, setValue] = useState('');
```

### onChange handlers
```typescript
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
};
```

### Diferencias de atributos

| Elemento | Atributo Estado | En onChange |
|----------|-----------------|-------------|
| `<input type="text">` | `value` | `e.target.value` |
| `<textarea>` | `value` | `e.target.value` |
| `<select>` | `value` | `e.target.value` |
| `<input type="checkbox">` | `checked` | `e.target.checked` |
| `<input type="radio">` | `checked` | `e.target.checked` |

### Validación immutables

```typescript
// ✅ Correcto - crear nuevo objeto
setDatos({
  ...prevDatos,
  [name]: valor
});

// ❌ Incorrecto - modificar directamente
datos[name] = valor;  // No hacer esto
```

## 🎓 Ventajas de componentes controlados

✅ **Validación inmediata** → Mostrar errores mientras el usuario escribe
✅ **Input masking** → Impedir caracteres específicos
✅ **Botones condicionales** → Deshabilitar si datos son incompletos
✅ **Control total** → React siempre sabe el estado del formulario
✅ **State único** → Una fuente de verdad

## ⚠️ Errores comunes

### 1. Olvidar `onChange`
```typescript
// ❌ El input no deja escribir
<input value={nombre} />

// ✅ Correpto
<input value={nombre} onChange={(e) => setNombre(e.target.value)} />
```

### 2. Usar `value` en checkboxes
```typescript
// ❌ Incorrecto
<input type="checkbox" value={isChecked} />

// ✅ Correcto
<input type="checkbox" checked={isChecked} onChange={handleChange} />
```

### 3. No actualizar estado en textarea
```typescript
// ❌ El textarea queda vacío (HTML tradicional no es React)
<textarea>{mensaje}</textarea>

// ✅ Correcto
<textarea value={mensaje} onChange={(e) => setMensaje(e.target.value)} />
```

### 4. Renderizar array sin key en checkboxes múltiples
```typescript
// ❌ Incorrecto
{hobbies.map(h => <input key={h} ... />)} // Si dos hobbies son iguales, falla

// ✅ Correcto
{hobbyOptions.map(h => <input key={h.value} ... />)}
```

## 📚 Recursos

- [React Docs - Controlled Components](https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable)
- [React Docs - Forms](https://react.dev/reference/react-dom/components/form)
- [TypeScript React Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

## 🔗 Referencia original

Este proyecto está inspirado en: https://www.luisllamas.es/react-formularios-controlados/

## 📄 Licencia

MIT - Uso educativo
