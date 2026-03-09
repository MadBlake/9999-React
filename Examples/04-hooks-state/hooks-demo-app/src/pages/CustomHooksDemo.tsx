import { useState } from 'react'
import { useCounter } from '../components/custom-hooks/useCounter'
import { useToggle } from '../components/custom-hooks/useToggle'
import { useFetch } from '../components/custom-hooks/useFetch'
import { useLocalStorage } from '../components/custom-hooks/useLocalStorage'

interface Post {
  id: number
  title: string
  body: string
}

export default function CustomHooksDemo() {
  return (
    <>
      <h1>Custom Hooks</h1>
      <p className="subtitle">Lògica reutilitzable encapsulada en funcions "use..."</p>

      <SeccioCounter />
      <SeccioToggle />
      <SeccioFetch />
      <SeccioLocalStorage />
    </>
  )
}

// ============================
// useCounter
// ============================

function SeccioCounter() {
  const productes = useCounter(1)
  const puntuacio = useCounter(50)

  return (
    <div className="demo-section">
      <h2>useCounter — Comptador reutilitzable</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#888', marginBottom: 5 }}>🛒 Productes</p>
          <div className="big-number" style={{ fontSize: '2.5rem' }}>{productes.counter}</div>
          <div className="flex-row" style={{ justifyContent: 'center', marginTop: 8 }}>
            <button onClick={() => productes.decrement()}>-1</button>
            <button onClick={() => productes.increment()}>+1</button>
            <button onClick={productes.reset}>Reset</button>
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#888', marginBottom: 5 }}>⭐ Puntuació</p>
          <div className="big-number" style={{ fontSize: '2.5rem' }}>{puntuacio.counter}</div>
          <div className="flex-row" style={{ justifyContent: 'center', marginTop: 8 }}>
            <button onClick={() => puntuacio.decrement(10)}>-10</button>
            <button onClick={() => puntuacio.increment(10)}>+10</button>
            <button onClick={puntuacio.reset}>Reset</button>
          </div>
        </div>
      </div>
      <div className="code-preview" style={{ marginTop: 12 }}>
        {`const { counter, increment, decrement, reset } = useCounter(1);
// Cada instància té el seu propi estat independent`}
      </div>
      <div className="hint tip">
        💡 Dos usos del mateix hook amb estats totalment independents
      </div>
    </div>
  )
}

// ============================
// useToggle
// ============================

function SeccioToggle() {
  const modeOscur = useToggle(false)
  const menu = useToggle(false)
  const notificacions = useToggle(true)

  return (
    <div className="demo-section">
      <h2>useToggle — Booleà reutilitzable</h2>
      <div className="flex-row" style={{ gap: 15, flexWrap: 'wrap' }}>
        <button
          className={modeOscur.value ? 'primary' : ''}
          onClick={modeOscur.toggle}
        >
          {modeOscur.value ? '☀️ Mode clar' : '🌙 Mode fosc'}
        </button>
        <button
          className={menu.value ? 'primary' : ''}
          onClick={menu.toggle}
        >
          {menu.value ? '📖 Tancar menú' : '📕 Obrir menú'}
        </button>
        <button
          className={notificacions.value ? 'primary' : ''}
          onClick={notificacions.toggle}
        >
          {notificacions.value ? '🔔 Notificacions ON' : '🔕 Notificacions OFF'}
        </button>
      </div>

      {menu.value && (
        <div
          style={{
            marginTop: 15,
            padding: 15,
            borderRadius: 10,
            background: modeOscur.value ? '#1a1a2e' : '#f5f5f5',
            color: modeOscur.value ? '#fff' : '#333',
          }}
        >
          <h3 style={{ margin: '0 0 10px' }}>📋 Menú</h3>
          <ul style={{ paddingLeft: 20 }}>
            <li>Inici</li>
            <li>Perfil</li>
            <li>Configuració</li>
          </ul>
          <button onClick={menu.setFalse} style={{ marginTop: 10 }}>Tancar</button>
        </div>
      )}

      <div className="code-preview" style={{ marginTop: 12 }}>
        {`const { value, toggle, setTrue, setFalse } = useToggle(false);`}
      </div>
    </div>
  )
}

// ============================
// useFetch
// ============================

function SeccioFetch() {
  const [limit, setLimit] = useState(5)
  const { data, loading, error } = useFetch<Post[]>(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}`
  )

  return (
    <div className="demo-section">
      <h2>useFetch — Peticions declaratives</h2>
      <div className="flex-row" style={{ marginBottom: 15 }}>
        <label>Posts a mostrar:</label>
        <select value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
          {[3, 5, 10, 20].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
        {loading && <span className="badge warning">Carregant...</span>}
      </div>

      {error && <p style={{ color: 'red' }}>❌ {error}</p>}

      {data && (
        <div style={{ maxHeight: 250, overflow: 'auto' }}>
          {data.map((post) => (
            <div
              key={post.id}
              style={{
                padding: 12,
                marginBottom: 8,
                background: '#fafafa',
                borderRadius: 8,
                borderLeft: '3px solid #61dafb',
              }}
            >
              <strong>{post.id}.</strong> {post.title}
              <p style={{ fontSize: '0.8rem', color: '#888', margin: '5px 0 0' }}>
                {post.body.substring(0, 80)}...
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="code-preview" style={{ marginTop: 12 }}>
        {`const { data, loading, error } = useFetch<Post[]>(url);
// Canviar la URL auto-refetcha amb cleanup (AbortController)`}
      </div>
    </div>
  )
}

// ============================
// useLocalStorage
// ============================

function SeccioLocalStorage() {
  const { storedValue: nom, setValue: setNom, removeValue: clearNom } =
    useLocalStorage('hooks-demo-nom', '')
  const { storedValue: tema, setValue: setTema } =
    useLocalStorage('hooks-demo-tema', 'clar')

  return (
    <div className="demo-section">
      <h2>useLocalStorage — Persistència al navegador</h2>
      <div className="flex-col" style={{ gap: 12 }}>
        <div className="flex-row">
          <input
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="El teu nom (persisteix al localStorage)"
            style={{ flex: 1, maxWidth: 350 }}
          />
          <button className="danger" onClick={clearNom}>🗑️</button>
        </div>

        <div className="flex-row">
          <span style={{ color: '#888' }}>Tema:</span>
          {(['clar', 'fosc', 'blau'] as const).map((t) => (
            <button
              key={t}
              className={tema === t ? 'primary' : ''}
              onClick={() => setTema(t)}
              style={{ textTransform: 'capitalize' }}
            >
              {t === 'clar' ? '☀️' : t === 'fosc' ? '🌙' : '💙'} {t}
            </button>
          ))}
        </div>
      </div>

      <div
        style={{
          marginTop: 15,
          padding: 15,
          borderRadius: 10,
          background: tema === 'fosc' ? '#1a1a2e' : tema === 'blau' ? '#e3f2fd' : '#f5f5f5',
          color: tema === 'fosc' ? '#fff' : '#333',
        }}
      >
        <p>
          {nom ? `Hola, ${nom}! 👋` : 'Escriu el teu nom...'}<br />
          <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>Tema: {tema}</span>
        </p>
      </div>

      <div className="hint tip" style={{ marginTop: 12 }}>
        💡 Recarrega la pàgina — les dades persisteixen al localStorage!
      </div>

      <div className="code-preview">
        {`const { storedValue, setValue, removeValue } = useLocalStorage('clau', valorInicial);`}
      </div>
    </div>
  )
}
