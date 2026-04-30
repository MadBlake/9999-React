// src/hooks/__tests__/useFilter.test.ts
import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useFilter } from '../useFilter'
import { Task } from '../../types/Task'

describe('useFilter', () => {
  const mockTasks: Task[] = [
    {
      id: '1',
      title: 'Task 1',
      description: 'Description 1',
      completed: false,
      priority: 'high',
      dueDate: '2024-12-31',
      category: 'Work',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Task 2',
      description: 'Description 2',
      completed: true,
      priority: 'low',
      dueDate: '2024-12-31',
      category: 'Personal',
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Task 3',
      description: 'Description 3',
      completed: false,
      priority: 'medium',
      dueDate: '2024-12-31',
      category: 'Work',
      createdAt: new Date().toISOString(),
    },
  ]

  it('returns all tasks with default filters', () => {
    const { result } = renderHook(() => useFilter(mockTasks))
    expect(result.current.filteredTasks).toHaveLength(3)
  })

  it('initializes with default filters', () => {
    const { result } = renderHook(() => useFilter(mockTasks))
    expect(result.current.filters.status).toBe('all')
    expect(result.current.filters.priority).toBe('all')
    expect(result.current.filters.category).toBe('')
  })

  it('extracts unique categories', () => {
    const { result } = renderHook(() => useFilter(mockTasks))
    expect(result.current.categories).toContain('Work')
    expect(result.current.categories).toContain('Personal')
    expect(result.current.categories).toHaveLength(2)
  })

  it('has setFilters function', () => {
    const { result } = renderHook(() => useFilter(mockTasks))
    expect(typeof result.current.setFilters).toBe('function')
  })
})
