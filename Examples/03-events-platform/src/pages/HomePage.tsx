import { Link } from 'react-router-dom'
import { useEvents } from '../context/EventContext'
import EventList from '../components/Events/EventList'
import './HomePage.css'

function HomePage() {
  const { featuredEvents, events } = useEvents()

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Descubre los mejores eventos cerca de ti</h1>
          <p>
            Encuentra conciertos, conferencias, talleres y mucho más. 
            Únete a miles de personas que ya disfrutan de experiencias únicas.
          </p>
          <div className="hero-actions">
            <Link to="/events" className="btn-hero-primary">
              Explorar Eventos
            </Link>
            <Link to="/create" className="btn-hero-secondary">
              Crear Evento
            </Link>
          </div>
        </div>
        
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">{events.length}</span>
            <span className="stat-label">Eventos</span>
          </div>
          <div className="stat">
            <span className="stat-number">10k+</span>
            <span className="stat-label">Asistentes</span>
          </div>
          <div className="stat">
            <span className="stat-number">50+</span>
            <span className="stat-label">Ciudades</span>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="section-header">
          <h2>⭐ Eventos Destacados</h2>
          <Link to="/events" className="see-all-link">
            Ver todos →
          </Link>
        </div>
        <EventList events={featuredEvents.slice(0, 3)} />
      </section>
    </div>
  )
}

export default HomePage
