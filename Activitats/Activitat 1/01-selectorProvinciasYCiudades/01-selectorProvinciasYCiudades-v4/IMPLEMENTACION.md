# Implementación de Lazy Loading en v4

## 🎯 Objetivo

Demostrar cómo implementar un patrón profesional de **lazy loading con caché** para optimizar aplicaciones que manejan grandes volúmenes de datos en cascadas.

## 📐 Arquitectura de Componentes

### ProvinceSelector.tsx - Componente Principal

El componente utiliza:
- **3 states de selección:** `selectedCommunity`, `selectedProvince`, `selectedTown`
- **1 state de datos:** `data` (con caché dinámico)
- **3 useEffect hooks:** uno para cada nivel de cascada

## 🔄 Flujo de Datos

```
┌─────────────────────────────────────────┐
│      Al Montar Componente               │
│      useEffect(() => {...}, [])         │
│                                         │
│  Cargar: ccaa.json (19 items)          │
│  Tiempo: ~5ms                           │
│  Tamaño: ~5KB                           │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Usuario Selecciona Comunidad           │
│  setSelectedCommunity("andalucia")     │
│                                         │
│  ¿Está en caché?                       │
│  data.provinces["andalucia"] ??        │
└──────────────┬──────────────────────────┘
               │
        ┌──────┴──────┐
        │ SÍ (caché)  │ NO (fetch)
        │ instant     │
        ▼             ▼
   [Show data]  ┌─────────────────┐
                │ Cargar          │
                │ provincias.json │
                │ Filtrar por CC  │
                │ Tiempo: ~30ms   │
                └────────┬────────┘
                         │
                         ▼
                ┌──────────────────┐
                │ Guardar en caché │
                │ provinces[code]  │
                └─────────┬────────┘
                          │
                          ▼
                    [Show data]
                          │
        ┌─────────────────┴──────────────┐
        │                                │
        ▼                                ▼
Usuario Selecciona Provincia      
setSelectedProvince("almeria")    
                │
        ┌───────┴─────┐
        │ SÍ (caché)  │ NO (fetch)
        │ instant     │
        ▼             ▼
   [Show data]  ┌──────────────┐
                │ Cargar       │
                │poblaciones   │
                │Filtrar por PC│
                │~50ms         │
                └──────┬───────┘
                       │
                       ▼
                ┌──────────────┐
                │ Guardar caché│
                │  towns[code] │
                └─────┬────────┘
                      │
                      ▼
                 [Show data]
```

## 🔧 Implementación Detallada

### 1. State de Datos con Caché

```typescript
interface DataState {
  communities: Community[]                    // Array simple
  provinces: { [key: string]: Province[] }   // Objeto índexado
  towns: { [key: string]: Town[] }           // Objeto índexado
  loading: boolean
  error: string | null
}

const [data, setData] = useState<DataState>({
  communities: [],
  provinces: {},  // ← Caché vacío inicialmente
  towns: {},      // ← Caché vacío inicialmente
  loading: false,
  error: null,
})
```

### 2. useEffect #1: Cargar Comunidades (Al Montar)

```typescript
useEffect(() => {
  const loadCommunities = async () => {
    try {
      setData(prev => ({ ...prev, loading: true, error: null }))
      
      const response = await fetch('./src/data/ccaa.json')
      if (!response.ok) throw new Error('Error cargando comunidades')
      
      const communities = await response.json()
      
      setData(prev => ({
        ...prev,
        communities,
        loading: false,
      }))
    } catch (err) {
      setData(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : 'Error desconocido',
        loading: false,
      }))
    }
  }
  
  loadCommunities()
}, []) // ← Sin dependencias = una sola ejecución al montar
```

**Explicación:**
- **Array vacío `[]`:** El effect se ejecuta una sola vez cuando el componente monta
- **try/catch:** Maneja errores de red
- **setData con `prev`:** Actualiza solo los campos necesarios

### 3. useEffect #2: Cargar Provincias (Cuando Comunidad Cambia)

