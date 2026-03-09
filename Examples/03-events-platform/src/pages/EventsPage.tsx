import { useState, useMemo } from 'react'
import { useEvents } from '../context/EventContext'
import EventList from '../components/Events/EventList'
import EventFilters from '../components/Events/EventFilters'
import './EventsPage.css'

function EventsPage() {
  const { events, searchEvents, filterByCategory } = useEvents()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('todos')

  const filteredEvents = useMemo(() => {
    let result = events

    if (searchQuery) {
      result = searchEvents(searchQuery)
    }

    if (selectedCategory !== 'todos') {
      result = result.filter(event => event.category === selectedCategory)
    }

    return result
  }, [events, searchQuery, selectedCategory, searchEvents])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  return (
    <div className="events-page">
      <div className="events-page-header">
        <h1>🎫 Todos los Eventos</h1>
        <p>Encuentra el evento perfecto para ti</p>
      </div>

      <EventFilters 
        onSearch={handleSearch} 
        onCategoryChange={handleCategoryChange} 
      />

      <div className="events-results">
        <p className="results-count">
          {filteredEvents.length} evento{filteredEvents.length !== 1 ? 's' : ''} encontrado{filteredEvents.length !== 1 ? 's' : ''}
        </p>
        <EventList events={filteredEvents} />
      </div>
    </div>
  )
}

export default EventsPage
