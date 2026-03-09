import { useReducer, useState } from 'react'

// ============================
// Tipus
// ============================

interface Tasca {
  id: number
  text: string
  completada: boolean
  prioritat: 'alta' | 'mitjana' | 'baixa'
}

type TascaAccio =
  | { type: 'AFEGIR'; payload: { text: string; prioritat: Tasca['prioritat'] } }
  | { type: 'ESBORRAR'; payload: number }
  | { type: 'COMPLETAR'; payload: number }
  | { type: 'NETEJAR_COMPLETADES' }
  | { type: 'RESET' }

// ============================
// Reducer
// ============================

const estatInicial: Tasca[] = [
  { id: 1, text: 'Aprendre useState', completada: true, prioritat: 'alta' },
  { id: 2, text: 'Aprendre useEffect', completada: true, prioritat: 'alta' },
  { id: 3, text: 'Aprendre useRef', completada: true, prioritat: 'mitjana' },
  { id: 4, text: 'Aprendre useMemo', completada: false, prioritat: 'mitjana' },
  { id: 5, text: 'Aprendre useReducer', completada: false, prioritat: 'alta' },
  { id: 6, text: 'Crear Custom Hooks', completada: false, prioritat: 'baixa' },
]

function tascaReducer(state: Tasca[], action: TascaAccio): Tasca[] {
  switch (action.type) {
    case 'AFEGIR':
      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload.text,
          completada: false,
          prioritat: action.payload.prioritat,
        },
      ]
    case 'ESBORRAR':
      return state.filter((t) => t.id !== action.payload)
    case 'COMPLETAR':
      return state.map((t) =>
        t.id === action.payload ? { ...t, completada: !t.completada } : t
      )
    case 'NETEJAR_COMPLETADES':
      return state.filter((t) => !t.completada)
    case 'RESET':
      return estatInicial
    default:
      return state
  }
}

// ============================
// Colors de prioritat
// ============================

const prioritatColors: Record<string, { bg: string; text: string }> = {
  alta: { bg: '#ffebee', text: '#c62828' },
  mitjana: { bg: '#fff3e0', text: '#e65100' },
  baixa: { bg: '#e8f5e9', text: '#2e7d32' },
}

export default function UseReducerDemo() {
  const [tasques, dispatch] = useReducer(tascaReducer, estatInicial)
  const [novaTasca, setNovaTasca] = useState('')
  const [prioritat, setPrioritat] = useState<Tasca['prioritat']>('mitjana')
  const [filtre, setFiltre] = useState<'totes' | 'pendents' | 'completades'>('totes')

  const handleAfegir = () => {
    if (novaTasca.trim()) {
      dispatch({ type: 'AFEGIR', payload: { text: novaTasca.trim(), prioritat } })
      setNovaTasca('')
    }
  }

  const tasquesFiltrades = tasques.filter((t) => {
    if (filtre === 'pendents') return !t.completada
    if (filtre === 'completades') return t.completada
    return true
  })

  const completades = tasques.filter((t) => t.completada).length
  const pendents = tasques.length - completades
  const percentatge = tasques.length > 0 ? Math.round((completades / tasques.length) * 100) : 0

  return (
    <>
      <h1>useReducer</h1>
      <p className="subtitle">Gestió d'estat complex amb el patró Reducer</p>

      {/* Estadístiques */}
      <div className="demo-section">
        <h2>Gestor de tasques</h2>

        {/* Barra de progrés */}
        <div style={{ marginBottom: 15 }}>
          <div className="flex-row" style={{ justifyContent: 'space-between', marginBottom: 5 }}>
            <span style={{ fontSize: '0.85rem', color: '#888' }}>Progrés</span>
            <span className="badge success">{percentatge}%</span>
          </div>
          <div style={{ background: '#e0e0e0', borderRadius: 10, height: 10, overflow: 'hidden' }}>
            <div
              style={{
                width: `${percentatge}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #4caf50, #81c784)',
                borderRadius: 10,
                transition: 'width 0.3s',
              }}
            />
          </div>
          <div className="stats-bar">
            <span>📋 Total: {tasques.length}</span>
            <span>✅ Completades: {completades}</span>
            <span>⏳ Pendents: {pendents}</span>
          </div>
        </div>

        {/* Afegir tasca */}
        <div className="flex-row" style={{ marginBottom: 15 }}>
          <input
            value={novaTasca}
            onChange={(e) => setNovaTasca(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAfegir()}
            placeholder="Nova tasca..."
            style={{ flex: 1, maxWidth: 280 }}
          />
          <select value={prioritat} onChange={(e) => setPrioritat(e.target.value as Tasca['prioritat'])}>
            <option value="alta">🔴 Alta</option>
            <option value="mitjana">🟠 Mitjana</option>
            <option value="baixa">🟢 Baixa</option>
          </select>
          <button className="primary" onClick={handleAfegir}>➕ Afegir</button>
        </div>

        {/* Filtres */}
        <div className="flex-row" style={{ marginBottom: 12 }}>
          {(['totes', 'pendents', 'completades'] as const).map((f) => (
            <button
              key={f}
              className={filtre === f ? 'primary' : ''}
              onClick={() => setFiltre(f)}
              style={{ textTransform: 'capitalize' }}
            >
              {f}
            </button>
          ))}
          <button
            className="danger"
            onClick={() => dispatch({ type: 'NETEJAR_COMPLETADES' })}
            style={{ marginLeft: 'auto' }}
          >
            🗑️ Netejar completades
          </button>
          <button onClick={() => dispatch({ type: 'RESET' })}>🔄 Reset</button>
        </div>

        {/* Llista */}
        <ul className="task-list">
          {tasquesFiltrades.length === 0 && (
            <li style={{ color: '#aaa', justifyContent: 'center' }}>
              No hi ha tasques {filtre !== 'totes' ? filtre : ''}
            </li>
          )}
          {tasquesFiltrades.map((tasca) => (
            <li
              key={tasca.id}
              className={tasca.completada ? 'done' : 'pending'}
              style={{ borderLeft: `4px solid ${prioritatColors[tasca.prioritat].text}` }}
            >
              <div className="flex-row" style={{ gap: 10 }}>
                <span
                  style={{
                    cursor: 'pointer',
                    textDecoration: tasca.completada ? 'line-through' : 'none',
                    color: tasca.completada ? '#aaa' : '#333',
                  }}
                  onClick={() => dispatch({ type: 'COMPLETAR', payload: tasca.id })}
                >
                  {tasca.completada ? '✅' : '⬜'} {tasca.text}
                </span>
                <span
                  className="badge"
                  style={{
                    background: prioritatColors[tasca.prioritat].bg,
                    color: prioritatColors[tasca.prioritat].text,
                    fontSize: '0.7rem',
                  }}
                >
                  {tasca.prioritat}
                </span>
              </div>
              <button
                onClick={() => dispatch({ type: 'ESBORRAR', payload: tasca.id })}
                style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '1rem' }}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Codi del reducer */}
      <div className="demo-section">
        <h2>El patró Reducer</h2>
        <div className="code-preview">
          {`const [tasques, dispatch] = useReducer(tascaReducer, estatInicial);

// Dispatch envia accions amb type + payload
dispatch({ type: 'AFEGIR', payload: { text: 'Nova', prioritat: 'alta' } });
dispatch({ type: 'COMPLETAR', payload: tascaId });
dispatch({ type: 'ESBORRAR', payload: tascaId });`}
        </div>
        <div className="hint tip">
          💡 Tota la lògica d'estat viu al reducer — fàcil de testejar i mantenir
        </div>
      </div>
    </>
  )
}
