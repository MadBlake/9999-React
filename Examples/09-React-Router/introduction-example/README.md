# React Router - Introducció

Exemple bàsic de React Router amb TypeScript basat en el tutorial de [Campus Empresa](https://campusempresa.cat/cursos/react/06-01-introduction-react-router).

## Estructura del Projecte

```
src/
├── components/
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   └── Services.tsx
├── App.tsx
├── main.tsx
└── index.css
```

## Conceptes Clau

1. **Rutes (Routes)**: Defineixen les diferents vies de navegació dins de l'aplicació.
2. **Enrutador (Router)**: Component que s'encarrega de gestionar les rutes. Fem servir `BrowserRouter`.
3. **Enllaços (Links)**: Components que permeten la navegació entre rutes sense recarregar la pàgina.

## Components

### App.tsx
Component principal que envoltem amb `BrowserRouter` i definim les rutes i enllaços de navegació.

```tsx
<BrowserRouter>
  <nav>
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>
    <Link to="/contact">Contact</Link>
    <Link to="/services">Services</Link>
  </nav>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/services" element={<Services />} />
  </Routes>
</BrowserRouter>
```

### Components de Pàgina
Cada ruta renderitza un component diferent:
- `Home.tsx`: Pàgina principal
- `About.tsx`: Pàgina sobre nosaltres
- `Contact.tsx`: Pàgina de contacte
- `Services.tsx`: Pàgina de serveis

## Instal·lació de Dependències

```bash
npm install
```

## Execució

Per executar l'aplicació en mode desenvolupament:

```bash
npm run dev
```

Per compilar el projecte:

```bash
npm run build
```

## Diferències amb React Router v5

Aquest exemple usa **React Router v6** (versió actual). Les principals diferències respecte a v5 són:

- `<BrowserRouter>` envolta l'aplicació
- `<Switch>` ha sigut reemplaçat per `<Routes>`
- `<Route>` usa `element` en lloc de `component`
- Els `<Link>` funcionen igual però de forma més eficient

## Exercici Pràctic

La pàgina `/services` és un bon exemple d'com estendre aquest projecte. Intenta afegir més rutes o components per practicar!

## Resources

- [React Router Documentation](https://reactrouter.com/)
- [Tutorial Original](https://campusempresa.cat/cursos/react/06-01-introduction-react-router)