```typescript
useEffect(() => {
  // Guarda de seguridad: no hacer nada si no hay comunidad seleccionada
  if (!selectedCommunity) {
    setSelectedProvince('')
    setSelectedTown('')
    return
  }
  
  // Verificar caché: ¿ya están cargadas las provincias de esta comunidad?
  if (data.provinces[selectedCommunity]) {
    // ✅ Está en caché, no hacer fetch
    return
  }
  
  // ❌ No está en caché, hacer fetch
  const loadProvinces = async () => {
    try {
      setData(prev => ({ ...prev, loading: true, error: null }))
      
      // Descargar TODO el JSON de provincias
      const response = await fetch('./src/data/provincias.json')
      if (!response.ok) throw new Error('Error cargando provincias')
      
      const allProvinces = await response.json()
      
      // Filtrar solo las de la comunidad seleccionada
      const filteredProvinces = allProvinces.filter(
        (p: Province) => p.community_code === selectedCommunity
      )
      
      // Guardar en caché bajo la clave de comunidad
      setData(prev => ({
        ...prev,
        provinces: {
          ...prev.provinces,
          [selectedCommunity]: filteredProvinces  // ← Nueva entrada caché
        },
        loading: false,
      }))
      
      // Reset de selecciones subordinadas
      setSelectedProvince('')
      setSelectedTown('')
    } catch (err) {
      setData(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : 'Error desconocido',
        loading: false,
      }))
    }
  }
  
  loadProvinces()
}, [selectedCommunity, data.provinces]) // ← Las dependencias incluyen el caché
```

**Explicación:**
- **Guardias (guards):**
  - `if (!selectedCommunity) return` → No hacer nada si no hay selección
  - `if (data.provinces[selectedCommunity]) return` → No cargar si ya en caché
- **Caché dinámico:** Guardar como `provinces[selectedCommunity]`
- **Dependencias:** Incluir `[selectedCommunity, data.provinces]` para reaccionar a cambios

### 4. useEffect #3: Cargar Ciudades (Cuando Provincia Cambia)

```typescript
useEffect(() => {
  // Guardia: sin provincia = sin ciudades
  if (!selectedProvince) {
    setSelectedTown('')
    return
  }
  
  // Verificar caché
  if (data.towns[selectedProvince]) {
    return
  }
  
  // Cargar
  const loadTowns = async () => {
    try {
      setData(prev => ({ ...prev, loading: true, error: null }))
      
      const response = await fetch('./src/data/poblaciones.json')
      if (!response.ok) throw new Error('Error cargando ciudades')
      
      const allTowns = await response.json()
      
      // Filtrar solo ciudades de la provincia
      const filteredTowns = allTowns.filter(
        (t: Town) => t.province_code === selectedProvince
      )
      
      // Guardar en caché
      setData(prev => ({
        ...prev,
        towns: {
          ...prev.towns,
          [selectedProvince]: filteredTowns
        },
        loading: false,
      }))
      
      // Reset de selecciones subordinadas (ninguna en este caso)
      setSelectedTown('')
    } catch (err) {
      setData(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : 'Error desconocido',
        loading: false,
      }))
    }
  }
  
  loadTowns()
}, [selectedProvince, data.towns]) // ← Mismo patrón
```

### 5. Handlers de Selección

```typescript
// Cuando usuario cambia el select de comunidades
const handleCommunityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setSelectedCommunity(e.target.value)
  // Los useEffect se ejecutarán automáticamente porque selectedCommunity cambió
}

// Cuando usuario cambia el select de provincias
const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setSelectedProvince(e.target.value)
  // Los useEffect #3 se ejecutarán automáticamente
}

// Cuando usuario cambia el select de ciudades
const handleTownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setSelectedTown(e.target.value)
}

// Cuando hace submit
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  if (selectedCommunity && selectedProvince && selectedTown) {
    setResults([{
      community: data.communities.find(c => c.code === selectedCommunity)?.name || '',
      province: data.provinces[selectedCommunity]
        ?.find(p => p.code === selectedProvince)?.name || '',
      town: data.towns[selectedProvince]
        ?.find(t => t.code === selectedTown)?.name || '',
    }])
    // Reset
    setSelectedCommunity('')
    setSelectedProvince('')
    setSelectedTown('')
  }
}
```

