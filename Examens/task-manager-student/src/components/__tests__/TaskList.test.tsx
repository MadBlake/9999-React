// src/components/__tests__/TaskList.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TaskProvider } from '../../context/TaskContext'
import { TaskList } from '../TaskList'
import { Task } from '../../types/Task'

describe('TaskList', () => {
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
  ]

  it('renders all tasks', () => {
    render(
      <TaskProvider>
        <TaskList tasks={mockTasks} />
      </TaskProvider>
    )
    expect(screen.getByText('Task 1')).toBeInTheDocument()
    expect(screen.getByText('Task 2')).toBeInTheDocument()
  })

  it('shows empty state when no tasks', () => {
    render(
      <TaskProvider>
        <TaskList tasks={[]} />
      </TaskProvider>
    )
    expect(screen.getByText('No hay tareas que mostrar')).toBeInTheDocument()
  })

  it('shows custom empty message', () => {
    const customMessage = 'No tienes tareas pendientes'
    render(
      <TaskProvider>
        <TaskList tasks={[]} emptyMessage={customMessage} />
      </TaskProvider>
    )
    expect(screen.getByText(customMessage)).toBeInTheDocument()
  })

  it('renders correct number of items', () => {
    const { container } = render(
      <TaskProvider>
        <TaskList tasks={mockTasks} />
      </TaskProvider>
    )
    const items = container.querySelectorAll('.task-item')
    expect(items).toHaveLength(2)
  })
})
