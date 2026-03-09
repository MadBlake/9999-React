import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEvents } from '../../context/EventContext'
import { EventFormData, EventCategory } from '../../types/Event'
import './EventForm.css'

const categories: EventCategory[] = [
  'música', 'tecnología', 'deportes', 'arte', 'gastronomía', 'negocios'
]

function EventForm() {
  const navigate = useNavigate()
  const { addEvent } = useEvents()
  
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: 'tecnología',
    imageUrl: '',
    price: 0,
    capacity: 100,
    organizer: ''
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'capacity' ? Number(value) : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addEvent(formData)
    navigate('/events')
  }

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Título del evento *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Ej: Conferencia de React 2026"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Descripción *</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          placeholder="Describe tu evento..."
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="date">Fecha *</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="time">Hora *</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="location">Ubicación *</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          placeholder="Ej: Centro de Convenciones, Madrid"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="category">Categoría *</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="price">Precio (€)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            placeholder="0 para gratuito"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="capacity">Capacidad *</label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            required
            min="1"
          />
        </div>

        <div className="form-group">
          <label htmlFor="organizer">Organizador *</label>
          <input
            type="text"
            id="organizer"
            name="organizer"
            value={formData.organizer}
            onChange={handleChange}
            required
            placeholder="Nombre del organizador"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="imageUrl">URL de imagen</label>
        <input
          type="url"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="https://ejemplo.com/imagen.jpg"
        />
      </div>

      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={() => navigate(-1)}>
          Cancelar
        </button>
        <button type="submit" className="btn-submit">
          Crear Evento
        </button>
      </div>
    </form>
  )
}

export default EventForm
