# 📁 ESTRUCTURA RECOMANADA - Carpetes i Fitxers

## Exercici 1: Selector Provincias

```
01-selectorProvinciasYCiudades/
│
├── 📄 package.json
├── 📄 tsconfig.json
├── 📄 vite.config.ts
├── 📄 README.md
├── 📄 .gitignore
│
├── 📂 public/
│   └── index.html
│
└── 📂 src/
    ├── 📄 main.tsx              (entry point)
    ├── 📄 App.tsx               (component root)
    ├── 📄 index.css             (estilos globals)
    │
    ├── 📂 components/
    │   └── ProvinceSelector.tsx  ✅ MAIN COMPONENT
    │
    ├── 📂 styles/
    │   └── ProvinceSelector.css
    │
    └── 📂 data/
        ├── provincias.json      (CCAA)
        ├── ciudades.json        (cities per CCAA)
        └── index.ts             (export both)
```

### Contingut Clau per Exercici 1

**src/data/index.ts**
```typescript
export { default as provinces } from './provincias.json';
export { default as citiesByProvince } from './ciudades.json';
```

**src/components/ProvinceSelector.tsx**
```typescript
import { useState } from 'react';
import { provinces, citiesByProvince } from '../data';
import '../styles/ProvinceSelector.css';

export default function ProvinceSelector() {
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [result, setResult] = useState('');

  const cities = selectedProvince ? citiesByProvince[selectedProvince] : [];

  const handleSubmit = () => {
    setResult(`Seleccionat: ${selectedProvince} - ${selectedCity}`);
    setSelectedProvince('');
    setSelectedCity('');
  };

  return (
    <div className="selector-container">
      <select value={selectedProvince} onChange={(e) => setSelectedProvince(e.target.value)}>
        <option value="">Selecciona provincia</option>
        {provinces.map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>

      <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} disabled={!selectedProvince}>
        <option value="">Selecciona ciudad</option>
        {cities.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <button onClick={handleSubmit} disabled={!selectedCity}>Enviar</button>
      {result && <p className="result">{result}</p>}
    </div>
  );
}
```

---

## Exercici 2: Buscador de Tasques

```
02-buscadorTareas/
│
├── 📄 package.json
├── 📄 tsconfig.json
├── 📄 vite.config.ts
├── 📄 README.md
│
├── 📂 public/
│   └── index.html
│
└── 📂 src/
    ├── 📄 main.tsx
    ├── 📄 App.tsx
    ├── 📄 index.css
    │
    ├── 📂 components/
    │   └── SearchDemo.tsx       ✅ MAIN COMPONENT
    │
    ├── 📂 styles/
    │   └── SearchDemo.css
    │
    └── 📂 data/
        ├── tasks.json
        └── index.ts
```

### Contingut Clau per Exercici 2

**src/data/tasks.json**
```json
[
  { "id": 1, "title": "Aprender React" },
  { "id": 2, "title": "Hacer ejercicio físico" },
  { "id": 3, "title": "Estudiar TypeScript" },
  { "id": 4, "title": "Escribir documentación" },
  { "id": 5, "title": "Revisar código" }
]
```

**src/components/SearchDemo.tsx**
```typescript
import { useState } from 'react';
import { tasks } from '../data';
import '../styles/SearchDemo.css';

export default function SearchDemo() {
  const [searchText, setSearchText] = useState('');

  // Filtratge: comença al 3r caràcter
  const filteredTasks = searchText.length < 3 
    ? tasks
    : tasks.filter(task => 
        task.title.toLowerCase().includes(searchText.toLowerCase())
      );

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Busca una tarea (mínimo 3 caracteres)"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="search-input"
      />

      <div className="results-count">
        {searchText.length > 0 && (
          <p>{filteredTasks.length} resultados encontrados</p>
        )}
      </div>

      <ul className="tasks-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))
        ) : (
          <p className="no-results">No hay resultados que coincidan con "{searchText}"</p>
        )}
      </ul>
    </div>
  );
}
```

---

## Exercici 3: Newsportal

```
03-estructuraSitioWeb/
│
├── 📄 package.json
├── 📄 tsconfig.json
├── 📄 vite.config.ts
├── 📄 README.md
├── 📄 ESTRUCTURA_ANALYSIS.md   ✅ IMPORTANT!
│
├── 📂 public/
│   └── index.html
│
├── 📄 screenshot-original.png  ✅ IMPORTANT!
│
└── 📂 src/
    ├── 📄 main.tsx
    ├── 📄 App.tsx
    ├── 📄 index.css             (global styles)
    │
    ├── 📂 components/           ✅ 5+ components aquí
    │   ├── Header.tsx
    │   ├── Hero.tsx (o FeaturedArticle.tsx)
    │   ├── ArticleCard.tsx      (reutilizable)
    │   ├── ArticleList.tsx
    │   ├── Sidebar.tsx
    │   ├── TrendingArticles.tsx
    │   ├── NewsletterBox.tsx
    │   ├── Footer.tsx
    │   └── Layout.tsx           (main layout)
    │
    ├── 📂 styles/
    │   ├── Header.css
    │   ├── Layout.css
    │   ├── ArticleCard.css
    │   ├── Sidebar.css
    │   └── Footer.css
    │
    └── 📂 data/
        ├── articles.json
        ├── trending.json
        └── index.ts
```

