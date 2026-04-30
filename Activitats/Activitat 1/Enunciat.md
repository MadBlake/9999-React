# 📋 ENUNCIAT - Activitat 1: React Basics

## 🎯 Objectius

Desenvolupar tres exercicis progressius en **React amb TypeScript** per aprendre:
- Gestió d'estat (`useState`)
- Selectors dependents (cascada)
- Filtratge de dades
- Estructuració de components
- Fetch de dades asincrónes

---

## 📝 Exercici 1: Selector de Províncies i Ciutats

### 🎯 Requisits

1. **Dos selectors deps:**
   - Primer selector: Mostrar totes les **provinciес**
   - Segon selector: Mostrar totes les **ciutats** (depén de la provincia seleccionada)

2. **Comportament:**
   - En seleccionar una provincia, el segon selector es repobla automàticament
   - El segon selector comença desactivat fins seleccionar provincia
   - Afegir un botó "Enviar" per confirmar la selecció

3. **Resultat:**
   - Mostrar en un text sota els selectors: "Has escollit la provincia **[provincia]** i la ciutat **[ciutat]**"
   - Un cop enviada, els selectors es restableixen a l'estat inicial

### 📊 Dades

- Estructura: JSON amb provincias i ciudades associadas
- Es proporcionan tres versions amb diferents estructures (v1, v2, v3, v4)

### 🔗 Recursos

- [Repository Base: MadBlake/9999-React](https://github.com/MadBlake/9999-React)
- [Dades: Comunidades Provincias Poblaciones](https://github.com/frontid/ComunidadesProvinciasPoblaciones)

---

## 🔍 Exercici 2: Buscador de Tasques

### 🎯 Requisits

1. **Estructura:**
   - Input de text per buscar tasques
   - Llistat dinàmic de tasques
   - Mostrar tasques filtratives per títol

2. **Filtratge:**
   - Mostrar **totes les tasques inicialment**
   - Comenzar filtratge **només a partir del 3r caràcter**
   - Filtratge **en temps real** (sin botó de buscar)
   - **Case-insensitive** (majúscules/minúscules)

3. **Comportament:**
   - Si no hi ha resultats, mostrar missatge: "No hi ha tasques coincir"
   - Visualitat clara del número de tasques trobades

### 📊 Dades de Tasques (Exemple)

```json
[
  { "id": 1, "title": "Estudiar React", "completed": false },
  { "id": 2, "title": "Fer exercicis de JavaScript", "completed": false },
  { "id": 3, "title": "Revisar TypeScript", "completed": true }
]
```

---

## 🎨 Exercici 3: Estructura de Components - Newsportal/Diari

### 🎯 Requisits

1. **Selecció de referència:**
   - Escollir un diari o web de referència (ej: El País, BBC, CNN, DEV.TO, Medium, etc.)
   - Captura o pantallada de la web

2. **Análisis de components:**
   - Identificar i esquematitzar els components principals
   - Dibuixar/planificar l'estructura jeràrquica
   - Descriu la responsabilitat de cada component

3. **Implementació:**
   - Crear estructura esquelètica en React
   - Respectar la jerarquia de components
   - Implementar layout amb CSS Grid/Flexbox
   - Nomenar clarament els components

4. **Documentació:**
   - Fichier `ESTRUCTURA_ANALYSIS.md` explicant:
     - Components identificats
     - Responsabilitat de cada component
     - Props esperadas
     - Estados internes si cal

### 🔗 Recursos per Anàlisis

- [How to identify components: DEV.TO](https://dev.to/surelay/how-to-identity-components-in-a-design-mockup-to-build-a-react-application-86g)
- [Thinking in React: React Docs](https://react.dev/learn/thinking-in-react)
- [Design References: Dribbble](https://dribbble.com/YoDavidO/collections/1481392-React-Native-Practice)

---

## ⚙️ Requisits Tècnics Generals

### Tecnologies
- ✅ **React 18.x** amb **TypeScript**
- ✅ **Vite** com a build tool
- ✅ **CSS/SCSS** per estilos

### Codi
- ✅ Components funcionals
- ✅ Hooks (`useState`, `useEffect`)
- ✅ Props tipadas amb TypeScript
- ✅ Naming coherent
- ✅ Codi legible i documentat

### Qualitat
- ✅ Sense errors de TypeScript
- ✅ Sense warnings de consola
- ✅ Responsive (mobile-friendly)
- ✅ Estructura de carpetes clara

---

## 📦 Estructura de Lliurament

```
Activitat 1/
├── 01-selectorProvinciasYCiudades/
│   ├── v1, v2, v3, v4 (versions)
│   └── documentació
├── 02-buscadorTareas/
│   └── src/
├── 03-estructuraSitioWeb/
│   └── ESTRUCTURA_ANALYSIS.md
└── README.md (instruccions execució)
```

---

## 🔄 Versiones del Exercici 1

| Versió | Patrón | Complexitat | Ús |
|--------|--------|------------|-----|
| **v1** | Nested JSON | 🟢 Bàsic | Aprender |
| **v2** | Normalized JSON | 🟡 Intermedi | Optimització |
| **v3** | Async/Await + Fetch | 🟠 Avançat | Realisme |
| **v4** | Lazy Loading + Caché | 🔴 Profesional | Escala |

---

## 📚 Links Adicionaks

- Documentació React: https://react.dev
- TypeScript Handbook: https://www.typescriptlang.org/docs/
- Vite Guide: https://vitejs.dev/guide/

---

**Última actualització:** 17 de Març de 2026