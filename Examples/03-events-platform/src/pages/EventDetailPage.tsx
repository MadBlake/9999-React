import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEvents } from '../context/EventContext'
import './EventDetailPage.css'

function EventDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { getEventById, registerForEvent, deleteEvent } = useEvents()

  const event = getEventById(id || '')

  if (!event) {
    return (
      <div className="event-not-found">
        <h2>😕 Evento no encontrado</h2>
        <p>El evento que buscas no existe o ha sido eliminado.</p>
        <Link to="/events" className="btn-back">
          ← Volver a eventos
        </Link>
      </div>
    )
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const availableSpots = event.capacity - event.attendees
  const isSoldOut = availableSpots === 0
  const progressPercentage = (event.attendees / event.capacity) * 100

  const handleRegister = () => {
    registerForEvent(event.id)
    alert('¡Te has registrado con éxito!')
  }

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de eliminar este evento?')) {
      deleteEvent(event.id)
      navigate('/events')
    }
  }

  return (
    <div className="event-detail-page">
      <div className="event-detail-header">
        <Link to="/events" className="back-link">
          ← Volver a eventos
        </Link>
      </div>

      <div className="event-detail-content">
        <div className="event-detail-main">
          <div className="event-image-container">
            <img src={event.imageUrl} alt={event.title} />
            <span className={`detail-category category-${event.category}`}>
              {event.category}
            </span>
          </div>

          <h1>{event.title}</h1>

          <div className="event-meta">
            <div className="meta-item">
              <span className="meta-icon">📅</span>
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="meta-item">
              <span className="meta-icon">🕐</span>
              <span>{event.time}</span>
            </div>
            <div className="meta-item">
              <span className="meta-icon">📍</span>
              <span>{event.location}</span>
            </div>
            <div className="meta-item">
              <span className="meta-icon">👤</span>
              <span>{event.organizer}</span>
            </div>
          </div>

          <div className="event-description">
            <h2>Sobre el evento</h2>
            <p>{event.description}</p>
          </div>
        </div>

        <aside className="event-detail-sidebar">
          <div className="sidebar-card">
            <div className="price-tag">
              {event.price === 0 ? 'Gratis' : `${event.price}€`}
            </div>

            <div className="capacity-info">
              <div className="capacity-header">
                <span>{event.attendees} / {event.capacity} asistentes</span>
                <span className={isSoldOut ? 'sold-out' : 'available'}>
                  {isSoldOut ? 'Agotado' : `${availableSpots} disponibles`}
                </span>
              </div>
              <div className="capacity-bar">
                <div 
                  className="capacity-progress"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            <button 
              className="btn-register"
              onClick={handleRegister}
              disabled={isSoldOut}
            >
              {isSoldOut ? 'Evento Agotado' : 'Inscribirse'}
            </button>

            <button className="btn-delete" onClick={handleDelete}>
              🗑️ Eliminar evento
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default EventDetailPage
