export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  category: EventCategory
  imageUrl: string
  price: number
  capacity: number
  attendees: number
  organizer: string
  isFeatured: boolean
}

export type EventCategory = 
  | 'música' 
  | 'tecnología' 
  | 'deportes' 
  | 'arte' 
  | 'gastronomía' 
  | 'negocios'

export interface EventFormData {
  title: string
  description: string
  date: string
  time: string
  location: string
  category: EventCategory
  imageUrl: string
  price: number
  capacity: number
  organizer: string
}
