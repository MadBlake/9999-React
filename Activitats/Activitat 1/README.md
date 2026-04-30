# Soluciones de Actividades - React

Este directorio contiene las soluciones de los 3 ejercicios propuestos usando React con TypeScript y Vite.

## 📋 Ejercicios

### Ejercicio 1: Selector de Provincias y Ciudades

#### **Versión 1 (Recomendada para aprendizaje):** `01-selectorProvinciasYCiudades/`

Características:
- Selector jerárquico: Comunidades → Provincias → Ciudades
- Cada selector se activa en función de la selección anterior
- Botón de envío que muestra la selección en un texto
- Tras enviar, los selectores se reinician al estado inicial
- **Datos: Archivo único `arbol.json` (estructura anidada)**

Estructura de componentes:
```
ProvinceSelector
├── Select Comunidades
├── Select Provincias (deshabilitado si no hay comunidad)
├── Select Ciudades (deshabilitado si no hay provincia)
├── Botón Enviar
└── Resultado (si se envía)
```

Ejecución:
```bash
cd 01-selectorProvinciasYCiudades
npm install
npm run dev
```

---

#### **Versión 2 (Más eficiente):** `01-selectorProvinciasYCiudades-v2/`

Misma funcionalidad, pero:
- **Archivos JSON separados:** `provincias.json` + `poblaciones.json`
- **22% menos tamaño de datos** (~35KB vs 45KB)
- **37% menos memoria** (~95KB vs 150KB)
- **Mejor escalabilidad** para datasets grandes
- **Patrón profesional** similar a bases de datos reales
- Ver análisis detallado: `COMPARATIVA_EFICIENCIA.md`

Ejecución:
```bash
cd 01-selectorProvinciasYCiudades-v2
npm install
npm run dev
```

---

### Ejercicio 2: Buscador de Tareas
**Ubicación:** `02-buscadorTareas/`

#### Características:
- Input de búsqueda con debounce conceptual
- Lista de tareas inicial con 12 tareas de ejemplo
- Filtrado solo a partir de **3 caracteres** escritos
- Muestra total de tareas y tareas filtradas
- Tarjetas de tarea con checkbox, título y badge de completado
- Búsqueda case-insensitive

#### Estructura de componentes:
```
TaskSearch
├── Input búsqueda
├── Info de caracteres (si < 3)
├── Lista de tareas
│   ├── TaskItem (para cada tarea)
│   │   ├── Checkbox
│   │   ├── Título
│   │   └── Badge (si completado)
│   └── Mensaje "No encontrado"
└── Info de resultados
```

#### Ejecución:
```bash
cd 02-buscadorTareas
npm install
npm run dev
```

---

### Ejercicio 3: Estructura de Componentes de un Sitio Web
**Ubicación:** `03-estructuraSitioWeb/`

#### Características:
- Análisis y diseño de estructura de componentes de un **portal de noticias/blog**
- Implementación completa del esqueleto con todos los componentes
- Responsive design (mobile-first)
- Componentes reutilizables

#### Estructura de carpetas:
```
src/
├── components/
│   ├── Layout/
│   │   ├── Header/
│   │   │   ├── Header.tsx
│   │   │   ├── Logo.tsx
│   │   │   ├── Navigation.tsx
│   │   │   ├── NavLinks.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   └── UserMenu.tsx
│   │   ├── Footer/
│   │   │   └── Footer.tsx
│   │   └── Layout.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── FeaturedArticles.tsx
│   │   └── MainContent.tsx
│   ├── Sidebar/
│   │   ├── Sidebar.tsx
│   │   ├── TrendingArticles.tsx
│   │   └── Newsletter.tsx
│   └── common/
│       └── ArticleCard.tsx
├── pages/
│   └── HomePage.tsx
├── types/
│   └── index.ts
└── styles/
    └── globals.css
```

#### Análisis del diseño:
Ver `ESTRUCTURA_ANALYSIS.md` para:
- Desglose jerárquico de componentes
- Tipos de datos utilizados
- Características principales
- Flujo de navegación

