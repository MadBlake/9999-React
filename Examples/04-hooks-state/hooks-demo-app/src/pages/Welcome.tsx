interface WelcomeProps {
  onNavigate: (page: string) => void
}

const hooks = [
  { id: 'useState', emoji: '📦', desc: "Memòria interna del component" },
  { id: 'useEffect', emoji: '⚡', desc: "Efectes secundaris (fetch, timers)" },
  { id: 'useRef', emoji: '🎯', desc: "Referències DOM i variables silencioses" },
  { id: 'useMemo', emoji: '🧠', desc: "Memoització de càlculs i funcions" },
  { id: 'useReducer', emoji: '🔀', desc: "Estat complex amb patró Reducer" },
  { id: 'customHooks', emoji: '🔧', desc: "Lògica reutilitzable personalitzada" },
]

export default function Welcome({ onNavigate }: WelcomeProps) {
  return (
    <div className="welcome">
      <p style={{ fontSize: '4rem', marginBottom: 10 }}>⚛️</p>
      <h1>React Hooks Demo</h1>
      <p>
        Aplicació interactiva que demostra l'ús de cada Hook de React
        amb exemples pràctics i codi en viu.
      </p>

      <div className="hook-grid">
        {hooks.map((hook) => (
          <div
            key={hook.id}
            className="hook-card"
            onClick={() => onNavigate(hook.id)}
          >
            <p style={{ fontSize: '2rem', margin: '0 0 8px' }}>{hook.emoji}</p>
            <h3>{hook.id}</h3>
            <p>{hook.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