## 💾 Cómo Funciona el Caché

### Estructura de Caché

```typescript
// Inicialmente
data.provinces = {}

// Después de seleccionar "Andalucía" (comunidad_1)
data.provinces = {
  "comunidad_1": [
    { code: "prov_1", name: "Almería", ... },
    { code: "prov_2", name: "Cádiz", ... },
    { code: "prov_3", name: "Córdoba", ... },
    ...
  ]
}

// Después de seleccionar "Cataluña" (comunidad_17)
data.provinces = {
  "comunidad_1": [...9 provincias de Andalucía...],
  "comunidad_17": [
    { code: "prov_43", name: "Barcelona", ... },
    { code: "prov_25", name: "Lleida", ... },
    ...
  ]
}
```

### Verificación de Caché

```typescript
// Cuando usuario selecciona "Andalucía" la primera vez:
if (data.provinces["comunidad_1"]) {  // undefined → false
  return  // No ejecutar, cargar datos
}

// Cargar datos...

// Cuando usuario cambia a "Cataluña":
if (data.provinces["comunidad_17"]) {  // undefined → false
  return  // No ejecutar, cargar datos
}

// Cargar datos...

// Cuando usuario vuelve a "Andalucía":
if (data.provinces["comunidad_1"]) {  // Array ✅ → true
  return  // ✅ ¡Ya está en caché! No cargar de nuevo
}
```

## 📊 Timeline de Ejecución

### Escenario: Usuario selecciona Andalucía → Almería → Almería ciudad

```
t=0ms   [MOUNT]
           ├─ useEffect #1 ejecuta loadCommunities()
           └─ Estado: loading=true

t=5ms   [COMUNIDADES CARGADAS]
           ├─ Estado: communities=[...19 items...]
           ├─ loading=false
           └─ UI ahora muestra select de comunidades habilitado

t=10ms  [USUARIO SELECCIONA ANDALUCÍA]
           ├─ setSelectedCommunity("andalucia")
           ├─ useEffect #2 se dispara
           ├─ Verifica: data.provinces["andalucia"] → undefined
           ├─ loadProvinces() ejecuta
           └─ Estado: loading=true

t=40ms  [PROVINCIAS CARGADAS]
           ├─ Estado: provinces={andalucia: [...9 items...]}
           ├─ loading=false
           └─ UI muestra select de provincias habilitado con 9 provincias

t=45ms  [USUARIO SELECCIONA ALMERÍA]
           ├─ setSelectedProvince("almeria")
           ├─ useEffect #3 se dispara
           ├─ Verifica: data.towns["almeria"] → undefined
           ├─ loadTowns() ejecuta
           └─ Estado: loading=true

t=95ms  [CIUDADES CARGADAS]
           ├─ Estado: towns={almeria: [...100+ items...]}
           ├─ loading=false
           └─ UI muestra select de ciudades habilitado

t=100ms [USUARIO SELECCIONA ALMERÍA CIUDAD]
           ├─ setSelectedTown("almeria_city")
           └─ UI muestra botón submit habilitado

t=105ms [USUARIO HACE SUBMIT]
           ├─ handleSubmit se ejecuta
           ├─ Busca nombres en caché
           ├─ Muestra resultados
           └─ Reset de form
```

## ⚡ Optimizaciones Implementadas

### 1. **Caché por Clave**
```typescript
// ❌ Mal: guardar todo en array simple
provinces: Province[]

// ✅ Bien: guardar por comunidad
provinces: { [key: string]: Province[] }
```

### 2. **Verificación de Caché ANTES de Fetch**
```typescript
// ✅ Correctamente evita re-fetch
if (data.provinces[selectedCommunity]) return

// ❌ Siempre hace fetch aunque esté en caché
const loadProvinces = async () => { ... }
```

### 3. **Filtrado en Cliente**
```typescript
// ✅ Un fetch, filtrado local
const filtered = allProvinces.filter(p => p.community_code === selectedCommunity)

// ❌ Múltiples fetches (muy ineficiente)
const filtered = allProvinces.filter(p.community_code === selectedCommunity)
```

