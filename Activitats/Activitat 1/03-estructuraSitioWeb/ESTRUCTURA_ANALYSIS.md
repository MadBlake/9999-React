Estructura de Componentes: Sitio de Noticias/Blog
===================================================

## Análisis del Sitio Web (Diseño Basado en Portales de Noticias como El País, Dev.to)

### 1. ESTRUCTURA GENERAL DE COMPONENTES

```
App
├── Layout
│   ├── Header
│   │   ├── Logo
│   │   ├── Navigation
│   │   │   ├── NavLinks
│   │   │   └── MobileMenu
│   │   ├── SearchBar
│   │   └── UserMenu
│   │
│   ├── Main Content Area
│   │   ├── HomePage
│   │   │   ├── HeroSection
│   │   │   ├── FeaturedArticles
│   │   │   ├── ArticleGrid
│   │   │   └── Sidebar
│   │   │       ├── TrendingArticles
│   │   │       ├── Newsletter
│   │   │       └── Ads
│   │   │
│   │   ├── ArticleDetailPage
│   │   │   ├── ArticleHeader
│   │   │   ├── ArticleBody
│   │   │   ├── ArticleFooter
│   │   │   ├── Comments
│   │   │   └── RelatedArticles
│   │   │
│   │   ├── CategoryPage
│   │   │   ├── CategoryHeader
│   │   │   ├── ArticleList
│   │   │   └── Pagination
│   │   │
│   │   └── SearchResultsPage
│   │       ├── SearchHeader
│   │       ├── FilterBar
│   │       ├── ArticleList
│   │       └── Pagination
│   │
│   └── Footer
│       ├── FooterLinks
│       ├── SocialMedia
│       └── Copyright
│
└── Context/State Management
    ├── AuthContext (usuario logueado)
    ├── ThemeContext (modo claro/oscuro)
    └── ArticleContext (datos de artículos)
```

### 2. COMPONENTES REUTILIZABLES (SHARED)

- **ArticleCard**: Tarjeta de artículo con imagen, título y resumen
- **Button**: Botones genéricos (primario, secundario, etc.)
- **Badge**: Etiquetas para categorías
- **Rating**: Sistema de valoración
- **Spinner**: Indicador de carga
- **Modal**: Componente modal genérico
- **Pagination**: Componente de paginación
- **Breadcrumbs**: Migas de pan para navegación

### 3. TIPOS DE DATOS

```typescript
interface Article {
  id: string
  title: string
  slug: string
  author: Author
  category: Category
  image: string
  excerpt: string
  content: string
  publishedAt: Date
  updatedAt: Date
  views: number
  featured: boolean
}

interface Author {
  id: string
  name: string
  avatar: string
  bio: string
}

interface Category {
  id: string
  name: string
  slug: string
  color: string
}

interface Comment {
  id: string
  author: Author
  content: string
  createdAt: Date
  replies: Comment[]
}
```

### 4. CARACTERÍSTICAS PRINCIPALES

✓ **Header**: Logo, navegación principal, búsqueda, menú de usuario
✓ **Homepage**: Hero, artículos destacados, grid de artículos, sidebar
✓ **Artículo detallado**: Contenido completo, autor info, comentarios relacionados
✓ **Categorías**: Filtrado por temas
✓ **Búsqueda**: Búsqueda global con resultados paginados
✓ **Footer**: Enlaces, redes sociales
✓ **Responsive**: Adaptable a móvil

### 5. FLUJO DE NAVEGACIÓN

Home → Listar artículos
     ↓
     → Hacer clic en artículo → Ver detalle completo
     ↓
     → Comentar/Valorar
     ↓
     → Ver artículos relacionados
     ↓
     → Filtrar por categoría
     ↓
     → Buscar artículos
