// src/components/TaskItem.tsx
import React from 'react'
import { Task } from '../types/Task'
import { useTask } from '../hooks/useTask'
import './TaskItem.css'

interface TaskItemProps {
  task: Task
}

export function TaskItem({ task }: TaskItemProps) {
  const { toggleTaskCompletion, deleteTask } = useTask()

  const handleToggle = () => {
    // TODO: Implementa la lògica per canviar el state d'una tasca
    // (marcar com completada/pendent)
  }

  const handleDelete = () => {
    // TODO: Implementa la lògica per eliminar una tasca
    // Suggerencia: Pregunta al usuari si está segur antes de eliminar windows.confirm
  }

  const getPriorityClass = (priority: string) => {
    return `priority-${priority}`
  }

  const isOverdue = new Date(task.dueDate) < new Date() && !task.completed

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
      <div className="task-checkbox">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          id={`task-${task.id}`}
        />
      </div>

      <div className="task-content">
        <label htmlFor={`task-${task.id}`} className="task-title">
          {task.title}
        </label>
        {task.description && <p className="task-description">{task.description}</p>}

        <div className="task-meta">
          <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
            {task.priority}
          </span>
          <span className="category-badge">{task.category}</span>
          <span className="due-date">
            Vencimiento: {new Date(task.dueDate).toLocaleDateString('es-ES')}
          </span>
        </div>
      </div>

      <button
        className="btn btn-danger btn-small"
        onClick={handleDelete}
        aria-label="Eliminar tarea"
      >
        ✕
      </button>
    </div>
  )
}