### 4. **useEffect con Dependencias Correctas**
```typescript
// ✅ Reacciona a cambios
}, [selectedCommunity, data.provinces])

// ❌ Se ejecuta infinitamente
}, [selectedCommunity, data])
```

## 🐛 Errores Comunes al Hacer Lazy Loading

### Error #1: Olvidar Verificar Caché
```typescript
// ❌ MAL: siempre hace fetch
useEffect(() => {
  if (!selectedCommunity) return
  loadProvinces()  // Hace fetch cada vez
}, [selectedCommunity])

// ✅ BIEN: verifica caché
useEffect(() => {
  if (!selectedCommunity) return
  if (data.provinces[selectedCommunity]) return  // ← Verifica caché
  loadProvinces()  // Solo si no está
}, [selectedCommunity, data.provinces])
```

### Error #2: Dependencias Incompletas
```typescript
// ❌ MAL: no incluye data.provinces
useEffect(() => {
  if (!selectedCommunity) return
  if (data.provinces[selectedCommunity]) return
  loadProvinces()
}, [selectedCommunity])  // FALTA: data.provinces

// ✅ BIEN: incluye todas las dependencias
useEffect(() => {
  if (!selectedCommunity) return
  if (data.provinces[selectedCommunity]) return
  loadProvinces()
}, [selectedCommunity, data.provinces])  // ✅ Completo
```

### Error #3: Olvidar Guardias (Guards)
```typescript
// ❌ MAL: intenta cargar sin valor
useEffect(() => {
  loadProvinces() // selectedCommunity puede ser undefined
}, [selectedCommunity])

// ✅ BIEN: verifica primero
useEffect(() => {
  if (!selectedCommunity) return  // ← Guardia
  if (data.provinces[selectedCommunity]) return
  loadProvinces()
}, [selectedCommunity, data.provinces])
```

### Error #4: Actualizar Estado Incorrectamente
```typescript
// ❌ MAL: pierde datos anteriores
setData(prev => ({
  provinces: { [selectedCommunity]: filteredProvinces }  // Pierde otros
}))

// ✅ BIEN: combina con anteriores
setData(prev => ({
  ...prev,
  provinces: {
    ...prev.provinces,  // ← Mantiene caché anterior
    [selectedCommunity]: filteredProvinces
  }
}))
```

## 📈 Comparativa de Rendimiento

### Sin Lazy Loading (v3)
```
t=0ms   [MOUNT]
        ├─ 3 fetches paralelos: communities + provinces + towns
        └─ loading=true

t=50ms  [TODO CARGADO]
        ├─ 390 KB descargados
        ├─ 3.5 MB en memoria
        └─ UI finalmente responsiva
```

### Con Lazy Loading (v4)
```
t=0ms   [MOUNT]
        ├─ 1 fetch: communities
        └─ loading=true

t=5ms   [COMUNIDADES LISTAS]
        ├─ 5 KB descargado
        ├─ UI responsiva
        ├─ 0.5 MB en memoria
        └─ Usuario puede empezar a seleccionar

t=10-40ms [USUARIO SELECCIONA]
        ├─ Fetch de provincias
        └─ Cargas paralelas a interacción

t=45-95ms [USUARIO SELECCIONA PROVINCIA]
        ├─ Fetch de ciudades
        └─ Cargas paralelas a interacción
```

**Mejora:** ✅ UI más responsiva, ✅ Menos memoria inicial, ✅ Ancho de banda optimizado

## 🎓 Resumen de Patrones

1. **Caché por Clave:** Usar objetos indexados, no arrays
2. **Verificación antes de Fetch:** `if (cached[key]) return`
3. **Filtrado Local:** Descargar todo, filtrar en cliente (en este caso)
4. **Dependencias Completas:** Incluir todas las dependencias en el array
5. **Guardias (Guards):** Verificar valores antes de usar
6. **Estados Claros:** `loading`, `error`, datos en caché

---

**Siguiente:** Ejecutar v4 con `yarn dev` y ver el lazy loading en acción en DevTools → Network tab
