import { createContext, useContext, useState, ReactNode } from 'react'
import { Event, EventFormData } from '../types/Event'
import { mockEvents } from '../data/mockEvents'

interface EventContextType {
  events: Event[]
  featuredEvents: Event[]
  addEvent: (eventData: EventFormData) => void
  deleteEvent: (id: string) => void
  getEventById: (id: string) => Event | undefined
  registerForEvent: (id: string) => void
  searchEvents: (query: string) => Event[]
  filterByCategory: (category: string) => Event[]
}

const EventContext = createContext<EventContextType | undefined>(undefined)

export function EventProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>(mockEvents)

  const featuredEvents = events.filter(event => event.isFeatured)

  const addEvent = (eventData: EventFormData) => {
    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString(),
      attendees: 0,
      isFeatured: false
    }
    setEvents(prev => [...prev, newEvent])
  }

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id))
  }

  const getEventById = (id: string) => {
    return events.find(event => event.id === id)
  }

  const registerForEvent = (id: string) => {
    setEvents(prev => 
      prev.map(event => 
        event.id === id && event.attendees < event.capacity
          ? { ...event, attendees: event.attendees + 1 }
          : event
      )
    )
  }

  const searchEvents = (query: string) => {
    const lowercaseQuery = query.toLowerCase()
    return events.filter(event => 
      event.title.toLowerCase().includes(lowercaseQuery) ||
      event.description.toLowerCase().includes(lowercaseQuery) ||
      event.location.toLowerCase().includes(lowercaseQuery)
    )
  }

  const filterByCategory = (category: string) => {
    if (category === 'todos') return events
    return events.filter(event => event.category === category)
  }

  return (
    <EventContext.Provider value={{
      events,
      featuredEvents,
      addEvent,
      deleteEvent,
      getEventById,
      registerForEvent,
      searchEvents,
      filterByCategory
    }}>
      {children}
    </EventContext.Provider>
  )
}

export function useEvents() {
  const context = useContext(EventContext)
  if (context === undefined) {
    throw new Error('useEvents debe usarse dentro de un EventProvider')
  }
  return context
}
