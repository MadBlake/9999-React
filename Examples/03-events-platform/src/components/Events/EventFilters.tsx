import { useState } from 'react'
import { EventCategory } from '../../types/Event'
import './EventFilters.css'

interface EventFiltersProps {
  onSearch: (query: string) => void
  onCategoryChange: (category: string) => void
}

const categories: { value: string; label: string; icon: string }[] = [
  { value: 'todos', label: 'Todos', icon: '🎯' },
  { value: 'música', label: 'Música', icon: '🎵' },
  { value: 'tecnología', label: 'Tecnología', icon: '💻' },
  { value: 'deportes', label: 'Deportes', icon: '⚽' },
  { value: 'arte', label: 'Arte', icon: '🎨' },
  { value: 'gastronomía', label: 'Gastronomía', icon: '🍽️' },
  { value: 'negocios', label: 'Negocios', icon: '💼' },
]

function EventFilters({ onSearch, onCategoryChange }: EventFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('todos')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    onSearch(query)
  }

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category)
    onCategoryChange(category)
  }

  return (
    <div className="event-filters">
      <div className="search-box">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Buscar eventos..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      
      <div className="category-filters">
        {categories.map(cat => (
          <button
            key={cat.value}
            className={`category-btn ${activeCategory === cat.value ? 'active' : ''}`}
            onClick={() => handleCategoryClick(cat.value)}
          >
            <span className="cat-icon">{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default EventFilters
