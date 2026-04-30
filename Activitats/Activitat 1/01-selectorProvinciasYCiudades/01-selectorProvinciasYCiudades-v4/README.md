# Versión 4: Selector de Provincias y Ciudades - Lazy Loading

## 🎯 Objetivo

Implementar un selector en cascada de **Comunidades Autónomas → Provincias → Ciudades** con **carga bajo demanda (Lazy Loading)**, demostrando patrones de optimización profesionales.

## 🚀 Características Principales

### ✨ Lazy Loading (Carga Bajo Demanda)
- **Comunidades:** Se cargan al iniciar (pequeño dataset ~ 5KB)
- **Provincias:** Se cargan SOLO cuando el usuario selecciona una comunidad
- **Ciudades:** Se cargan SOLO cuando el usuario selecciona una provincia
- **Caché inteligente:** Si vuelve a cambiar a una comunidad anterior, ya la tiene cargada

### 🎨 Interfaz Responsiva
- Selects deshabilitados hasta tener datos
- Mensajes "Cargando..." mientras se obtienen datos
- Botón enviar deshabilitado hasta completar selección
- Resultados mostrados en formato tabla
- Reset automático después de enviar

### 📊 Estructura de Datos

```typescript
interface Community {
  code: string
  name: string
}

interface Province {
  code: string
  community_code: string
  name: string
}

interface Town {
  code: string
  province_code: string
  name: string
}
```

### 💾 Almacenamiento en Caché

```typescript
interface DataState {
  communities: Community[]                    // Siempre cargado
  provinces: { [key: string]: Province[] }   // Caché por comunidad
  towns: { [key: string]: Town[] }           // Caché por provincia
  loading: boolean
  error: string | null
}
```

## 📋 Estructura del Proyecto

```
01-selectorProvinciasYCiudades-v4/
├── src/
│   ├── components/
│   │   ├── ProvinceSelector.tsx      # Componente principal con lazy loading
│   │   └── ProvinceSelector.css      # Estilos
│   ├── data/
│   │   ├── ccaa.json                 # Comunidades Autónomas
│   │   ├── provincias.json           # Provincias (todas)
│   │   └── poblaciones.json          # Ciudades (todas)
│   ├── types/
│   │   └── index.ts                  # Definiciones de tipos
│   ├── App.tsx                       # Componente raíz
│   ├── App.css                       # Estilos globales
│   ├── main.tsx                      # Entry point
│   └── index.css                     # Estilos base
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

## 🔧 Instalación y Ejecución

### Requisitos
- Node.js 16+
- Yarn o npm

### Instalación de dependencias
```bash
cd 01-selectorProvinciasYCiudades-v4
yarn install
# o
npm install
```

### Desarrollo
```bash
yarn dev
# o
npm run dev
```

Abre `http://localhost:5173` en tu navegador.

### Compilación para producción
```bash
yarn build
# o
npm run build
```

## 💡 ¿Cómo Funciona el Lazy Loading?

### 1. Carga Inicial (Al montar componente)
```typescript
useEffect(() => {
  const loadCommunities = async () => {
    const response = await fetch('./src/data/ccaa.json')
    const communities = await response.json()
    setData(prev => ({ ...prev, communities }))
  }
  loadCommunities()
}, [])
```

**Resultado:** ~5ms, solo 19 items cargados

### 2. Carga de Provincias (Cuando selecciona comunidad)
```typescript
useEffect(() => {
  if (!selectedCommunity) return
  
  // Verifica si ya están en caché
  if (data.provinces[selectedCommunity]) return
  
  // Si no, descarga solo las provincias de esa comunidad
  const loadProvinces = async () => {
    const response = await fetch('./src/data/provincias.json')
    const all = await response.json()
    const filtered = all.filter(p => p.community_code === selectedCommunity)
    setData(prev => ({
      ...prev,
      provinces: { ...prev.provinces, [selectedCommunity]: filtered }
    }))
  }
  loadProvinces()
}, [selectedCommunity, data.provinces])
```

**Resultado:** ~30ms, solo provincias de esa comunidad cargadas

### 3. Carga de Ciudades (Cuando selecciona provincia)
```typescript
useEffect(() => {
  if (!selectedProvince) return
  
  // Verifica caché
  if (data.towns[selectedProvince]) return
  
  // Descarga todas las ciudades de esa provincia
  const loadTowns = async () => {
    const response = await fetch('./src/data/poblaciones.json')
    const all = await response.json()
    const filtered = all.filter(t => t.province_code === selectedProvince)
    setData(prev => ({
      ...prev,
      towns: { ...prev.towns, [selectedProvince]: filtered }
    }))
  }
  loadTowns()
}, [selectedProvince, data.towns])
```

