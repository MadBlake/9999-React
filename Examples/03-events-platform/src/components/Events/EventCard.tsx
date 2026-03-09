import { Link } from 'react-router-dom'
import { Event } from '../../types/Event'
import './EventCard.css'

interface EventCardProps {
  event: Event
}

function EventCard({ event }: EventCardProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const availableSpots = event.capacity - event.attendees
  const isSoldOut = availableSpots === 0

  return (
    <article className="event-card">
      <div className="event-card-image">
        <img src={event.imageUrl} alt={event.title} />
        <span className={`category-badge category-${event.category}`}>
          {event.category}
        </span>
        {event.isFeatured && <span className="featured-badge">⭐ Destacado</span>}
      </div>
      
      <div className="event-card-content">
        <div className="event-card-date">
          <span className="date-icon">📅</span>
          {formatDate(event.date)} • {event.time}
        </div>
        
        <h3 className="event-card-title">{event.title}</h3>
        
        <div className="event-card-location">
          <span className="location-icon">📍</span>
          {event.location}
        </div>
        
        <div className="event-card-footer">
          <div className="event-price">
            {event.price === 0 ? 'Gratis' : `${event.price}€`}
          </div>
          
          <div className="event-spots">
            {isSoldOut ? (
              <span className="sold-out">Agotado</span>
            ) : (
              <span>{availableSpots} plazas</span>
            )}
          </div>
        </div>
        
        <Link to={`/events/${event.id}`} className="event-card-link">
          Ver detalles →
        </Link>
      </div>
    </article>
  )
}

export default EventCard