### Contingut Clau per Exercici 3

**ESTRUCTURA_ANALYSIS.md** (Example)
```markdown
# Análisis de Estructura - Newsportal

## Newsportal Analizado
- **Origen:** https://www.bbc.com/news
- **Screenshot:** screenshot-original.png

## Components Identificados

### 1. Header
- **Responsabilidad:** Navegar entre secciones, mostrar logo
- **Props:** `logoUrl`, `navItems`, `onNavigate`
- **Contenido:** Logo, menú, busca

### 2. FeaturedArticle
- **Responsabilidad:** Mostrar artículo destacado
- **Props:** `article` (título, imagen, texto)
- **Contenido:** Imagen grande + texto overlay

### 3. ArticleCard  
- **Responsabilidad:** Tarjeta reutilizable para cada artículo
- **Props:** `id`, `title`, `image`, `excerpt`, `category`
- **Contenido:** Imagen pequeña + título + resumen

### 4. ArticleList
- **Responsabilidad:** Grid de múltiples tarjetas
- **Props:** `articles` (array), `onArticleClick`
- **Contenido:** ArticleCard x 6-8

### 5. Sidebar
- **Responsabilidad:** Contenido complementario
- **Props:** `trendingArticles`, `ads`
- **Contenido:** Trending, publicidad, suscripción

### 6. NewsletterBox
- **Responsabilidad:** Suscripción a newsletter
- **Props:** `onSubscribe`
- **Contenido:** Input email + botó

### 7. Footer
- **Responsabilidad:** Enlaces y información
- **Props:** `links`, `copyright`
- **Contenido:** Links, copyright, redes sociales

## Jerarquía
```
Layout
├── Header
├── FeaturedArticle
├── MainContent
│   ├── ArticleList
│   │   └── ArticleCard (x8)
│   └── Sidebar
│       ├── TrendingArticles
│       │   └── ArticleCard (x3-5)
│       ├── NewsletterBox
│       └── Ads
└── Footer
```
```

**src/components/Layout.tsx**
```typescript
import Header from './Header';
import FeaturedArticle from './FeaturedArticle';
import ArticleList from './ArticleList';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { articles, trendingArticles } from '../data';
import '../styles/Layout.css';

export default function Layout() {
  return (
    <div className="layout">
      <Header />
      <FeaturedArticle article={articles[0]} />
      
      <div className="main-content">
        <ArticleList articles={articles.slice(1)} />
        <Sidebar trendingArticles={trendingArticles} />
      </div>

      <Footer />
    </div>
  );
}
```

**src/components/ArticleCard.tsx**
```typescript
interface Article {
  id: number;
  title: string;
  image?: string;
  excerpt: string;
  category: string;
}

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <div className="article-card">
      {article.image && <img src={article.image} alt={article.title} />}
      <p className="category">{article.category}</p>
      <h3>{article.title}</h3>
      <p className="excerpt">{article.excerpt}</p>
    </div>
  );
}
```

**src/data/articles.json**
```json
[
  {
    "id": 1,
    "title": "Cambio climático: últimas noticias",
    "image": "https://via.placeholder.com/600x300",
    "excerpt": "Los expertos advierten sobre el aumento de temperaturas...",
    "category": "Ciencia"
  },
  {
    "id": 2,
    "title": "Tecnología: IA revoluciona el mercado",
    "excerpt": "Las últimas IA están cambiando el panorama...",
    "category": "Tecnología"
  }
]
```

**src/styles/Layout.css**
```css
.layout {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto 1fr auto;
  min-height: 100vh;
  gap: 2rem;
}

.main-content {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
  padding: 0 2rem;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .main-content {
    grid-template-columns: 1fr;
  }
}
```

---

## 📋 FILE NAMING CONVENTIONS

✅ **Bè:**
```
ProvinceSelector.tsx
SearchDemo.tsx
ArticleCard.tsx
Header.tsx
```

❌ **Mal:**
```
provinceselector.tsx
Component.tsx
card.tsx
header.js    (has de ser .tsx)
```

---

## 📦 PACKAGE.JSON TEMPLATE

```json
{
  "name": "exercici-1",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5.3.3",
    "vite": "^5.0.0"
  }
}
```

---

## ✅ VERIFICACIÓ FINAL

Per cada exercici, verifica:

```
□ Estructura fitxers és correcta
□ import/export paths funcionen
□ yarn dev executa sense errors
□ TypeScript no mostra errors vermells
□ Funcionalitat funciona al navegador
□ README.md hi és amb instruccions
□ No hi ha console.log() de debug (opcional, pero net)
□ Package.json té les dependencies correctes
□ .gitignore ignora node_modules
```

---

**Última actualització:** 17 de Març 2026
