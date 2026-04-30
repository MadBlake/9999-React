// src/components/TaskList.tsx
import React from 'react'
import { Task } from '../types/Task'
import { TaskItem } from './TaskItem'
import './TaskList.css'

interface TaskListProps {
  tasks: Task[]
  emptyMessage?: string
}

export function TaskList({
  tasks,
  emptyMessage = 'No hay tareas que mostrar',
}: TaskListProps) {
  // TODO: Renderiza una lista de TaskItem para cada tarea
  // Si no hay tareas, muestra el emptyMessage en un div con clase 'empty-state'
  // Elimina el return de abajo y implementa la lógica para mostrar la lista de tareas o el mensaje de estado vacío
  return <div>TODO: Renderizar lista de tareas</div>
}
