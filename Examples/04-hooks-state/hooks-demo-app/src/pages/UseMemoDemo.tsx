import { useState, useMemo, useCallback, memo } from 'react'
import LlistaEstadistiques from '../components/useMemo/LlistaEstadistiques'
import BotoMemoitzat from '../components/useMemo/BotoMemoitzat'
// Generador de dades
function generarUsuaris(n: number) {
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    nom: `Usuari ${i + 1}`,
    ciutat: ['Barcelona', 'Madrid', 'València', 'Girona', 'Lleida', 'Tarragona'][i % 6],
    puntuacio: Math.floor(Math.random() * 100),
  }))
}

export default function UseMemoDemo() {
  const [cerca, setCerca] = useState('')
  const [colorFons, setColorFons] = useState('#ffffff')
  const [comptador, setComptador] = useState(0)

  // useMemo: Generem la llista només 1 cop
  const usuaris = useMemo(() => {
    console.log('🔵 Generant 10.000 usuaris...')
    return generarUsuaris(10000)
  }, [])

  // useMemo: Filtrem només quan canvia cerca o usuaris
  const filtrats = useMemo(() => {
    console.log('🟢 Filtrant...')
    return usuaris.filter((u) =>
      u.nom.toLowerCase().includes(cerca.toLowerCase()) ||
      u.ciutat.toLowerCase().includes(cerca.toLowerCase())
    )
  }, [usuaris, cerca])

  // useMemo: Estadístiques derivades
  const estadistiques = useMemo(() => {
    const total = filtrats.length
    const mitjana = filtrats.reduce((sum, u) => sum + u.puntuacio, 0) / (total || 1)
    return { total, mitjana }
  }, [filtrats])

  // useCallback: Funció estable per al botó memoitzat
  const handleIncrementEstable = useCallback(() => {
    setComptador((c) => c + 1)
  }, [])

  // Funció inestable (es recrea a cada render)
  const handleIncrementInestable = () => {
    setComptador((c) => c + 1)
  }

  return (
    <>
      <h1>useMemo & useCallback</h1>
      <p className="subtitle">Memoització: evitar càlculs i renders innecessaris</p>

      {/* useMemo: Filtre amb llista gran */}
      <div className="demo-section">
        <h2>useMemo — Filtre de 10.000 usuaris</h2>
        <div className="flex-row" style={{ marginBottom: 12 }}>
          <input
            value={cerca}
            onChange={(e) => setCerca(e.target.value)}
            placeholder="Cercar per nom o ciutat..."
            style={{ flex: 1, maxWidth: 300 }}
          />
          <input
            type="color"
            value={colorFons}
            onChange={(e) => setColorFons(e.target.value)}
            title="Canviar color — NO re-filtra"
          />
        </div>

        <LlistaEstadistiques total={estadistiques.total} mitjana={estadistiques.mitjana} />

        <div
          style={{
            background: colorFons,
            padding: 10,
            borderRadius: 8,
            marginTop: 10,
            maxHeight: 200,
            overflow: 'auto',
            border: '1px solid #e0e0e0',
          }}
        >
          <table style={{ width: '100%', fontSize: '0.85rem', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #ddd' }}>
                <th style={{ textAlign: 'left', padding: 6 }}>Nom</th>
                <th style={{ textAlign: 'left', padding: 6 }}>Ciutat</th>
                <th style={{ textAlign: 'right', padding: 6 }}>Puntuació</th>
              </tr>
            </thead>
            <tbody>
              {filtrats.slice(0, 20).map((u) => (
                <tr key={u.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: 6 }}>{u.nom}</td>
                  <td style={{ padding: 6 }}>{u.ciutat}</td>
                  <td style={{ padding: 6, textAlign: 'right' }}>{u.puntuacio}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtrats.length > 20 && (
            <p style={{ color: '#888', fontSize: '0.8rem', textAlign: 'center', marginTop: 8 }}>
              ... i {filtrats.length - 20} més
            </p>
          )}
        </div>

        <div className="hint tip">
          💡 Canviar el color NO re-filtra (mira la consola). El filtre només s'executa quan canvia la cerca.
        </div>
      </div>

      {/* useCallback */}
      <div className="demo-section">
        <h2>useCallback — Estabilitzar funcions</h2>
        <p style={{ marginBottom: 10 }}>Comptador: <strong className="big-number" style={{ fontSize: '2rem' }}>{comptador}</strong></p>

        <div className="flex-row">
          <BotoMemoitzat onClick={handleIncrementInestable} label="❌ Inestable" />
          <BotoMemoitzat onClick={handleIncrementEstable} label="✅ Estable" />
        </div>

        <div className="code-preview" style={{ marginTop: 10 }}>
          {`// ❌ Es recrea a cada render → el fill es re-renderitza
const fn = () => setCount(c => c + 1);

// ✅ Referència estable → el fill NO es re-renderitza
const fn = useCallback(() => setCount(c => c + 1), []);`}
        </div>

        <div className="hint warning">
          ⚠️ Escriu al camp de cerca de dalt i mira la consola: el botó "Inestable" es re-renderitza, l'"Estable" no.
        </div>
      </div>

      {/* React.memo explicació */}
      <div className="demo-section">
        <h2>React.memo — Protegir components fills</h2>
        <div className="code-preview">
          {`const Component = memo(function Component({ prop }) {
  // Només es renderitza si 'prop' canvia
  return <p>{prop}</p>;
});`}
        </div>
        <div className="hint tip">
          💡 <code>React.memo</code> + <code>useCallback</code> = fills protegits de renders innecessaris
        </div>
      </div>
    </>
  )
}
