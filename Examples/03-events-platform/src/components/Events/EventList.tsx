import { Event } from '../../types/Event'
import EventCard from './EventCard'
import './EventList.css'

interface EventListProps {
  events: Event[]
  title?: string
}

function EventList({ events, title }: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="event-list-empty">
        <span className="empty-icon">🔍</span>
        <h3>No se encontraron eventos</h3>
        <p>Prueba con otros filtros o crea un nuevo evento</p>
      </div>
    )
  }

  return (
    <section className="event-list-section">
      {title && <h2 className="event-list-title">{title}</h2>}
      <div className="event-list-grid">
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  )
}

export default EventList
