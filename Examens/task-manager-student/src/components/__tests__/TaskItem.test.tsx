// src/components/__tests__/TaskItem.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TaskProvider } from '../../context/TaskContext'
import { TaskItem } from '../TaskItem'
import { Task } from '../../types/Task'

describe('TaskItem', () => {
  const mockTask: Task = {
    id: '1',
    title: 'Test Task',
    description: 'Test description',
    completed: false,
    priority: 'high',
    dueDate: '2024-12-31',
    category: 'Work',
    createdAt: new Date().toISOString(),
  }

  it('renders task title', () => {
    render(
      <TaskProvider>
        <TaskItem task={mockTask} />
      </TaskProvider>
    )
    expect(screen.getByText('Test Task')).toBeInTheDocument()
  })

  it('renders task description', () => {
    render(
      <TaskProvider>
        <TaskItem task={mockTask} />
      </TaskProvider>
    )
    expect(screen.getByText('Test description')).toBeInTheDocument()
  })

  it('renders priority badge', () => {
    render(
      <TaskProvider>
        <TaskItem task={mockTask} />
      </TaskProvider>
    )
    const priorityBadge = screen.getByText('high')
    expect(priorityBadge).toBeInTheDocument()
  })

  it('renders category badge', () => {
    render(
      <TaskProvider>
        <TaskItem task={mockTask} />
      </TaskProvider>
    )
    expect(screen.getByText('Work')).toBeInTheDocument()
  })

  it('displays due date', () => {
    render(
      <TaskProvider>
        <TaskItem task={mockTask} />
      </TaskProvider>
    )
    expect(screen.getByText(/Vencimiento:/)).toBeInTheDocument()
  })

  it('checkbox is initially unchecked', () => {
    render(
      <TaskProvider>
        <TaskItem task={mockTask} />
      </TaskProvider>
    )
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
  })

  // TODO: Afegeix més tests per verificar:
  // - Que el checkbox estigui marcat si la tasca está completada
  // - Que el botó de eliminar existeixi
  // - Que la tasca tingui la classe 'overdue' si la data és passada
})
