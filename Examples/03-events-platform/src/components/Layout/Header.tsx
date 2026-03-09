import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">🎉</span>
          <span className="logo-text">EventHub</span>
        </Link>
        
        <nav className="nav">
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/events" className="nav-link">Eventos</Link>
          <Link to="/create" className="nav-link nav-link-cta">
            + Crear Evento
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
