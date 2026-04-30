// src/context/TaskContext.tsx
import React, { createContext, useReducer, ReactNode, useCallback } from 'react'
import { Task, TaskFormData } from '../types/Task'

interface TaskContextType {
  tasks: Task[]
  addTask: (taskData: TaskFormData) => void
  updateTask: (id: string, taskData: Partial<TaskFormData>) => void
  deleteTask: (id: string) => void
  toggleTaskCompletion: (id: string) => void
  getTaskById: (id: string) => Task | undefined
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined)

type TaskAction =
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: { id: string; updates: Partial<Task> } }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'TOGGLE_TASK'; payload: string }

function taskReducer(state: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, action.payload]

    case 'UPDATE_TASK':
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, ...action.payload.updates }
          : task
      )

    case 'DELETE_TASK':
      return state.filter((task) => task.id !== action.payload)

    case 'TOGGLE_TASK':
      return state.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      )

    default:
      return state
  }
}

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Estudiar React Hooks',
    description: 'Aprendre useState, useEffect, useReducer',
    completed: false,
    priority: 'high',
    dueDate: '2024-04-15',
    category: 'Learning',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Completar projecte Vite',
    description: 'Configurar build i testing',
    completed: true,
    priority: 'high',
    dueDate: '2024-04-10',
    category: 'Work',
    createdAt: new Date().toISOString(),
  },
]

interface TaskProviderProps {
  children: ReactNode
}

export function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks)

  const addTask = useCallback((taskData: TaskFormData) => {
    const newTask: Task = {
      id: Date.now().toString(),
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString(),
    }
    dispatch({ type: 'ADD_TASK', payload: newTask })
  }, [])

  const updateTask = useCallback((id: string, taskData: Partial<TaskFormData>) => {
    dispatch({ type: 'UPDATE_TASK', payload: { id, updates: taskData } })
  }, [])

  const deleteTask = useCallback((id: string) => {
    dispatch({ type: 'DELETE_TASK', payload: id })
  }, [])

  const toggleTaskCompletion = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_TASK', payload: id })
  }, [])

  const getTaskById = useCallback(
    (id: string) => tasks.find((task) => task.id === id),
    [tasks]
  )

  const value: TaskContextType = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    getTaskById,
  }

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  )
}
