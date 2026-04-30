// src/components/TaskFilter.tsx
import React, { useState } from 'react'
import { FilterOptions } from '../types/Task'
import './TaskFilter.css'

interface TaskFilterProps {
  filters: FilterOptions
  categories: string[]
  onFilterChange: (filters: FilterOptions) => void
}

export function TaskFilter({
  filters,
  categories,
  onFilterChange,
}: TaskFilterProps) {
  // TODO: Implementa los estados para los filtros
  // Necesitas estados para: status, priority, category
  // Los valores iniciales están proporcionados en la prop filters
  
  const handleStatusChange = (status: 'all' | 'completed' | 'pending') => {
    // TODO: Implementa para cambiar el filtro de status
    // Actualiza el estado status
    // Llama a onFilterChange con los filtros actualizados
  }

  const handlePriorityChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    // TODO: Implementa para cambiar el filtro de priority
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // TODO: Implementa para cambiar el filtro de category
  }

  return (
    <div className="task-filter">
      <div className="filter-group">
        <label>Estado:</label>
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filters.status === 'all' ? 'active' : ''}`}
            onClick={() => handleStatusChange('all')}
          >
            Todas
          </button>
          <button
            className={`filter-btn ${filters.status === 'pending' ? 'active' : ''}`}
            onClick={() => handleStatusChange('pending')}
          >
            Pendientes
          </button>
          <button
            className={`filter-btn ${filters.status === 'completed' ? 'active' : ''}`}
            onClick={() => handleStatusChange('completed')}
          >
            Completadas
          </button>
        </div>
      </div>

      <div className="filter-group">
        <label htmlFor="priority-filter">Prioridad:</label>
        <select
          id="priority-filter"
          value={filters.priority}
          onChange={handlePriorityChange}
        >
          <option value="all">Todas</option>
          <option value="low">Baja</option>
          <option value="medium">Media</option>
          <option value="high">Alta</option>
        </select>
      </div>

      {categories.length > 0 && (
        <div className="filter-group">
          <label htmlFor="category-filter">Categoría:</label>
          <select
            id="category-filter"
            value={filters.category}
            onChange={handleCategoryChange}
          >
            <option value="">Todas</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  )
}
