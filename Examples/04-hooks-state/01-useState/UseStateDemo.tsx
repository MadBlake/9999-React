import { useState } from 'react'

export default function UseStateDemo() {
  // 1. Comptador bàsic
  const [compte, setCompte] = useState(0)

  // 2. Estat amb string
  const [nom, setNom] = useState('')

  // 3. Estat amb objecte
  const [usuari, setUsuari] = useState({
    nom: 'Pere',
    edat: 25,
    email: 'pere@email.com',
  })

  // 4. Actualitzacions funcionals
  const [comptadorRapid, setComptadorRapid] = useState(0)

  const incrementar3Vegades = () => {
    // ✅ Forma correcta: Functional Update
    setComptadorRapid((prev) => prev + 1)
    setComptadorRapid((prev) => prev + 1)
    setComptadorRapid((prev) => prev + 1)
  }

  return (
    <>
      <h1>useState</h1>
      <p className="subtitle">Gestió de l'estat intern del component</p>

      {/* Comptador bàsic */}
      <div className="demo-section">
        <h2>Comptador bàsic</h2>
        <div className="big-number">{compte}</div>
        <div className="flex-row" style={{ marginTop: 15 }}>
          <button onClick={() => setCompte(compte - 1)}>-1</button>
          <button className="primary" onClick={() => setCompte(0)}>Reset</button>
          <button onClick={() => setCompte(compte + 1)}>+1</button>
        </div>
        <div className="code-preview">
          {`const [compte, setCompte] = useState(0);`}
        </div>
      </div>

      {/* Estat amb string */}
      <div className="demo-section">
        <h2>Estat amb string</h2>
        <input
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          placeholder="Escriu el teu nom..."
          style={{ width: '100%', maxWidth: 350 }}
        />
        <p style={{ marginTop: 10 }}>
          {nom ? (
            <>Hola, <strong>{nom}</strong>! 👋</>
          ) : (
            <span style={{ color: '#aaa' }}>Escriu alguna cosa...</span>
          )}
        </p>
      </div>

      {/* Estat amb objecte */}
      <div className="demo-section">
        <h2>Estat amb objecte (Spread Operator)</h2>
        <div className="flex-col" style={{ maxWidth: 350 }}>
          <input
            value={usuari.nom}
            onChange={(e) => setUsuari({ ...usuari, nom: e.target.value })}
            placeholder="Nom"
          />
          <input
            type="number"
            value={usuari.edat}
            onChange={(e) => setUsuari({ ...usuari, edat: Number(e.target.value) })}
            placeholder="Edat"
          />
          <input
            value={usuari.email}
            onChange={(e) => setUsuari({ ...usuari, email: e.target.value })}
            placeholder="Email"
          />
        </div>
        <div className="code-preview" style={{ marginTop: 10 }}>
          {JSON.stringify(usuari, null, 2)}
        </div>
        <div className="hint tip">
          💡 Usem <code>{'{ ...usuari, camp: valor }'}</code> per no perdre les altres propietats
        </div>
      </div>

      {/* Actualitzacions funcionals */}
      <div className="demo-section">
        <h2>Actualitzacions funcionals</h2>
        <div className="big-number">{comptadorRapid}</div>
        <div className="flex-row" style={{ marginTop: 15 }}>
          <button className="primary" onClick={incrementar3Vegades}>
            +3 (funcional)
          </button>
          <button onClick={() => setComptadorRapid(0)}>Reset</button>
        </div>
        <div className="code-preview">
          {`// Cada crida rep el valor anterior REAL
setCompte(prev => prev + 1);
setCompte(prev => prev + 1);
setCompte(prev => prev + 1);
// Resultat: +3 ✅`}
        </div>
        <div className="hint warning">
          ⚠️ Sense functional update, les 3 crides usarien el mateix valor
          antic i el resultat seria +1
        </div>
      </div>
    </>
  )
}
