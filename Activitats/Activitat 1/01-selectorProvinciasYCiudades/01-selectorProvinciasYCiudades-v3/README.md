# 📦 Selector de Provincias y Ciudades - v3 (Carga Asincróna)

## 🎯 Objetivo educativo

Demostrar cómo cargar archivos JSON de forma **asincróna** utilizando `useEffect` y `fetch()`, mostrando:
- Manejo de efectos secundarios con `useEffect`
- Carga asincróna de datos con `fetch()`
- Estados de loading y error
- Actualización de estado después de datos cargados

## 🔄 Comparación: v1 vs v2 vs v3

| Aspecto | v1 | v2 | v3 |
|---------|----|----|-----|
| **Estructura JSON** | Anidada (árbol) | Normalizada (3 archivos) | Normalizada (3 archivos) |
| **Carga de datos** | Import sync | Import sync | Fetch async |
| **Hook de carga** | Ninguno | Ninguno | `useEffect` |
| **Búsquedas** | O(n) lineal | O(1) diccionario | O(1) diccionario |
| **Estados loading** | No | No | Sí |
| **Manejo errores** | No | No | Sí |
| **Tamaño datos** | ~500KB | ~390KB (-22%) | ~390KB (-22%) |

## 🚀 Características principales

### 1️⃣ Carga asincróna con `useEffect`

```typescript
useEffect(() => {
  const loadData = async () => {
    const [ccaaResponse, provinciasResponse, poblacionesResponse] = await Promise.all([
      fetch('./src/data/ccaa.json'),
      fetch('./src/data/provincias.json'),
      fetch('./src/data/poblaciones.json'),
    ])
    // ... procesar datos
  }
  loadData()
}, [])
```

### 2️⃣ Estados de carga

```typescript
const [data, setData] = useState<DataState>({
  communities: [],
  provinces: [],
  towns: [],
  loading: true,
  error: null,
})
```

### 3️⃣ Manejo de errores

```typescript
if (data.loading) {
  return <div>Cargando datos...</div>
}

if (data.error) {
  return <div style={{ color: 'red' }}>{data.error}</div>
}
```

### 4️⃣ Lookups pre-computados

```typescript
const provincesByCode: { [key: string]: Province[] } = {}
provinces.forEach((province: Province) => {
  if (!provincesByCode[province.parent_code]) {
    provincesByCode[province.parent_code] = []
  }
  provincesByCode[province.parent_code].push(province)
})
```

## 📊 Ventajas de v3

✅ **Realista**: Las aplicaciones web usualmente cargan datos desde APIs externas  
✅ **Control**: Puedes manejar loading y errores explícitamente  
✅ **Flexible**: Fácil cambiar fetch() a Axios, GraphQL, etc.  
✅ **Educativo**: Enseña `useEffect`, `fetch`, Promises, async/await  
✅ **Performance**: Mantiene las búsquedas O(1) de v2  

## ⚠️ Consideraciones

- Los paths `./src/data/*.json` asumen que Vite está sirviendo la carpeta `src`
- En producción, los arcivos JSON irían a una carpeta `public` o se serviría desde una API
- El `Promise.all()` carga todos los archivos en paralelo

## 🔧 Cómo ejecutar

```bash
cd 01-selectorProvinciasYCiudades-v3
yarn install   # (ya está hecho)
yarn dev       # Inicia servidor en http://localhost:5173
```

## 📚 Qué aprenderás

- ✅ `useEffect` para efectos secundarios
- ✅ Async/await con `fetch()`
- ✅ `Promise.all()` para peticiones paralelas
- ✅ Manejo de estados asincronos
- ✅ Diferencia entre carga sincróna vs asincróna
- ✅ Patrones reales de aplicaciones web

## 🎓 Próximos pasos

Para mejorar aún más:
1. Usar una API backend en lugar de JSONs locales
2. Agregar cancelación de requests con `AbortController`
3. Implementar React Query o SWR para manejor de cache
4. Agregar validación con Zod o IO-TS
5. Convertir a TypeScript estricto con tipos genéricos
