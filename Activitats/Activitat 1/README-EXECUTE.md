# 🎯 Guía Rápida - Cómo ejecutar los proyectos

Todas las dependencias ya están instaladas con **yarn**. Ahora simplemente ejecuta cada proyecto.

## ▶️ Ejecución de proyectos

### Ejercicio 1 - v1 (Nested JSON)
```bash
cd Activitats/Activitat\ 1/01-selectorProvinciasYCiudades
yarn dev
```
**Abre:** `http://localhost:5173`

---

### Ejercicio 1 - v2 (Normalized JSON)
```bash
cd Activitats/Activitat\ 1/01-selectorProvinciasYCiudades-v2
yarn dev
```
**Abre:** `http://localhost:5173` (o púerto diferente si 5173 está ocupado)

---

### Ejercicio 1 - v3 (Carga Asincróna - Full Load)
```bash
cd Activitats/Activitat\ 1/01-selectorProvinciasYCiudades-v3
yarn dev
```
**Abre:** `http://localhost:5173` (o púerto diferente si 5173 está ocupado)

**Patrón:** Carga TODOS los datos (comunidades + provincias + ciudades) al iniciar
- ✅ Simple de entender
- ✅ Datos siempre disponibles
- ❌ Descarga 390 KB innecesarios
- ❌ UI bloqueada durante 50ms

---

### Ejercicio 1 - v4 (Carga Bajo Demanda - Lazy Loading)
```bash
cd Activitats/Activitat\ 1/01-selectorProvinciasYCiudades-v4
yarn dev
```
**Abre:** `http://localhost:5173` (o púerto diferente si 5173 está ocupado)

**Patrón:** Carga datos gradualmente:
1. Comunidades al iniciar (5 KB)
2. Provincias cuando selecciona comunidad (30 KB)
3. Ciudades cuando selecciona provincia (50 KB)

- ✅ UI responsiva desde el inicio (5ms vs 50ms)
- ✅ Ancho de banda optimizado (5 KB inicial vs 390 KB)
- ✅ Caché inteligente evita recargas
- ✅ Patrón profesional usado en LinkedIn, Google, Amazon
- ⚠️ Más complejo (3 useEffect + caché dinámico)

**Diferencia v3 vs v4:** Ver [COMPARATIVA_EFICIENCIA.md](./01-selectorProvinciasYCiudades-v2/COMPARATIVA_EFICIENCIA.md#-caso-de-uso-cuál-elegir)

---

### Ejercicio 2 - Task Search
```bash
cd Activitats/Activitat\ 1/02-buscadorTareas
yarn dev
```
**Abre:** `http://localhost:5173` (o púerto diferente si 5173 está ocupado)

---

### Ejercicio 3 - News Portal
```bash
cd Activitats/Activitat\ 1/03-estructuraSitioWeb
yarn dev
```
**Abre:** `http://localhost:5173` (o púerto diferente si 5173 está ocupado)

---

## 📋 Estado de los proyectos

| Proyecto | Dependencias | TypeScript | Estado |
|----------|--------------|-----------|--------|
| v1 (Selector) | ✅ Instaladas | ✅ Configurado | ✅ Listo |
| v2 (Selector) | ✅ Instaladas | ✅ Configurado | ✅ Listo |
| v3 (Selector Async - Full) | ✅ Instaladas | ✅ Configurado | ✅ Listo |
| v4 (Selector Lazy Loading) | ✅ Instaladas | ✅ Configurado | ✅ Listo |
| Ejercicio 2 (Tasks) | ✅ Instaladas | ✅ Configurado | ✅ Listo |
| Ejercicio 3 (News) | ✅ Instaladas | ⚠️ Incompleto | ⚠️ Necesita páginas |

---

## 🛠️ Comandos útiles

```bash
# Desarrollar con hot reload
yarn dev

# Compilar para producción
yarn build

# Previsualizar build
yarn preview

# Verificar errores de TypeScript (sin ejecutar)
yarn tsc --noEmit
```

---

## 📌 Notas importantes

- **Puerto 5173:** Vite usa este puerto por defecto. Si está ocupado, abrirá el siguiente disponible.
- **Hot reload:** Los cambios se reflejan automáticamente en el navegador.
- **Errores anteriores:** Ya han sido solucionados:
  - ✅ `jsx: "react-jsx"` (transformación JSX)
  - ✅ `moduleResolution: "bundler"` (resolución de módulos)
  - ✅ `resolveJsonModule: true` (importar JSONs)
  - ✅ Removed `useMemo` innecesarios

---

## 🎓 Qué aprendes en cada ejercicio

### **Ejercicio 1 (v1 vs v2 vs v3 vs v4)**
- **v1:** Estructuras de datos anidadas vs normalizadas, O(n) vs O(1) lookups
- **v2:** Normalización de datos, optimización con pre-computed lookups
- **v3:** `useEffect`, `fetch()`, carga asincróna, Promise.all(), manejo de estados async
- **v4:** Lazy loading, caché dinámico, optimización avanzada, patrones profesionales
  - 3 useEffect hooks (uno por nivel)
  - Caché indexado por clave
  - Verificación de caché antes de fetch
  - Mejora de UX: UI responsiva desde el inicio

### **Ejercicio 2**
- Filtering de arrays
- Búsqueda por texto
- Validación de input (mínimo 3 caracteres)

### **Ejercicio 3**
- Estructura de componentes reutilizables
- Layout patterns
- Props y composición

---

¡Que disfrutes! 🚀