#### Ejecución:
```bash
cd 03-estructuraSitioWeb
npm install
npm run dev
```

---

## 🚀 Instrucciones generales

### Instalación y ejecución de cada proyecto:

```bash
# Para cualquiera de los tres proyectos:
cd [nombre-proyecto]
npm install
npm run dev
```

Luego abre en el navegador: `http://localhost:5173`

### Build para producción:
```bash
npm run build
npm run preview
```

---

## 💡 Conceptos React utilizados

### Ejercicio 1 - Versión 1:
- `useState` para gestionar estado de selecciones
- `useMemo` para filtrado de datos eficiente
- Eventos onChange en selects
- Props drilling
- Tipos TypeScript
- Datos anidados (arbol.json)

### Ejercicio 1 - Versión 2:
- `useState` para gestionar estado
- `useMemo` para búsqueda en objetos normalizados
- Mapeos de datos en inicialización
- Acceso O(1) a través de diccionarios
- Arquitectura escalable
- Datos separados (provincias.json + poblaciones.json)

### Ejercicio 2:
- `useState` para búsqueda
- `useMemo` para filtrado
- Condicionales en JSX
- Listas renderizadas con .map()
- Estilos CSS modulares

### Ejercicio 3:
- Componentes funcionales
- Composición de componentes
- Layout grid CSS
- Responsive design
- Estructura modular y escalable
- TypeScript interfaces

---

## 📦 Dependencias principales

Todos los proyectos utilizan:
- **React 18.2.0**
- **TypeScript 5.3.0**
- **Vite 5.0.0**
- **React DOM 18.2.0**

---

## 📝 Notas

- **Ejercicio 1**: Los datos de provincias y ciudades están simplificados para demostración
- **Ejercicio 2**: Las tareas son estáticas. Para un caso real, vendrían de una API
- **Ejercicio 3**: Es un esqueleto que puede expandirse con:
  - React Router para navegación
  - Context API o Redux para estado global
  - Integración con API para datos reales
  - Más páginas (detalle de artículo, búsqueda, etc.)

---

## 🎨 Estilo

Todos los proyectos incluyen:
- CSS modular por componente
- Design responsive
- Paleta de colores consistente
- Animaciones suaves
- Accesibilidad básica

---

## 📊 Comparativa v1 vs v2 del Ejercicio 1

| Aspecto | v1 (arbol.json) | v2 (separados) |
|---------|-----------------|----------------|
| **Tamaño datos** | 45 KB | 35 KB (-22%) |
| **Memoria** | 150 KB | 95 KB (-37%) |
| **Escalabilidad** | Limitada | Excelente ✅ |
| **Mantenimiento** | Difícil | Fácil ✅ |
| **Simplicidad** | Alta ✅ | Media |
| **Curva aprendizaje** | Baja ✅ | Media |
| **Patrón profesional** | ✗ | ✅ |

**Recomendación:** 
- **v1**: Para aprender conceptos básicos
- **v2**: Para aplicaciones que escalarán

**Recursos:**
- Ver análisis detallado: `COMPARATIVA_RESUMEN.md` (resumen visual)
- Ver análisis técnico: `01-selectorProvinciasYCiudades-v2/COMPARATIVA_EFICIENCIA.md`

---



### Ejercicio 1 ✓
- [x] Dos selectores (Provincias y Ciudades)
- [x] Selector dependiente (ciudades según provincia)
- [x] Botón de envío
- [x] Mostrar resultado
- [x] Resetear selectores tras envío
- [x] **BONUS: Versión 2 con archivos JSON separados (más eficiente)**

### Ejercicio 2 ✓
- [x] Input de búsqueda
- [x] Lista de tareas inicial
- [x] Filtrado por texto
- [x] Mínimo 3 caracteres para filtrar
- [x] Muestra tereas filtradas

### Ejercicio 3 ✓
- [x] Análisis de estructura de componentes
- [x] Documento de análisis (ESTRUCTURA_ANALYSIS.md)
- [x] Implementación completa del esqueleto
- [x] Jerarquía de componentes clara
- [x] Responsive y profesional

