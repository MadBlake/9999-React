// src/hooks/useFilter.ts
import { useState } from 'react'
import { Task } from '../types/Task'
import { FilterOptions } from '../types/Task'

export function useFilter(tasks: Task[]) {
  const [filters, setFilters] = useState<FilterOptions>({
    status: 'all',
    priority: 'all',
    category: '',
  })

  // Filtrar tareas según los filtros seleccionados
  const filteredTasks = tasks.filter((task) => {
    if (filters.status === 'completed' && !task.completed) return false
    if (filters.status === 'pending' && task.completed) return false
    if (filters.priority !== 'all' && task.priority !== filters.priority) return false
    if (filters.category && task.category !== filters.category) return false
    return true
  })

  // Extraer categorías únicas de las tareas
  const categories = Array.from(new Set(tasks.map((task) => task.category)))

  return {
    filters,
    setFilters,
    filteredTasks,
    categories,
  }
}

