import { useState, useEffect, useRef } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import './App.css'
import Welcome from './components/Welcome'
import { UserCard } from './components/UserCard'
import Container from './components/Container'
import { useTrackRender, RenderVisualizer, ComponentTree, useRenderData } from './components/RenderTracker'
import { RenderDemo } from './components/RenderDemo'
import { RenderingExample } from './components/RenderingExample'

// Componente de navegación
const Navigation = () => {
  return (
    <nav className="main-nav">
      <Link to="/" className="nav-link">🏠 Inicio</Link>
      <Link to="/rendering" className="nav-link">🎓 Ejemplo de Renderizado</Link>
    </nav>
  );
};

// Página principal (Home)
const HomePage = () => {
  useTrackRender('HomePage', 'App');
  const [count, setCount] = useState(0)
  const [showDemo, setShowDemo] = useState(true)

  return (
    <>
      <div className="card">
        <Welcome name="My Name" />
      </div>
      <Container className="card">
        <UserCard user={{ id: 1, name: 'John Doe', email: 'johndoe@test.com' }} 
          onEdit={(id) => alert(`Edit user with id: ${id}`)} />
          <UserCard user={{ id: 1, name: 'John Doe', email: 'johndoe@test.com' }} 
          onEdit={(id) => alert(`Edit user with id: ${id}`)} />
      </Container>
      
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      
      <div className="card">
        <button onClick={() => setShowDemo(!showDemo)}>
          {showDemo ? '🙈 Ocultar' : '👀 Mostrar'} Demo de Renderizado
        </button>
      </div>
      
      {showDemo && (
        <>
          <ComponentTree />
          <RenderDemo />
        </>
      )}
    </>
  );
};

function App() {
  useTrackRender('App');
  const location = useLocation();
  const { clearLogs } = useRenderData();
  const previousPathRef = useRef<string | null>(null);

  // Limpiar logs solo cuando la ruta CAMBIA (no en el primer mount)
  useEffect(() => {
    if (previousPathRef.current !== null && previousPathRef.current !== location.pathname) {
      clearLogs();
    }
    previousPathRef.current = location.pathname;
  }, [location.pathname, clearLogs]);

  return (
    <div className="app-container">
      <Navigation />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rendering" element={<RenderingExample />} />
        </Routes>
      </main>
      
      <RenderVisualizer />
    </div>
  )
}

export default App
