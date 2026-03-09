import { useState } from 'react'
import Welcome from './pages/Welcome'
import UseStateDemo from './pages/UseStateDemo'
import UseEffectDemo from './pages/UseEffectDemo'
import UseRefDemo from './pages/UseRefDemo'
import UseMemoDemo from './pages/UseMemoDemo'
import UseReducerDemo from './pages/UseReducerDemo'
import CustomHooksDemo from './pages/CustomHooksDemo'

const navItems = [
  { id: 'home', label: 'Inici', num: '🏠' },
  { id: 'useState', label: 'useState', num: '1' },
  { id: 'useEffect', label: 'useEffect', num: '2' },
  { id: 'useRef', label: 'useRef', num: '3' },
  { id: 'useMemo', label: 'useMemo & useCallback', num: '4' },
  { id: 'useReducer', label: 'useReducer', num: '5' },
  { id: 'customHooks', label: 'Custom Hooks', num: '6' },
]

export default function App() {
  const [page, setPage] = useState('home')

  const renderPage = () => {
    switch (page) {
      case 'useState': return <UseStateDemo />
      case 'useEffect': return <UseEffectDemo />
      case 'useRef': return <UseRefDemo />
      case 'useMemo': return <UseMemoDemo />
      case 'useReducer': return <UseReducerDemo />
      case 'customHooks': return <CustomHooksDemo />
      default: return <Welcome onNavigate={setPage} />
    }
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <h1>⚛️ React Hooks</h1>
        <nav>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={page === item.id ? 'active' : ''}
              onClick={() => setPage(item.id)}
            >
              <span className="hook-number">{item.num}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  )
}
