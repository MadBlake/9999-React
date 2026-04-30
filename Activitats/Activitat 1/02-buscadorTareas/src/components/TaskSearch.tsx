import { useState } from 'react'
import { Task } from '../types'
import './TaskSearch.css'

// Lista inicial de tareas de ejemplo
const INITIAL_TASKS: Task[] = [
  { id: 1, title: 'Hacer la compra', completed: false },
  { id: 2, title: 'Limpiar la casa', completed: false },
  { id: 3, title: 'Estudiar React', completed: true },
  { id: 4, title: 'Hacer ejercicio', completed: false },
  { id: 5, title: 'Terminar proyecto de TypeScript', completed: false },
  { id: 6, title: 'Listar las tareas pendientes', completed: false },
  { id: 7, title: 'Revisar código', completed: true },
  { id: 8, title: 'Escribir documentación', completed: false },
  { id: 9, title: 'Hacer una lista de compras', completed: false },
  { id: 10, title: 'Organizar el escritorio', completed: false },
  { id: 11, title: 'Hacer llamadas importantes', completed: false },
  { id: 12, title: 'Estudiar algoritmos', completed: false },
]

export default function TaskSearch() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [tasks] = useState<Task[]>(INITIAL_TASKS)

  // Filtrar tareas solo si el término de búsqueda tiene al menos 3 caracteres
  const filteredTasks = searchTerm.length < 3
    ? tasks
    : tasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      )

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className="task-search">
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar tareas... (mínimo 3 caracteres)"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        {searchTerm.length > 0 && searchTerm.length < 3 && (
          <p className="info-message">
            Escribe al menos 3 caracteres para filtrar ({searchTerm.length}/3)
          </p>
        )}
      </div>

      <div className="task-list">
        <h2>Tareas ({filteredTasks.length})</h2>
        {filteredTasks.length === 0 ? (
          <p className="no-tasks">
            {searchTerm.length >= 3
              ? 'No se encontraron tareas que coincidan con tu búsqueda'
              : 'No hay tareas'}
          </p>
        ) : (
          <ul>
            {filteredTasks.map(task => (
              <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                <span className="task-checkbox">
                  {task.completed && '✓'}
                </span>
                <span className="task-title">{task.title}</span>
                {task.completed && <span className="task-badge">Completado</span>}
              </li>
            ))}
          </ul>
        )}
      </div>

      {searchTerm.length >= 3 && (
        <p className="results-info">
          Mostrando {filteredTasks.length} de {tasks.length} tareas
        </p>
      )}
    </div>
  )
}
