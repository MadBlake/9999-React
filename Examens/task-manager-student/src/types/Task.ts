// src/types/Task.ts
export interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  dueDate: string
  category: string
  createdAt: string
}
//TODO: Implementa la Interficie TaskFormData que faras us a TaskForm.tsx per gestionar les dades del formulari. 
// Aquesta interficie ha de tenir les següents propietats:
// title
// description
// priority: 'low', 'medium', 'high'
// dueDate
// category


export interface FilterOptions {
  status: 'all' | 'completed' | 'pending'
  priority: 'all' | 'low' | 'medium' | 'high'
  category: string
}