**Resultado:** ~50ms, solo ciudades de esa provincia cargadas

## 🎓 Conceptos Clave Aprendidos

### 1. **useEffect con Dependencias**
```typescript
useEffect(() => { /* función */ }, [dependencia1, dependencia2])
```
Se ejecuta cuando las dependencias cambian. Aquí se usa para:
- Cargar comunidades al montar (array vacío)
- Cargar provincias cuando `selectedCommunity` cambia
- Cargar ciudades cuando `selectedProvince` cambia

### 2. **Caché Dinámico**
En lugar de guardar simples arrays, usamos objetos:
```typescript
provinces: { [key: string]: Province[] }
```
Esto permite:
- Almacenar múltiples provincias agrupadas por comunidad
- Verificar si ya están cargadas: `if (data.provinces[selectedCommunity])`
- Evitar cargas duplicadas

### 3. **Conditional Loading**
```typescript
// No cargar si no hay selección
if (!selectedCommunity) return

// No cargar si ya está en caché
if (data.provinces[selectedCommunity]) return

// Solo entonces hacer fetch
loadProvinces()
```

### 4. **Filtrado Eficiente**
```typescript
const filtered = all.filter(p => p.community_code === selectedCommunity)
```
Se descargan todos los datos pero luego se filtran para el cliente.

## 📊 Comparativa: v3 vs v4

| Aspecto | v3 | v4 |
|---------|-----|--------|
| **Carga inicial** | 50ms (todos los datos) | 5ms (solo comunidades) ✅ |
| **Ancho banda** | 390 KB iniciales | 35 KB iniciales ✅ |
| **Memoria inicial** | 3.5 MB | 0.5 MB ✅ |
| **Caché dinámico** | ❌ | ✅ |
| **Patrón profesional** | Para datasets pequeños | Para producción ✅ |
| **UX inicial** | "Cargando..." 50ms | Instant ✅ |

Ver [COMPARATIVA_EFICIENCIA.md](../01-selectorProvinciasYCiudades-v2/COMPARATIVA_EFICIENCIA.md) para análisis completo.

## 🛠️ Debugging y Testing

### Ver qué se está cargando
Abre DevTools (F12) y:
1. Ve a **Network** → **Fetch/XHR**
2. Verás los requests a los JSONs:
   - Inicial: `ccaa.json` (5KB)
   - Al seleccionar comunidad: `provincias.json` (50KB, se filtra en cliente)
   - Al seleccionar provincia: `poblaciones.json` (300KB, se filtra en cliente)

### Monitorear estado de caché
El componente muestra:
- "Cargando..." mientras fetch está en progreso
- Select deshabilitado si no hay datos
- Tiempo de carga muy bajo si datos ya en caché (change sin fetch)

## 🚀 Posibles Mejoras

### 1. **Optimización de Red: Split de JSON**
En lugar de descargar todo `provincias.json` y después filtrar:
```
provincias/
  ├── andalucia.json
  ├── aragon.json
  └── ...
```
Descargar solo: `/provincias/andalucia.json` (más eficiente)

### 2. **API Backend en lugar de JSONs**
```typescript
const res = await fetch(
  `/api/provinces?community=${selectedCommunity}`
)
```
El server envía solo los datos solicitados.

### 3. **Paginación de Ciudades**
Si una provincia tiene 10,000 ciudades, paginar:
```typescript
const res = await fetch(
  `/api/towns?province=${selectedProvince}&page=0&limit=50`
)
```

### 4. **Búsqueda y Filtrado**
Agregar input para filtrar mientras se escribe:
```typescript
<input 
  placeholder="Buscar provincia..."
  onChange={(e) => setSearch(e.target.value)}
/>
```

## 📚 Recursos Adicionales

- [useEffect Hook Documentation](https://react.dev/reference/react/useEffect)
- [Lazy Loading Pattern](https://web.dev/lazy-loading/)
- [React Performance Optimization](https://react.dev/reference/react/useMemo)
- [Network Request Optimization](https://web.dev/performance/#network)

## ✅ Checklist de Aprendizaje

- ✅ Entiendo cómo funciona `useEffect` con dependencias
- ✅ Entiendo el patrón de caché dinámico
- ✅ Entiendo cuándo y por qué hacer lazy loading
- ✅ Puedo implementar loading states
- ✅ Conozco cuándo usar v3 vs v4 en producción

---

**Siguiente paso:** Ver [COMPARATIVA_EFICIENCIA.md](../01-selectorProvinciasYCiudades-v2/COMPARATIVA_EFICIENCIA.md) para ver cómo se comparan todas las versiones.
