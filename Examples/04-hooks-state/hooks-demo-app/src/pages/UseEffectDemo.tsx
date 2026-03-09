import { useState, useEffect } from 'react'
import UsuariFetch from '../components/useEffect/UsuariFetch'
import DetectorAmplada from '../components/useEffect/DetectorAmplada'
import Rellotge from '../components/useEffect/Rellotge'

export default function UseEffectDemo() {
  const [userId, setUserId] = useState(1)
  const [mostrarRellotge, setMostrarRellotge] = useState(true)

  return (
    <>
      <h1>useEffect</h1>
      <p className="subtitle">Efectes secundaris: fetch, timers, event listeners</p>

      {/* Rellotge */}
      <div className="demo-section">
        <h2>Efecte al muntar — Rellotge</h2>
        <button onClick={() => setMostrarRellotge(!mostrarRellotge)} style={{ marginBottom: 10 }}>
          {mostrarRellotge ? '🔴 Desmuntar rellotge' : '🟢 Muntar rellotge'}
        </button>
        {mostrarRellotge && <Rellotge />}
        <div className="code-preview">
          {`useEffect(() => {
  const interval = setInterval(() => ..., 1000);
  return () => clearInterval(interval); // cleanup
}, []); // [] = només al muntar`}
        </div>
        <div className="hint tip">
          💡 En desmuntar, la funció de neteja (cleanup) atura l'interval
        </div>
      </div>

      {/* Fetch amb dependències */}
      <div className="demo-section">
        <h2>Efecte amb dependències — Fetch API</h2>
        <div className="flex-row" style={{ marginBottom: 15 }}>
          <label>Selecciona usuari: </label>
          <select value={userId} onChange={(e) => setUserId(Number(e.target.value))}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => (
              <option key={id} value={id}>Usuari {id}</option>
            ))}
          </select>
        </div>
        <UsuariFetch userId={userId} />
        <div className="code-preview" style={{ marginTop: 10 }}>
          {`useEffect(() => {
  let ignore = false;
  fetch(url).then(data => {
    if (!ignore) setUsuari(data);
  });
  return () => { ignore = true }; // race condition guard
}, [userId]); // s'executa quan userId canvia`}
        </div>
      </div>

      {/* Window resize */}
      <div className="demo-section">
        <h2>Event listener amb cleanup</h2>
        <DetectorAmplada />
        <div className="hint tip" style={{ marginTop: 10 }}>
          💡 Redimensiona la finestra per veure el valor canviar
        </div>
      </div>
    </>
  )
}
